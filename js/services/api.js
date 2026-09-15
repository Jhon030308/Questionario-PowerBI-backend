// URL base da sua API em Express (ajuste a porta se o seu servidor rodar em outra, ex: 3000)
const BASE_URL = 'http://localhost:3000/api';

/**
 * Busca a lista de perguntas do questionário no Back-End.
 */
export async function buscarPerguntas() {
  try {
    const response = await fetch(`${BASE_URL}/perguntas`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar perguntas: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro no serviço de perguntas:', error);
    throw error;
  }
}

/**
 * Envia as respostas selecionadas para o servidor processar a maturidade.
 * @param {Object} respostas - Objeto contendo os dados do questionário.
 */
export async function enviarRespostas(respostas) {
  try {
    const response = await fetch(`${BASE_URL}/respostas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(respostas)
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar respostas: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro no serviço de envio:', error);
    throw error;
  }
}