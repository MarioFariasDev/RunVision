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
