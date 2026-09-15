/**
 * Renderiza os indicadores gerais e os gráficos do Plotly no Dashboard
 * @param {Object} dados - Resultado retornado do Back-End
 */
export function renderizarDashboard(dados) {
  renderizarIndicadores(dados.indicadores);
  renderizarGraficoMaturidade(dados.graficoMaturidade);
  renderizarGraficoCategorias(dados.graficoCategorias);
}

/**
 * Preenche os cards de resumo no topo do dashboard
 */
function renderizarIndicadores(indicadores) {
  const container = document.getElementById('dashboard-indicators');

  container.innerHTML = `
    <div class="card text-center">
      <h3>Nível Geral</h3>
      <p style="font-size: 2rem; font-weight: bold; color: #2563eb;">
        ${indicadores.nivel || 'N/A'}
      </p>
    </div>

    <div class="card text-center">
      <h3>Pontuação</h3>
      <p style="font-size: 2rem; font-weight: bold; color: #16a34a;">
        ${indicadores.pontuacaoTotal || 0} pts
      </p>
    </div>
  `;
}

/**
 * Desenha o gráfico de velocímetro/rosca para o Nível de Maturidade
 */
function renderizarGraficoMaturidade(dadosGrafico) {
  // O Plotly usa um array de 'data' e um objeto de 'layout'
  const data = [
    {
      type: 'pie',
      values: dadosGrafico.valores, // ex: [75, 25]
      labels: dadosGrafico.labels,   // ex: ['Concluído', 'Restante']
      hole: 0.6,                     // Transforma a pizza em rosca
      marker: {
        colors: ['#2563eb', '#e2e8f0']
      },
      textinfo: 'percent',
      hoverinfo: 'label+percent'
    }
  ];

  const layout = {
    title: { text: 'Maturidade Geral (%)' },
    showlegend: false,
    margin: { t: 40, b: 20, l: 20, r: 20 }
  };

  const config = { responsive: true };

  // Função global do Plotly carregada no <head>
  Plotly.newPlot('chart-maturidade', data, layout, config);
}

/**
 * Desenha o gráfico de barras por Categorias de Avaliação
 */
function renderizarGraficoCategorias(dadosCategorias) {
  const data = [
    {
      x: dadosCategorias.categorias, // ex: ['Governança', 'Processos', 'Tecnologia']
      y: dadosCategorias.pontos,     // ex: [80, 60, 90]
      type: 'bar',
      marker: {
        color: '#1a365d'
      }
    }
  ];

  const layout = {
    title: { text: 'Desempenho por Categoria' },
    yaxis: { range: [0, 100], title: 'Pontuação' },
    margin: { t: 40, b: 40, l: 40, r: 20 }
  };

  const config = { responsive: true };

  Plotly.newPlot('chart-categorias', data, layout, config);
}