document.getElementById('training-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const distance = parseInt(document.getElementById('distance').value);
  const level = document.getElementById('level').value;
  const days = parseInt(document.getElementById('days').value);
  const semanas = parseInt(document.getElementById('semanas').value);

  document.getElementById('planilha').innerHTML = gerarPlanilha(distance, level, days, semanas);
  document.getElementById('download-pdf').style.display = 'block';
});

function determinarFase(semana) {
  if (semana <= 4) return "Base";
  if (semana <= 8) return "Construção";
  if (semana <= 12) return "Pico";
  if (semana <= 14) return "Polimento";
  return "Recuperação";
}
function gerarDescricaoTreino(titulo) {
  const mapa = {
    "Rodagem": {
      objetivo: "Desenvolver base aeróbica com baixo impacto.",
      ritmo: "Leve (3–4/10 na percepção de esforço). Você deve conseguir conversar.",
      aquecimento: "5 min de caminhada + 3 exercícios educativos (ex: skipping, joelho alto).",
      desaquecimento: "Caminhada leve de 3 a 5 min + alongamento leve.",
      observacao: "Se cansar, caminhe por 1 minuto e retome. Construa consistência antes da velocidade."
    },
    "Fartlek": {
      objetivo: "Melhorar adaptação cardiovascular com variações de ritmo.",
      ritmo: "Médio a forte nos estímulos (6–8/10). Pausas caminhando ou trote.",
      aquecimento: "5 min de trote leve + educativos dinâmicos.",
      desaquecimento: "3 min de trote leve + alongamento.",
      observacao: "Use os trechos leves para recuperar. Foque no controle da respiração."
    },
    "Intervalado": {
      objetivo: "Aumentar velocidade, resistência anaeróbica e VO2máx.",
      ritmo: "Forte nos estímulos (7–9/10). Pausas caminhando ou trote leve.",
      aquecimento: "8 a 10 min de corrida leve + educativos (saltitos, deslocamento).",
      desaquecimento: "Trote leve de 5 min + hidratação.",
      observacao: "Caso exausto, aumente o tempo de pausa entre séries."
    },
    "Tempo Run": {
      objetivo: "Melhorar limiar anaeróbico e correr em ritmo sustentado.",
      ritmo: "Firme e constante (6–7/10). Difícil falar, mas controlável.",
      aquecimento: "5 min de caminhada + 5 min de corrida leve.",
      desaquecimento: "3–5 min de caminhada leve + respiração profunda.",
      observacao: "Evite começar muito forte. Encontre seu ritmo e mantenha."
    },
    "Longao": {
      objetivo: "Construir resistência geral para a prova-alvo.",
      ritmo: "Bem leve (3/10). Deve terminar se sentindo capaz de correr mais.",
      aquecimento: "5 min caminhada + 5 min de corrida leve.",
      desaquecimento: "Caminhada de 5 min + hidratação + alongamento suave.",
      observacao: "Priorize sono, alimentação e água antes do treino. Foco no tempo total em movimento."
    },
    "Regenerativo": {
      objetivo: "Recuperar o corpo com movimento leve.",
      ritmo: "Muito leve (2/10). Conversa fácil e respiração tranquila.",
      aquecimento: "Caminhada leve de 5 min.",
      desaquecimento: "Alongamentos suaves. Respiração diafragmática.",
      observacao: "Treino leve é essencial. Evite acelerar mesmo se se sentir bem."
    },
    "Ritmo de prova": {
      objetivo: "Acostumar-se com o ritmo esperado no dia da prova.",
      ritmo: "Idêntico ao da prova-alvo. Esforço moderado a forte (6–7/10).",
      aquecimento: "Trote de 10 min + 3 acelerações de 30s.",
      desaquecimento: "Caminhada e hidratação.",
      observacao: "Use relógio ou app para manter o ritmo planejado."
    },
    "Simulado": {
      objetivo: "Testar preparo físico, ritmo e mentalidade para o dia da prova.",
      ritmo: "Ritmo real da prova. Com controle e atenção ao corpo.",
      aquecimento: "10 min corrida leve + educativos + tiros curtos (30s).",
      desaquecimento: "Trote ou caminhada + reposição de líquidos e comida.",
      observacao: "Trate como se fosse o grande dia. Planeje até o que comer."
    },
    "Polimento": {
      objetivo: "Reduzir volume para maximizar performance.",
      ritmo: "Leve com pequenos estímulos. Esforço 3–5/10.",
      aquecimento: "Curto: 5 min de caminhada ou trote leve.",
      desaquecimento: "Alongamento leve e foco mental.",
      observacao: "Descanse mais. Mantenha apenas o ritmo do corpo acordado."
    }
  };

  const chave = Object.keys(mapa).find(k => titulo.toLowerCase().includes(k.toLowerCase()));
  const info = mapa[chave] || {
    objetivo: "Treino complementar.",
    ritmo: "Leve a moderado.",
    aquecimento: "5 min de caminhada.",
    desaquecimento: "Caminhada leve.",
    observacao: "Respeite seu corpo. Adapte conforme necessário."
  };

  return `
    <div style="margin-top:0.75rem; font-size:0.95rem; color:#94a3b8; line-height:1.5;">
      <strong>🎯 Objetivo:</strong> ${info.objetivo}<br>
      <strong>⏱️ Ritmo sugerido:</strong> ${info.ritmo}<br>
      <strong>🔥 Aquecimento:</strong> ${info.aquecimento}<br>
      <strong>🧘‍♂️ Desaquecimento:</strong> ${info.desaquecimento}<br>
      <strong>⚠️ Observações:</strong> ${info.observacao}
    </div>
  `;
}

