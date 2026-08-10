const express = require('express');
const router = express.Router();

const { buscarPorId } = require('../services/dataService');
const { calcularIndicadores } = require('../services/dashboardService');

router.get('/dashboard/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const resposta = buscarPorId(id);

  if (!resposta) {
    return res.status(404).json({ error: 'Resposta não encontrada' });
  }

  const indicadores = calcularIndicadores(resposta);

  res.json({
    indicadores,
    dados: resposta
  });
});

module.exports = router;