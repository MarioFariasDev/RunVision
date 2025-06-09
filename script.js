// Ativa elementos com [data-reveal] ao rolar
window.addEventListener('scroll', () => {
  document.querySelectorAll('[data-reveal]').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
});

document.getElementById('training-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const distance = parseInt(document.getElementById('distance').value);
  const level = document.getElementById('level').value;
  const days = parseInt(document.getElementById('days').value);
  const semanas = parseInt(document.getElementById('semanas').value);

  document.getElementById('planilha').innerHTML = gerarPlanilha(distance, level, days, semanas);
  document.getElementById('download-pdf').style.display = 'block';
});

// FASES DO MACROCICLO
function determinarFase(semana) {
  if (semana <= 4) return "Base";
  if (semana <= 8) return "Construção";
  if (semana <= 12) return "Pico";
  if (semana <= 14) return "Polimento";
  return "Recuperação";
}

function gerarPlanilha(distance, level, days, semanasTotais) {
  const planos = {
    iniciante: {
      5: {
        semanas: 8,
        dados: {
          1: ["30 min caminhada + corrida leve (1min corrida / 2min caminhada)", "Drills básicos", "Longão: 3km caminhando ou trotando"],
          2: ["30 min caminhada + corrida leve", "Drills básicos", "Longão: 3km trotando"],
          3: ["4x2min corrida / 1min caminhada", "Caminhada 20min + educativos", "Longão: 4km"],
          4: ["4x2min corrida / 1min caminhada", "Drills + mobilidade leve", "Longão: 4km"],
          5: ["5x3min corrida / 1min caminhada", "Trote leve 20min + educativos", "Longão: 5km"],
          6: ["5x3min corrida / 1min caminhada", "Drills + caminhada 20min", "Longão: 5km"],
          7: ["Corrida leve de 20 a 30 min", "Alongamentos ativos", "Prova teste: 5km"],
          8: ["Corrida leve 25 min", "Mobilidade + educativos leves", "Prova: 5km"]
        }
      },
      10: {
        semanas: 10,
        dados: {
          1: ["Rodagem leve 20min + caminhada 10min", "Educativos: skipping, ankipô", "Longão: 6km"],
          2: ["Rodagem leve contínua: 25min", "Drills + mobilidade", "Longão: 7km"],
          3: ["Fartlek 6x (1min forte / 2min leve)", "Caminhada + educativos", "Longão: 8km"],
          4: ["Rodagem progressiva: 3km leve + 2km médio", "Drills técnicos", "Longão: 9km"],
          5: ["Ritmo: 20min em Z3", "Bike leve 30min", "Longão: 10km"],
          6: ["Rodagem leve contínua: 30min", "Funcional leve ou caminhada", "Longão: 10km"],
          7: ["Fartlek estruturado 8x (1min forte / 1min leve)", "Educativos + mobilidade", "Longão: 8km"],
          8: ["Ritmo controlado 25min Z3", "Alongamento + caminhada", "Longão: 9km com progressão"],
          9: ["Rodagem leve 20min", "Descanso ativo", "Prova teste: 10km"],
          10: ["Corrida contínua leve 30min", "Alongamento completo", "Prova: 10km"]
        }
      }
    },
    intermediario: {
      5: {
        semanas: 6,
        dados: {
          1: ["Intervalado: 4x400m ritmo moderado", "Ritmo contínuo 20min Z3", "Longão: 6km Z2"],
          2: ["Intervalado: 5x400m", "Rodagem leve 4km + educativos", "Longão: 7km"],
          3: ["Intervalado: 6x400m", "Ritmo contínuo 25min", "Longão: 8km"],
          4: ["Intervalado: 6x500m", "Ritmo 30min + mobilidade", "Longão: 9km"],
          5: ["Fartlek 6x1min / 2min leve", "Rodagem contínua leve 6km", "Longão: 10km"],
          6: ["Simulado: 5km", "Alongamento e mobilidade ativa", "Recuperação ativa"]
        }
      },
      21: {
        semanas: 10,
        dados: {
          1: ["Rodagem: 6km Z2", "Intervalado: 4x1000m", "Longão: 14km"],
          2: ["Fartlek: 6x3min / 2min leve", "Ritmo: 30min", "Longão: 15km"],
          3: ["Rodagem: 7km leve", "Intervalado: 5x1000m", "Longão: 16km"],
          4: ["Tempo Run: 20min", "Drills + educativos", "Longão: 17km"],
          5: ["Ritmo progressivo: 3km leve / 3km médio / 2km forte", "Rodagem leve", "Longão: 18km"],
          6: ["Intervalado: 3x1600m", "Caminhada ativa + mobilidade", "Simulado: 15km"],
          7: ["Rodagem leve 8km", "Drills e educativos", "Longão: 20km"],
          8: ["Ritmo 35min Z3", "Funcional leve", "Longão: 21km"],
          9: ["Rodagem leve 6km", "Descanso ativo", "Simulado: 21km"],
          10: ["Regenerativo 4km", "Alongamento completo", "Prova: 21km"]
        }
      }
    },
    avancado: {
      10: {
        semanas: 6,
        dados: {
          1: ["Intervalado: 5x1000m", "Rodagem 6km Z2", "Longão: 12km"],
          2: ["Intervalado: 6x800m", "Ritmo 30min Z3-Z4", "Longão: 13km"],
          3: ["Intervalado: 6x1000m", "Rodagem + educativos", "Longão: 14km com variação"],
          4: ["Tempo Run: 20min", "Intervalado 3x2000m", "Longão: 15km"],
          5: ["Ritmo 35min", "Rodagem 6km", "Longão: 16km"],
          6: ["Simulado 10km", "Alongamentos e recuperação", "Cross leve"]
        }
      },
      21: {
        semanas: 8,
        dados: {
          1: ["Rodagem 8km + educativos", "Intervalado: 5x1000m", "Longão: 16km"],
          2: ["Ritmo: 40min em pace de prova", "Funcional leve", "Longão: 17km"],
          3: ["Intervalado: 4x1600m", "Cross leve", "Longão: 18km com progressão"],
          4: ["Tempo Run: 30min", "Rodagem 6km", "Longão: 20km"],
          5: ["Intervalado: 3x2000m", "Drills técnicos", "Longão: 21km"],
          6: ["Simulado 15km", "Alongamento profundo", "Rodagem leve"],
          7: ["Ritmo 40min", "Mobilidade ativa", "Longão: 22km"],
          8: ["Prova 21km", "Recuperação ativa", "Descanso"]
        }
      },
      42: {
        semanas: 12,
        dados: {
          1: ["Rodagem leve 10km", "Drills técnicos", "Longão: 20km"],
          2: ["Intervalado: 4x1600m", "Rodagem 8km", "Longão: 22km"],
          3: ["Tempo Run: 40min", "Funcional leve", "Longão: 24km"],
          4: ["Intervalado: 3x3000m", "Ritmo 50min", "Longão: 26km"],
          5: ["Rodagem 10km", "Educativos", "Longão: 28km"],
          6: ["Simulado: 28km", "Descanso ativo", "Alongamento completo"],
          7: ["Tempo Run: 45min", "Rodagem leve", "Longão: 30km"],
          8: ["Intervalado: 4x2000m", "Funcional leve", "Longão: 32km"],
          9: ["Ritmo leve: 35min", "Cross training", "Longão: 28km"],
          10: ["Polimento: 30min leve", "Mobilidade", "Simulado 30km"],
          11: ["Rodagem leve 6km", "Descanso", "Prova: 42km"],
          12: ["Recuperação ativa", "Alongamento profundo", "Descanso"]
        }
      }
    }
  };

  const planoSelecionado = planos[level] && planos[level][distance];
  if (planoSelecionado) {
    const treinos = [];
    const totalSemanasPlano = planoSelecionado.semanas;

    for (let semana = 1; semana <= semanasTotais; semana++) {
      const fase = determinarFase(semana);
      const semanaBase = semana <= totalSemanasPlano ? semana : totalSemanasPlano;
      const treinoSemana = planoSelecionado.dados[semanaBase];

      treinos.push(`<div class="semana">
        <h3>Semana ${semana} – ${level.toUpperCase()} ${distance}K</h3>
        <p><strong>Fase do Macrociclo:</strong> ${fase}</p>
        <ul>`);

      for (let dia = 0; dia < days; dia++) {
        const treino = treinoSemana[dia % treinoSemana.length];
        const titulo = treino.includes(':') ? treino.split(':')[0] : `Treino`;
        treinos.push(`<li>
          <details>
            <summary><strong>Dia ${dia + 1}</strong> – ${titulo}</summary>
            <p>${treino}</p>
          </details>
        </li>`);
      }

      treinos.push(`</ul></div>`);
    }

    return treinos.join('');
  }

  return `<p>Desculpe, ainda não temos um plano estruturado para esse nível/distância com ${semanasTotais} semanas.</p>`;
}

// PDF COM VISUAL MELHORADO
const { jsPDF } = window.jspdf;

document.getElementById('download-pdf').addEventListener('click', function () {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const content = document.getElementById('planilha');

  // Clona e expande detalhes
  const clone = content.cloneNode(true);
  clone.querySelectorAll('details').forEach(d => d.open = true);

  const semanas = clone.querySelectorAll('.semana');
  let y = 20;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('Plano de Treino Personalizado – RunVision', 105, 15, { align: 'center' });

  semanas.forEach((semana) => {
    const titulo = semana.querySelector('h3')?.innerText || '';
    const fase = semana.querySelector('p')?.innerText || '';
    const treinos = semana.querySelectorAll('li');

    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    // Semana + fase
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

    // Treinos
    treinos.forEach((treino) => {
      if (y > 275) {
        doc.addPage();
        y = 20;
      }

      const texto = treino.innerText.trim();
      const lines = doc.splitTextToSize(texto, 180);
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(lines, 10, y);
      y += lines.length * 5 + 2;
    });

    y += 5; // Espaço extra entre semanas
  });

  doc.save('planilha-runvision.pdf');
});
// Alternar abas
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});
