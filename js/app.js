import { buscarPerguntas, enviarRespostas } from './services/api.js';
import { iniciarQuestionario } from './modules/questionario.js';
import { renderizarDashboard } from './modules/dashboard.js';

// Mapeamento das 3 seções do HTML
const viewQuestionario = document.getElementById('view-questionario');
const viewLoading = document.getElementById('view-loading');
const viewDashboard = document.getElementById('view-dashboard');
const headerStatus = document.getElementById('header-status');

/**
 * Função principal de inicialização da aplicação
 */
async function init() {
  try {
    // 1. Busca as perguntas na API Express
    const perguntas = await buscarPerguntas();

    // 2. Inicia o fluxo do questionário enviando as perguntas e o callback de finalização
    iniciarQuestionario(perguntas, processarEnvioFormulario);
  } catch (error) {
    console.error('Falha ao inicializar a aplicação:', error);
    alert('Erro ao carregar as perguntas do servidor. Verifique se o Back-End está rodando.');
  }
}

/**
 * Executado automaticamente quando o usuário clica em "Finalizar" na última pergunta
 */
async function processarEnvioFormulario(respostasUsuario) {
  // Troca de Tela: Esconde o Questionário e mostra o Loading
  exibirTela('loading');
  headerStatus.textContent = 'Processando Diagnóstico...';

  try {
    // Envia as respostas para o Back-End calcular
    const resultado = await enviarRespostas(respostasUsuario);

    // Desenha os gráficos e indicadores com o Plotly
    renderizarDashboard(resultado);

    // Troca de Tela: Esconde o Loading e mostra o Dashboard
    exibirTela('dashboard');
    headerStatus.textContent = 'Resultado Final';
  } catch (error) {
    console.error('Erro ao processar respostas:', error);
    alert('Erro ao calcular o diagnóstico. Tente novamente.');
    exibirTela('questionario');
    headerStatus.textContent = 'Etapa do Questionário';
  }
}

/**
 * Função auxiliar que controla a visibilidade das 3 telas via classe .hidden
 */
function exibirTela(telaAlvo) {
  viewQuestionario.classList.toggle('hidden', telaAlvo !== 'questionario');
  viewLoading.classList.toggle('hidden', telaAlvo !== 'loading');
  viewDashboard.classList.toggle('hidden', telaAlvo !== 'dashboard');
}

// Executa a inicialização ao carregar o script
init();