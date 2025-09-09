// src/routes/climaRoutes.js
const express = require('express');
const axios = require('axios');

const router = express.Router();

/**
 * GET /api/clima/:ciudad
 * Ejemplo: /api/clima/Buenos Aires
 * Requiere: process.env.OPENWEATHER_KEY definido en .env
 */
router.get('/:ciudad', async (req, res) => {
  const { ciudad } = req.params;
  const apiKey = process.env.OPENWEATHER_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Falta configurar OPENWEATHER_KEY en .env' });
  }

  try {
    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: ciudad,
        appid: apiKey,
        units: 'metric',
        lang: 'es'
      }
    });

    return res.json({
      ciudad: data?.name,
      pais: data?.sys?.country,
      temperatura: data?.main?.temp,
      sensacion: data?.main?.feels_like,
      humedad: data?.main?.humidity,
      descripcion: data?.weather?.[0]?.description,
      viento: data?.wind?.speed
    });
  } catch (err) {
    if (err.response) {
      const { status, data } = err.response;
      if (status === 404) {
        return res.status(404).json({ error: `No se encontró la ciudad: ${ciudad}` });
      }
      return res.status(status).json({ error: data?.message || 'Error consultando el clima' });
    }
    return res.status(502).json({ error: 'No se pudo obtener el clima' });
  }
});

module.exports = router;