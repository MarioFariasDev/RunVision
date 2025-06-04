document.getElementById('training-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const distance = parseInt(document.getElementById('distance').value);
  const level = document.getElementById('level').value;
  const days = parseInt(document.getElementById('days').value);
  const semanas = parseInt(document.getElementById('semanas').value);

  const planilha = gerarPlanilha(distance, level, days, semanas);
  document.getElementById('planilha').innerHTML = planilha;
  document.getElementById('download-pdf').style.display = 'block';
});

function determinarFase(semana) {
  if (semana <= 4) return "Base";
  if (semana <= 8) return "Construção";
  if (semana <= 12) return "Pico";
  if (semana <= 14) return "Polimento";
  return "Recuperação";
}

function gerarDicasHTML() {
  return `
    <section class="dicas-section">
      <h2>Dicas de Treino</h2>
      <p>Confira vídeos úteis sobre os principais tipos de treino:</p>
      <ul>
        <li><strong>Drills (técnica de corrida):</strong> <a href="https://www.youtube.com/watch?v=bm8mYVVZy0k" target="_blank">Drills essenciais para corrida</a></li>
        <li><strong>Fartlek:</strong> <a href="https://www.youtube.com/watch?v=6dQ9aJYcMZc" target="_blank">Como fazer Fartlek corretamente</a></li>
        <li><strong>Intervalado:</strong> <a href="https://www.youtube.com/watch?v=dkRZzDUF1wo" target="_blank">Treino intervalado para performance</a></li>
        <li><strong>Tempo Run:</strong> <a href="https://www.youtube.com/watch?v=iL0_EoJ3cZc" target="_blank">Corrida em ritmo constante</a></li>
        <li><strong>Longão:</strong> <a href="https://www.youtube.com/watch?v=UGuUga-1Go8" target="_blank">Como fazer o longão corretamente</a></li>
        <li><strong>Regenerativo:</strong> <a href="https://www.youtube.com/watch?v=OMVDK5Ar0iA" target="_blank">Importância do treino regenerativo</a></li>
        <li><strong>Ritmo de prova:</strong> <a href="https://www.youtube.com/watch?v=_a0GywAFMKU" target="_blank">Como encontrar seu pace ideal</a></li>
        <li><strong>Simulado:</strong> <a href="https://www.youtube.com/watch?v=vb7_M-k7bJQ" target="_blank">Simulado de corrida de rua</a></li>
        <li><strong>Educativos:</strong> <a href="https://www.youtube.com/watch?v=Z-wVu2Ke_pE" target="_blank">Educativos para melhorar sua corrida</a></li>
      </ul>
    </section>
  `;
}

function exibirDicas() {
  const dicasHTML = gerarDicasHTML();
  const dicasContainer = document.createElement('div');
  dicasContainer.innerHTML = dicasHTML;
  document.querySelector('.result-section').appendChild(dicasContainer);
}

