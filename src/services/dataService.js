const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/respostas.json');

function lerDados() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function salvarDados(dados) {
  fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));
}

function adicionarResposta(resposta) {
  const dados = lerDados();

  const nova = {
    id: dados.length + 1,
    ...resposta
  };

  dados.push(nova);
  salvarDados(dados);

  return nova.id;
}

function buscarPorId(id) {
  const dados = lerDados();
  return dados.find(r => r.id === id);
}

module.exports = {
  adicionarResposta,
  buscarPorId
};