function gerarPlanilha(distance, level, days, semanasTotais) {
  const planos = {
    iniciante: {
      5: {
        semanas: 4,
        dados: {
          1: ["Rodagem: 20min leve", "Descanso", "Rodagem: 25min leve"],
          2: ["Fartlek: 4x1min", "Descanso", "Rodagem: 30min"],
          3: ["Intervalado: 3x400m", "Rodagem: 25min", "Descanso"],
          4: ["Longão: 4km", "Descanso", "Rodagem leve: 20min"]
        }
      },
      10: {
        semanas: 6,
        dados: {
          1: ["Rodagem: 25min", "Descanso", "Rodagem: 30min"],
          2: ["Intervalado: 4x400m", "Descanso", "Rodagem: 35min"],
          3: ["Fartlek: 6x1min", "Rodagem: 25min", "Descanso"],
          4: ["Longão: 6km", "Rodagem: 30min", "Descanso"],
          5: ["Tempo Run: 20min", "Descanso", "Rodagem leve: 20min"],
          6: ["Longão: 8km", "Descanso", "Rodagem leve: 25min"]
        }
      },
      21: {
        semanas: 8,
        dados: {
          1: ["Rodagem: 30min", "Descanso", "Rodagem: 35min"],
          2: ["Intervalado: 5x400m", "Descanso", "Rodagem leve: 30min"],
          3: ["Fartlek: 6x2min", "Rodagem: 30min", "Descanso"],
          4: ["Longão: 10km", "Rodagem leve", "Descanso"],
          5: ["Tempo Run: 25min", "Descanso", "Rodagem leve"],
          6: ["Longão: 12km", "Rodagem leve", "Descanso"],
          7: ["Ritmo de prova: 4km", "Rodagem leve", "Descanso"],
          8: ["Simulado: 15km", "Descanso", "Rodagem leve"]
        }
      },
      42: {
        semanas: 12,
        dados: {
          1: ["Rodagem: 35min", "Descanso", "Rodagem leve"],
          2: ["Fartlek: 6x3min", "Rodagem leve", "Descanso"],
          3: ["Intervalado: 6x400m", "Rodagem leve", "Descanso"],
          4: ["Longão: 14km", "Rodagem leve", "Descanso"],
          5: ["Tempo Run: 30min", "Descanso", "Rodagem leve"],
          6: ["Longão: 16km", "Rodagem leve", "Descanso"],
          7: ["Ritmo de prova: 5km", "Rodagem leve", "Descanso"],
          8: ["Longão: 18km", "Descanso", "Rodagem leve"],
          9: ["Simulado: 21km", "Descanso", "Rodagem leve"],
          10: ["Intervalado: 8x800m", "Rodagem leve", "Descanso"],
          11: ["Longão: 22km", "Rodagem leve", "Descanso"],
          12: ["Polimento: 10km leve", "Descanso", "Regenerativo: 30min"]
        }
      }
    },
    intermediario: {
      5: {
        semanas: 4,
        dados: {
          1: ["Fartlek: 6x1min", "Rodagem: 30min", "Descanso"],
          2: ["Intervalado: 4x600m", "Rodagem leve", "Descanso"],
          3: ["Tempo Run: 20min", "Rodagem leve", "Descanso"],
          4: ["Longão: 6km", "Descanso", "Rodagem leve"]
        }
      },
      10: {
        semanas: 6,
        dados: {
          1: ["Rodagem: 35min", "Fartlek: 6x1min", "Descanso"],
          2: ["Intervalado: 5x600m", "Rodagem leve", "Descanso"],
          3: ["Tempo Run: 25min", "Rodagem leve", "Descanso"],
          4: ["Longão: 10km", "Descanso", "Rodagem leve"],
          5: ["Simulado: 8km", "Descanso", "Regenerativo: 20min"],
          6: ["Polimento: 5km leve", "Descanso", "Rodagem leve"]
        }
      },
      21: {
        semanas: 8,
        dados: {
          1: ["Rodagem: 40min", "Fartlek: 8x2min", "Descanso"],
          2: ["Intervalado: 6x600m", "Rodagem leve", "Descanso"],
          3: ["Tempo Run: 30min", "Rodagem leve", "Descanso"],
          4: ["Longão: 14km", "Rodagem leve", "Descanso"],
          5: ["Ritmo de prova: 6km", "Rodagem leve", "Descanso"],
          6: ["Longão: 16km", "Rodagem leve", "Descanso"],
          7: ["Simulado: 18km", "Rodagem leve", "Descanso"],
          8: ["Polimento: 10km leve", "Descanso", "Regenerativo"]
        }
      },
      42: {
        semanas: 12,
        dados: {
          1: ["Rodagem: 40min", "Fartlek: 8x2min", "Descanso"],
          2: ["Intervalado: 6x800m", "Rodagem leve", "Descanso"],
          3: ["Tempo Run: 35min", "Rodagem leve", "Descanso"],
          4: ["Longão: 16km", "Rodagem leve", "Descanso"],
          5: ["Ritmo de prova: 8km", "Rodagem leve", "Descanso"],
          6: ["Longão: 18km", "Rodagem leve", "Descanso"],
          7: ["Simulado: 25km", "Rodagem leve", "Descanso"],
          8: ["Intervalado: 10x800m", "Rodagem leve", "Descanso"],
          9: ["Longão: 28km", "Descanso", "Rodagem leve"],
          10: ["Ritmo de prova: 12km", "Rodagem leve", "Descanso"],
          11: ["Simulado: 32km", "Rodagem leve", "Descanso"],
          12: ["Polimento: 15km leve", "Descanso", "Rodagem: 20min"]
        }
      }
    },
    avancado: {
      5: {
        semanas: 4,
        dados: {
          1: ["Intervalado: 5x800m", "Rodagem leve", "Descanso"],
          2: ["Tempo Run: 25min", "Rodagem leve", "Descanso"],
          3: ["Fartlek: 10x1min", "Rodagem leve", "Descanso"],
          4: ["Longão: 8km", "Rodagem leve", "Descanso"]
        }
      },
      10: {
        semanas: 6,
        dados: {
          1: ["Intervalado: 6x800m", "Rodagem leve", "Descanso"],
          2: ["Tempo Run: 30min", "Rodagem leve", "Descanso"],
          3: ["Fartlek: 8x2min", "Rodagem leve", "Descanso"],
          4: ["Longão: 12km", "Rodagem leve", "Descanso"],
          5: ["Simulado: 10km", "Descanso", "Regenerativo: 20min"],
          6: ["Polimento: 6km leve", "Rodagem leve", "Descanso"]
        }
      },
      21: {
        semanas: 8,
        dados: {
          1: ["Intervalado: 6x1000m", "Rodagem leve", "Descanso"],
          2: ["Tempo Run: 35min", "Rodagem leve", "Descanso"],
          3: ["Fartlek: 8x3min", "Rodagem leve", "Descanso"],
          4: ["Longão: 18km", "Rodagem leve", "Descanso"],
          5: ["Ritmo de prova: 10km", "Rodagem leve", "Descanso"],
          6: ["Simulado: 21km", "Descanso", "Regenerativo"],
          7: ["Polimento: 12km leve", "Rodagem leve", "Descanso"],
          8: ["Rodagem leve: 30min", "Descanso", "Prova"]
        }
      },
      42: {
        semanas: 12,
        dados: {
          1: ["Intervalado: 8x1000m", "Rodagem leve", "Descanso"],
          2: ["Tempo Run: 40min", "Rodagem leve", "Descanso"],
          3: ["Fartlek: 10x2min", "Rodagem leve", "Descanso"],
          4: ["Longão: 20km", "Rodagem leve", "Descanso"],
          5: ["Intervalado: 6x1600m", "Rodagem leve", "Descanso"],
          6: ["Longão: 24km", "Rodagem leve", "Descanso"],
          7: ["Ritmo de prova: 15km", "Rodagem leve", "Descanso"],
          8: ["Simulado: 30km", "Descanso", "Rodagem leve"],
          9: ["Intervalado: 4x2000m", "Rodagem leve", "Descanso"],
          10: ["Longão: 34km", "Rodagem leve", "Descanso"],
          11: ["Polimento: 18km leve", "Rodagem leve", "Descanso"],
          12: ["Rodagem leve: 30min", "Descanso", "Prova"]
        }
      }
    }
  };


  const planoPorNivel = planos[level];
  if (!planoPorNivel || !planoPorNivel[distance]) {
    return `<p class="alerta">Desculpe, não há planos disponíveis para ${level} e ${distance}km no momento.</p>`;
  }

  const planoSelecionado = planoPorNivel[distance];
  const totalSemanasPlano = planoSelecionado.semanas;
  Math.min(semanasTotais, totalSemanasPlano);
  const treinos = [];

  for (let semana = 1; semana <= semanasTotais; semana++) {
    const fase = determinarFase(semana);
    const semanaBase = semana <= totalSemanasPlano ? semana : totalSemanasPlano;
    const treinoSemana = planoSelecionado.dados[semanaBase];

    treinos.push(`
      <div class="semana">
        <h3>Semana ${semana} – ${level.toUpperCase()} ${distance}K</h3>
        <p><strong>Fase do Macrociclo:</strong> ${fase}</p>
        <ul>
    `);

    for (let dia = 0; dia < days; dia++) {
      const treino = treinoSemana[dia % treinoSemana.length];
      const [titulo, conteudo] = treino.includes(':') ? treino.split(':') : ["Treino", treino];

      treinos.push(`
        <li>
          <details>
            <summary>Dia ${dia + 1} – ${titulo}</summary>
            <p style="margin-top: 0.75rem; color: #e2e8f0;">${conteudo}</p>
              <p style="margin-top: 0.75rem; color: #e2e8f0;">${conteudo}</p>
                ${gerarDescricaoTreino(titulo.trim())}



          </details>
        </li>
      `);
    }

    treinos.push(`</ul></div>`);
  }

  return treinos.join('');
}