function gerarPlanilha(distance, level, days, semanasTotais) {
  const planos = {}; // use seu objeto completo aqui
  const planoSelecionado = planos[level] && planos[level][distance];
  if (planoSelecionado) {
    const treinos = [];
    const totalSemanasPlano = planoSelecionado.semanas;

    for (let semana = 1; semana <= semanasTotais; semana++) {
      const fase = determinarFase(semana);
      const semanaBase = semana <= totalSemanasPlano ? semana : totalSemanasPlano;
      const treinoSemana = planoSelecionado.dados[semanaBase];

      treinos.push(`
        <div class="semana" style="margin-bottom: 2rem; text-align: center;">
          <h3>Semana ${semana} – ${level.toUpperCase()} ${distance}K</h3>
          <p><strong>Fase do Macrociclo:</strong> ${fase}</p>
          <ul style="text-align: left; margin-top: 1rem;">
      `);


      for (let dia = 0; dia < days; dia++) {
        const treino = treinoSemana[dia % treinoSemana.length];
        const titulo = treino.includes(':') ? treino.split(':')[0] : "Treino";
        const conteudo = treino.includes(':') ? treino.split(':')[1] : treino;

        treinos.push(`
          <li style="margin-bottom: 1rem;">
            <details style="background-color: #0f172a; padding: 1rem; border-radius: 8px;">
              <summary style="color: #f97316; font-weight: bold; cursor: pointer;">Dia ${dia + 1} – ${titulo}</summary>
              <p style="margin-top: 0.75rem; color: #e2e8f0;">${conteudo}</p>
              <a href="#" target="_blank" class="video-link" style="display: inline-block; background-color: #0ea5e9; color: white; padding: 0.4rem 0.8rem; border-radius: 6px; text-decoration: none; margin-top: 0.5rem; font-weight: bold;">Ver vídeo</a>
            </details>
          </li>
        `);
      }

      treinos.push(`</ul></div>`);
    }

    return treinos.join('');
  }

  return `<p style="text-align:center; color:#facc15; background-color:#1e293b; padding:1rem; border-radius:8px; margin-top:1rem;">Desculpe, ainda não temos um plano estruturado para esse nível/distância com ${semanasTotais} semanas.</p>`;
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

// Treino de Musculação Dinâmico
const treinoData = {
  hipertrofia: [
    {
      grupo: "Peito + Tríceps",
      exercicios: [
        { nome: "Supino Reto com Barra", tecnica: "Pirâmide Crescente", descanso: "60-90s", video: "https://www.youtube.com/watch?v=rT7DgCr-3pg", cadencia: "2-0-2", nota: "Concentre-se na fase excêntrica" },
        { nome: "Cross Over", tecnica: "Rest-Pause", descanso: "45s", video: "https://www.youtube.com/watch?v=taI4XduLpTk", cadencia: "2-1-2", nota: "Use carga moderada" },
        { nome: "Tríceps Corda", tecnica: "Drop Set", descanso: "30s", video: "https://www.youtube.com/watch?v=vB5OHsJ3EME", cadencia: "2-0-2", nota: "Evite balançar o corpo" }
      ]
    }
  ],
  emagrecimento: [
    {
      grupo: "Full Body HIIT",
      exercicios: [
        { nome: "Agachamento com Salto", tecnica: "20s ON / 10s OFF", descanso: "20s", video: "https://www.youtube.com/watch?v=Ut0bVKwkgOs", cadencia: "explosiva", nota: "Mantenha postura" },
        { nome: "Burpee", tecnica: "Tabata", descanso: "10s", video: "https://www.youtube.com/watch?v=TU8QYVW0gDU", cadencia: "explosiva", nota: "Pouse suave" },
        { nome: "Mountain Climber", tecnica: "30s", descanso: "15s", video: "https://www.youtube.com/watch?v=nmwgirgXLYM", cadencia: "rápida", nota: "Estabilize o core" }
      ]
    }
  ],
  resistencia: [
    {
      grupo: "Funcional Corrida",
      exercicios: [
        { nome: "Afundo com Passada", tecnica: "3x12 por perna", descanso: "45s", video: "https://www.youtube.com/watch?v=QOVaHwm-Q6U", cadencia: "2-0-2", nota: "Evite projetar joelho à frente" },
        { nome: "Prancha", tecnica: "3x30s", descanso: "30s", video: "https://www.youtube.com/watch?v=pSHjTRCQxIw", cadencia: "estática", nota: "Ative o core" },
        { nome: "Stiff com Halteres", tecnica: "3x12", descanso: "60s", video: "https://www.youtube.com/watch?v=DFzHqeP1a8E", cadencia: "2-1-2", nota: "Alongue bem os posteriores" }
      ]
    }
  ]
};

// === MELHORIA VISUAL: CENTRALIZADO E RESPONSIVO COM CLASSES CSS ===
document.getElementById('musculacao-form')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const objetivo = document.getElementById('objetivo').value;
  const frequencia = parseInt(document.getElementById('frequencia').value);
  const container = document.getElementById('treino-musculacao');

  const planos = treinoData[objetivo];
  if (!planos) return;

  let resultado = `<div class="treino-container">
    <h3 class="treino-titulo">${objetivo.charAt(0).toUpperCase() + objetivo.slice(1)} – ${frequencia} dias</h3>
  `;

  for (let i = 0; i < frequencia; i++) {
    const treino = planos[i % planos.length];
    resultado += `<div class="treino-dia">
      <h4 class="treino-dia-titulo">Dia ${i + 1}: ${treino.grupo}</h4>
      <ul class="treino-lista">
  `;

    treino.exercicios.forEach(ex => {
      resultado += `<li class="treino-item">
        <p><strong class="treino-nome">${ex.nome}</strong> – ${ex.tecnica}</p>
        <p class="treino-detalhe">Cadência: ${ex.cadencia} | Descanso: ${ex.descanso}</p>
        <p class="treino-nota">Nota: ${ex.nota}</p>
        <div><a href="${ex.video}" target="_blank" class="video-link">Ver demonstração</a></div>
      </li>`;
    });

    resultado += `</ul></div>`;
  }

  resultado += '</div>';
  container.innerHTML = resultado;
  document.getElementById("download-ficha").style.display = "block";
});


