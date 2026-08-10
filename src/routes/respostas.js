const express = require('express');
const router = express.Router();

const { adicionarResposta } = require('../services/dataService');

router.post('/respostas', (req, res) => {
  const dados = req.body;

  const id = adicionarResposta(dados);

  res.json({
    message: 'Resposta salva com sucesso',
    id: id
  });
});

module.exports = router;
``