// PDF
const { jsPDF } = window.jspdf;
document.getElementById('download-pdf').addEventListener('click', function () {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const content = document.getElementById('planilha');
  const clone = content.cloneNode(true);
  clone.querySelectorAll('details').forEach(d => d.open = true);

  const semanas = clone.querySelectorAll('.semana');
  let y = 35;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Plano de Treino Personalizado – RunVision', 105, 20, { align: 'center' });

  semanas.forEach((semana) => {
    const titulo = semana.querySelector('h3')?.innerText || '';
    const fase = semana.querySelector('p')?.innerText || '';
    const treinos = semana.querySelectorAll('li');

    if (y > 260) { doc.addPage(); y = 20; }

    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(33, 37, 41);
    doc.text(titulo, 10, y);
    y += 6;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(fase, 10, y);
    y += 6;

    treinos.forEach((treino) => {
      if (y > 275) { doc.addPage(); y = 20; }
      const texto = treino.innerText.trim();
      const lines = doc.splitTextToSize(texto, 180);
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(lines, 10, y);
      y += lines.length * 5 + 2;
    });

    y += 5;
  });

  doc.save('planilha-runvision.pdf');
});

// Alternância de abas
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});

// Dark Mode Toggle
document.getElementById("toggle-dark")?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Dados de treino
const treinoData = {
  hipertrofia: [
    {
      grupo: "Peito e Tríceps",
      exercicios: [
        {
          nome: "Supino Reto",
          tecnica: "Pirâmide",
          cadencia: "2-0-2",
          descanso: "90s",
          nota: "Aumente a carga progressivamente a cada série.",
          video: "https://www.youtube.com/watch?v=IODxDxX7oi4"
        },
        {
          nome: "Supino Inclinado com Halteres",
          tecnica: "Rest-pause",
          cadencia: "2-1-2",
          descanso: "60s",
          nota: "Após a falha, pause 10s e tente mais 2-3 repetições.",
          video: "https://www.youtube.com/watch?v=8iPEnn-ltC8"
        },
        {
          nome: "Tríceps Testa",
          tecnica: "Drop-set",
          cadencia: "2-0-2",
          descanso: "60s",
          nota: "Reduza a carga e continue até a falha.",
          video: "https://www.youtube.com/watch?v=YbX7Wd8jQ-Q"
        }
      ]
    },
    {
      grupo: "Costas e Bíceps",
      exercicios: [
        {
          nome: "Puxada na Barra Fixa",
          tecnica: "Pirâmide",
          cadencia: "2-1-2",
          descanso: "90s",
          nota: "Controle a descida para maior recrutamento muscular.",
          video: "https://www.youtube.com/watch?v=eGo4IYlbE5g"
        },
        {
          nome: "Remada Curvada",
          tecnica: "Rest-pause",
          cadencia: "2-0-2",
          descanso: "60s",
          nota: "Pausa curta para máxima fadiga muscular.",
          video: "https://www.youtube.com/watch?v=GZbfZ033f74"
        },
        {
          nome: "Rosca Direta",
          tecnica: "Drop-set",
          cadencia: "2-0-2",
          descanso: "60s",
          nota: "Faça até a falha com redução de carga.",
          video: "https://www.youtube.com/watch?v=kwG2ipFRgfo"
        }
      ]
    },
    {
      grupo: "Pernas e Ombros",
      exercicios: [
        {
          nome: "Agachamento Livre",
          tecnica: "Pirâmide",
          cadencia: "3-0-3",
          descanso: "120s",
          nota: "Mantenha a postura correta durante todo o movimento.",
          video: "https://www.youtube.com/watch?v=Dy28eq2PjcM"
        },
        {
          nome: "Elevação Lateral",
          tecnica: "Rest-pause",
          cadencia: "2-0-2",
          descanso: "60s",
          nota: "Pausa rápida para aumentar intensidade.",
          video: "https://www.youtube.com/watch?v=3VcKaXpzqRo"
        },
        {
          nome: "Leg Press",
          tecnica: "Drop-set",
          cadencia: "3-0-3",
          descanso: "90s",
          nota: "Reduza peso e continue até a falha muscular.",
          video: "https://www.youtube.com/watch?v=IZxyjW7MPJQ"
        }
      ]
    },
    {
      grupo: "Peito e Ombros",
      exercicios: [
        {
          nome: "Crucifixo Inclinado",
          tecnica: "Pirâmide",
          cadencia: "2-1-2",
          descanso: "75s",
          nota: "Estique o músculo no alongamento para maior amplitude.",
          video: "https://www.youtube.com/watch?v=eozdVDA78K0"
        },
        {
          nome: "Desenvolvimento Militar",
          tecnica: "Rest-pause",
          cadencia: "2-0-2",
          descanso: "60s",
          nota: "Mantenha o core firme para proteger a lombar.",
          video: "https://www.youtube.com/watch?v=B-aVuyhvLHU"
        },
        {
          nome: "Tríceps Pulley",
          tecnica: "Drop-set",
          cadencia: "2-0-2",
          descanso: "60s",
          nota: "Controle a execução para evitar balanços.",
          video: "https://www.youtube.com/watch?v=2-LAMcpzODU"
        }
      ]
    },
    {
      grupo: "Costas e Bíceps",
      exercicios: [
        {
          nome: "Remada Sentada",
          tecnica: "Pirâmide",
          cadencia: "2-0-2",
          descanso: "90s",
          nota: "Puxe com os cotovelos para maior ativação.",
          video: "https://www.youtube.com/watch?v=GZbfZ033f74"
        },
        {
          nome: "Rosca Martelo",
          tecnica: "Rest-pause",
          cadencia: "2-1-2",
          descanso: "60s",
          nota: "Fortalece antebraço e bíceps simultaneamente.",
          video: "https://www.youtube.com/watch?v=zC3nLlEvin4"
        },
        {
          nome: "Puxada Triângulo",
          tecnica: "Drop-set",
          cadencia: "2-0-2",
          descanso: "60s",
          nota: "Reduza peso para continuar após a falha.",
          video: "https://www.youtube.com/watch?v=CAwf7n6Luuc"
        }
      ]
    },
    {
      grupo: "Pernas e Abdômen",
      exercicios: [
        {
          nome: "Cadeira Extensora",
          tecnica: "Pirâmide",
          cadencia: "3-0-3",
          descanso: "90s",
          nota: "Contraia forte na extensão do joelho.",
          video: "https://www.youtube.com/watch?v=YyvSfVjQeL0"
        },
        {
          nome: "Mesa Flexora",
          tecnica: "Rest-pause",
          cadencia: "2-0-2",
          descanso: "60s",
          nota: "Alongue bem a musculatura posterior.",
          video: "https://www.youtube.com/watch?v=3i1I-csFCxc"
        },
        {
          nome: "Abdominal Infra no Banco Inclinado",
          tecnica: "Séries normais",
          cadencia: "2-0-2",
          descanso: "30s",
          nota: "Controle o movimento para não usar impulso.",
          video: "https://www.youtube.com/watch?v=K2VljzCC16g"
        }
      ]
    }
  ],

  emagrecimento: [
    {
      grupo: "Treino Full Body – Circuito 1",
      exercicios: [
        {
          nome: "Agachamento com Salto",
          tecnica: "Circuito",
          cadencia: "Explosiva",
          descanso: "30s entre estações",
          nota: "Movimento dinâmico para alta queima calórica.",
          video: "https://www.youtube.com/watch?v=U4s4mEQ5VqU"
        },
        {
          nome: "Flexão de Braço",
          tecnica: "Bi-set com Prancha",
          cadencia: "2-0-2",
          descanso: "30s entre estações",
          nota: "Mantenha o corpo alinhado durante a execução.",
          video: "https://www.youtube.com/watch?v=_l3ySVKYVJ8"
        },
        {
          nome: "Burpee",
          tecnica: "Circuito",
          cadencia: "Explosiva",
          descanso: "30s entre estações",
          nota: "Alta intensidade para maximizar o gasto energético.",
          video: "https://www.youtube.com/watch?v=TU8QYVW0gDU"
        },
        {
          nome: "Prancha",
          tecnica: "Bi-set com Flexão",
          cadencia: "Isometria",
          descanso: "30s entre estações",
          nota: "Fortalece core e melhora estabilidade.",
          video: "https://www.youtube.com/watch?v=pSHjTRCQxIw"
        }
      ]
    },
    {
      grupo: "Treino Full Body – Circuito 2",
      exercicios: [
        {
          nome: "Avanço Alternado",
          tecnica: "Circuito",
          cadencia: "2-0-2",
          descanso: "30s entre estações",
          nota: "Foco em membros inferiores com explosão.",
          video: "https://www.youtube.com/watch?v=QOVaHwm-Q6U"
        },
        {
          nome: "Remada Unilateral com Halteres",
          tecnica: "Bi-set com Abdominal",
          cadencia: "2-0-2",
          descanso: "30s entre estações",
          nota: "Trabalha costas e core simultaneamente.",
          video: "https://www.youtube.com/watch?v=pYcpY20QaE8"
        },
        {
          nome: "Mountain Climbers",
          tecnica: "Circuito",
          cadencia: "Explosiva",
          descanso: "30s entre estações",
          nota: "Excelente para condicionamento cardiovascular.",
          video: "https://www.youtube.com/watch?v=nmwgirgXLYM"
        },
        {
          nome: "Abdominal Crunch",
          tecnica: "Bi-set com Remada",
          cadencia: "2-0-2",
          descanso: "30s entre estações",
          nota: "Contração abdominal máxima.",
          video: "https://www.youtube.com/watch?v=Xyd_fa5zoEU"
        }
      ]
    },
    {
      grupo: "Treino Full Body – Circuito 3",
      exercicios: [
        {
          nome: "Pular Corda",
          tecnica: "Circuito",
          cadencia: "Ritmo constante",
          descanso: "30s entre estações",
          nota: "Excelente para coordenação e gasto calórico.",
          video: "https://www.youtube.com/watch?v=0tLF9reDB2Q"
        },
        {
          nome: "Flexão Diamante",
          tecnica: "Bi-set com Prancha Lateral",
          cadencia: "2-0-2",
          descanso: "30s entre estações",
          nota: "Foco em tríceps e core.",
          video: "https://www.youtube.com/watch?v=J0DnG1_S92I"
        },
        {
          nome: "Agachamento Isométrico",
          tecnica: "Circuito",
          cadencia: "Isometria 30-60s",
          descanso: "30s entre estações",
          nota: "Estabiliza os membros inferiores.",
          video: "https://www.youtube.com/watch?v=qr7F__q3D1Q"
        },
        {
          nome: "Elevação de Quadril",
          tecnica: "Bi-set com Agachamento",
          cadencia: "2-0-2",
          descanso: "30s entre estações",
          nota: "Fortalece glúteos e lombar.",
          video: "https://www.youtube.com/watch?v=LM8XHLYJoYs"
        }
      ]
    }
  ],

  fortalecimento: [
    {
      grupo: "Resistência para Corrida – Parte 1",
      exercicios: [
        {
          nome: "Agachamento Isométrico",
          tecnica: "Isometria",
          cadencia: "Fixo 30-60s",
          descanso: "60s",
          nota: "Melhora força estática das pernas.",
          video: "https://www.youtube.com/watch?v=qr7F__q3D1Q"
        },
        {
          nome: "Elevação de Quadril (Glúteo)",
          tecnica: "Séries normais",
          cadencia: "2-1-2",
          descanso: "45s",
          nota: "Fortalece glúteos e lombar, fundamental para corrida.",
          video: "https://www.youtube.com/watch?v=LM8XHLYJoYs"
        },
        {
          nome: "Prancha Frontal",
          tecnica: "Isometria",
          cadencia: "Fixo 30-45s",
          descanso: "45s",
          nota: "Melhora estabilidade do core.",
          video: "https://www.youtube.com/watch?v=pSHjTRCQxIw"
        },
        {
          nome: "Step-up com Halteres",
          tecnica: "Séries normais",
          cadencia: "2-0-2",
          descanso: "60s",
          nota: "Simula movimento de subida, importante para força funcional.",
          video: "https://www.youtube.com/watch?v=dQqApCGd5Ss"
        }
      ]
    },
    {
      grupo: "Resistência para Corrida – Parte 2",
      exercicios: [
        {
          nome: "Agachamento Unilateral (Pistol)",
          tecnica: "Séries normais",
          cadencia: "2-1-2",
          descanso: "60s",
          nota: "Trabalha equilíbrio e força unilateral.",
          video: "https://www.youtube.com/watch?v=3Ctjr_LY1no"
        },
        {
          nome: "Abdominal Prancha Lateral",
          tecnica: "Isometria",
          cadencia: "Fixo 30-45s",
          descanso: "45s",
          nota: "Fortalece core e estabiliza coluna.",
          video: "https://www.youtube.com/watch?v=K2VljzCC16g"
        },
        {
          nome: "Elevação de Panturrilha",
          tecnica: "Pirâmide",
          cadencia: "2-0-2",
          descanso: "30s",
          nota: "Foco na resistência da panturrilha.",
          video: "https://www.youtube.com/watch?v=-M4-G8p8fmc"
        },
        {
          nome: "Superman",
          tecnica: "Isometria",
          cadencia: "Fixo 30s",
          descanso: "30s",
          nota: "Fortalece lombar e melhora postura.",
          video: "https://www.youtube.com/watch?v=cc6UVRS7PW4"
        }
      ]
    },
    {
      grupo: "Resistência para Corrida – Parte 3",
      exercicios: [
        {
          nome: "Prancha com Elevação Alternada de Braço",
          tecnica: "Isometria com movimento",
          cadencia: "10 repetições",
          descanso: "45s",
          nota: "Desafia estabilidade do core e ombros.",
          video: "https://www.youtube.com/watch?v=Qw7lQ9jDYwM"
        },
        {
          nome: "Avanço com Rotação de Tronco",
          tecnica: "Séries normais",
          cadencia: "2-0-2",
          descanso: "60s",
          nota: "Melhora mobilidade e força funcional.",
          video: "https://www.youtube.com/watch?v=QOVaHwm-Q6U"
        },
        {
          nome: "Ponte Unilateral",
          tecnica: "Séries normais",
          cadencia: "2-0-2",
          descanso: "45s",
          nota: "Foco no fortalecimento do glúteo e estabilidade.",
          video: "https://www.youtube.com/watch?v=4WwBZmOmYs4"
        }
      ]
    },
    {
      grupo: "Resistência para Corrida – Parte 4",
      exercicios: [
        {
          nome: "Agachamento com Halteres",
          tecnica: "Pirâmide",
          cadencia: "3-0-3",
          descanso: "90s",
          nota: "Treina força para suportar impacto da corrida.",
          video: "https://www.youtube.com/watch?v=Dy28eq2PjcM"
        },
        {
          nome: "Elevação Lateral com Halteres",
          tecnica: "Rest-pause",
          cadencia: "2-0-2",
          descanso: "60s",
          nota: "Fortalece ombros e previne lesões.",
          video: "https://www.youtube.com/watch?v=3VcKaXpzqRo"
        },
        {
          nome: "Abdominal Infra",
          tecnica: "Séries normais",
          cadencia: "2-0-2",
          descanso: "30s",
          nota: "Importante para controle postural na corrida.",
          video: "https://www.youtube.com/watch?v=K2VljzCC16g"
        }
      ]
    }
  ]
};


