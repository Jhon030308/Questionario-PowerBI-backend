// Variáveis de Estado Interno do Módulo
let perguntas = [];
let indiceAtual = 0;
let respostasUsuario = {};
let aoConcluirCallback = null;

/**
 * Inicializa o módulo do questionário com a lista de perguntas vindas da API
 */
export function iniciarQuestionario(listaPerguntas, aoConcluir) {
  perguntas = listaPerguntas;
  aoConcluirCallback = aoConcluir;
  indiceAtual = 0;
  respostasUsuario = {};

  renderizarPerguntaAtual();
}

/**
 * Desenha na tela a pergunta do índice atual
 */
function renderizarPerguntaAtual() {
  const container = document.getElementById('questionario-content');
  const pergunta = perguntas[indiceAtual];
  const totalPerguntas = perguntas.length;

  // Calculando o percentual da barra de progresso
  const progresso = ((indiceAtual + 1) / totalPerguntas) * 100;

  // Montando o HTML dinâmico da pergunta e alternativas
  container.innerHTML = `
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${progresso}%"></div>
    </div>

    <h2>${pergunta.titulo}</h2>
    <p class="sub-text">${pergunta.descricao || ''}</p>

    <form id="form-pergunta">
      <div class="opcoes-group">
        ${pergunta.opcoes.map(opcao => `
          <label class="opcao-card">
            <input 
              type="radio" 
              name="opcao-selecionada" 
              value="${opcao.id}"
              ${respostasUsuario[pergunta.id] === opcao.id ? 'checked' : ''}
            >
            <span>${opcao.texto}</span>
          </label>
        `).join('')}
      </div>

      <div class="actions-group">
        <button type="button" id="btn-anterior" class="btn btn-secondary" ${indiceAtual === 0 ? 'disabled' : ''}>
          Anterior
        </button>
        <button type="button" id="btn-proximo" class="btn btn-primary">
          ${indiceAtual === totalPerguntas - 1 ? 'Finalizar e Ver Resultado' : 'Próximo'}
        </button>
      </div>
    </form>
  `;

  // Adicionando os ouvintes de eventos nos botões recém-criados
  document.getElementById('btn-anterior').addEventListener('click', voltarPergunta);
  document.getElementById('btn-proximo').addEventListener('click', avancarPergunta);
}

/**
 * Salva a resposta selecionada e avança para a próxima pergunta
 */
function avancarPergunta() {
  const opcaoSelecionada = document.querySelector('input[name="opcao-selecionada"]:checked');

  if (!opcaoSelecionada) {
    alert('Por favor, selecione uma opção para continuar.');
    return;
  }

  const perguntaAtual = perguntas[indiceAtual];
  respostasUsuario[perguntaAtual.id] = opcaoSelecionada.value;

  // Se estiver na última pergunta, dispara o callback para enviar os dados
  if (indiceAtual === perguntas.length - 1) {
    if (aoConcluirCallback) {
      aoConcluirCallback(respostasUsuario);
    }
  } else {
    indiceAtual++;
    renderizarPerguntaAtual();
  }
}

/**
 * Voltar para a pergunta anterior
 */
function voltarPergunta() {
  if (indiceAtual > 0) {
    indiceAtual--;
    renderizarPerguntaAtual();
  }
}