document.getElementById("download-ficha")?.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const treinoEl = document.getElementById("treino-musculacao");
  const titulo = treinoEl.querySelector(".treino-titulo")?.innerText || "Ficha de Treino";

  let y = 20;

  // Cabeçalho
  doc.setFont("helvetica", "normal", "latin1"); // usa charset compatível com português
  doc.setFontSize(16);
  doc.text("Ficha de Treino de Musculação – RunVision", 105, y, { align: "center" });
  y += 10;

  doc.setFontSize(13);
  doc.text(titulo, 105, y, { align: "center" });
  y += 12;

  // Introdução: Técnicas e Cadência
  const explicacoes = [
    "Técnicas Utilizadas:",
    "• Drop-set: Após a falha, reduza o peso e continue o exercício sem descanso.",
    "• Rest-pause: Realize uma série até a falha, descanse de 10-15s, e repita com a mesma carga.",
    "• Bi-set / Tri-set: Dois ou três exercícios seguidos para o mesmo grupo muscular, sem descanso entre eles.",
    "• Pré-exaustão: Exercício isolado antes do composto para fadigar o músculo-alvo.",
    "",
    "Cadência (ritmo de execução):",
    "• 2-0-2: 2s na descida, sem pausa, 2s na subida.",
    "• 2-1-2: 2s na descida, 1s em isometria, 2s na subida.",
    "• Explosiva: Máxima velocidade na subida com controle na descida.",
    "• Estática: Isometria – manter a posição sem movimentar.",
    ""
  ];

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  explicacoes.forEach(linha => {
    const linhas = doc.splitTextToSize(linha, 180);
    doc.text(linhas, 15, y);
    y += linhas.length * 5;
  });

  y += 5;

  // Listagem de treinos
  const dias = treinoEl.querySelectorAll(".treino-dia");

  dias.forEach((dia) => {
    if (y > 250) { doc.addPage(); y = 20; }

    const tituloDia = dia.querySelector("h4")?.innerText || "";
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(tituloDia, 15, y);
    y += 7;

    const exercicios = dia.querySelectorAll(".treino-item");

    exercicios.forEach((ex) => {
      if (y > 270) { doc.addPage(); y = 20; }

      const nome = ex.querySelector(".treino-nome")?.innerText || "";
      const detalhes = ex.querySelector(".treino-detalhe")?.innerText || "";
      const nota = ex.querySelector(".treino-nota")?.innerText || "";

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(`• ${nome}`, 17, y);
      y += 5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
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