// === MELHORIA VISUAL: CENTRALIZADO E RESPONSIVO COM CLASSES CSS ===
document.getElementById('form-musculacao')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const nomeAluno = this.nome.value.trim();
  const objetivo = this.objetivo.value;
  const frequencia = parseInt(this.dias.value);
  const container = document.getElementById('treino-musculacao');

  const planos = treinoData[objetivo];
  if (!planos) return;

  function getSeriesReps(objetivo) {
    switch (objetivo) {
      case 'hipertrofia': return '4 séries de 8-12 repetições';
      case 'emagrecimento': return '3 séries de 15-20 repetições';
      case 'resistencia': return '2-3 séries de 15-25 repetições';
      default: return 'Séries e repetições personalizadas';
    }
  }

  const seriesReps = getSeriesReps(objetivo);

  let resultado = `
    <div class="treino-container">
      <h3 class="treino-titulo">${objetivo.charAt(0).toUpperCase() + objetivo.slice(1)} – ${frequencia} dias</h3>
      <p class="aluno-nome"><strong>Aluno:</strong> ${nomeAluno}</p>
  `;

  for (let i = 0; i < frequencia; i++) {
    const treino = planos[i % planos.length];
    resultado += `
      <div class="treino-dia">
        <h4 class="treino-dia-titulo">Dia ${i + 1}: ${treino.grupo}</h4>
        <ul class="treino-lista">
    `;

    treino.exercicios.forEach(ex => {
      resultado += `
        <li class="treino-item">
          <p><strong class="treino-nome">${ex.nome}</strong> – ${ex.tecnica}</p>
          <p class="treino-series">${seriesReps}</p>
          <p class="treino-detalhe">Cadência: ${ex.cadencia} | Descanso: ${ex.descanso}</p>
          <p class="treino-nota">Nota: ${ex.nota}</p>
          <div><a href="${ex.video}" target="_blank" class="video-link">Ver demonstração</a></div>
        </li>
      `;
    });

    resultado += `</ul></div>`;
  }

  resultado += `
    <button id="voltar-editar" class="btn-secundario">Voltar e Editar</button>
  </div>`;

  container.innerHTML = resultado;
  document.getElementById("download-ficha").style.display = "block";

  document.getElementById("voltar-editar").addEventListener("click", () => {
    document.getElementById("form-musculacao").scrollIntoView({ behavior: "smooth" });
  });
});

// Geração do PDF da ficha de musculação

document.getElementById("download-ficha")?.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const treinoEl = document.getElementById("treino-musculacao");
  const titulo = treinoEl.querySelector(".treino-titulo")?.innerText || "Ficha de Treino";
  const aluno = treinoEl.querySelector(".aluno-nome")?.innerText || "";

  let y = 20;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.text("Ficha de Treino de Musculação – RunVision", 105, y, { align: "center" });
  y += 10;

  doc.setFontSize(13);
  doc.text(titulo, 105, y, { align: "center" });
  y += 8;

  doc.setFontSize(12);
  doc.text(aluno, 15, y);
  y += 10;

  const explicacoes = [
    "Técnicas Utilizadas:",
    "• Drop-set: Após a falha, reduza o peso e continue o exercício sem descanso.",
    "• Rest-pause: Série até a falha, pausa de 10-15s, repetir.",
    "• Pirâmide: Aumenta ou reduz carga a cada série.",
    "",
    "Cadência (ritmo de execução):",
    "• 2-0-2: 2s descida, 0s pausa, 2s subida.",
    "• 2-1-2: 2s descida, 1s isometria, 2s subida.",
    "• Explosiva: Subida rápida, descida controlada.",
    ""
  ];

  doc.setFontSize(10);
  explicacoes.forEach(linha => {
    const linhas = doc.splitTextToSize(linha, 180);
    doc.text(linhas, 15, y);
    y += linhas.length * 5;
  });

  y += 5;

  const dias = treinoEl.querySelectorAll(".treino-dia");
  dias.forEach((dia) => {
    if (y > 250) { doc.addPage(); y = 20; }
    doc.setDrawColor(200);
    doc.line(15, y - 2, 195, y - 2);

    const tituloDia = dia.querySelector("h4")?.innerText || "";
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(tituloDia, 15, y);
    y += 7;

    const exercicios = dia.querySelectorAll(".treino-item");
    exercicios.forEach((ex) => {
      if (y > 270) { doc.addPage(); y = 20; }

      const nome = ex.querySelector(".treino-nome")?.innerText || "";
      const series = ex.querySelector(".treino-series")?.innerText || "";
      const detalhes = ex.querySelector(".treino-detalhe")?.innerText || "";
      const nota = ex.querySelector(".treino-nota")?.innerText || "";

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(`• ${nome}`, 17, y);
      y += 5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      if (series) {
        doc.text(series, 20, y);
        y += 5;
      }

      doc.text(detalhes, 20, y);
      y += 5;

      const notaQuebrada = doc.splitTextToSize(nota, 170);
      doc.text(notaQuebrada, 20, y);
      y += notaQuebrada.length * 5 + 2;
    });

    y += 4;
  });

  doc.save("ficha-musculacao-runvision.pdf");
});
