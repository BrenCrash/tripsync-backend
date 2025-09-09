// src/routes/viajRoutes.js
const express = require('express');
const { body, param, validationResult } = require('express-validator');
const Viaje = require('../models/Viaje');

const router = express.Router();

// middleware local de validación
function validar(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errores: errors.array() });
  next();
}

// CREATE: POST /api/viajes
router.post(
  '/',
  [
    body('ciudad').notEmpty().withMessage('ciudad requerida'),
    body('pais').notEmpty().withMessage('pais requerido'),
    body('cliente').notEmpty().withMessage('cliente requerido'),
    body('fecha').optional().isISO8601().toDate().withMessage('fecha inválida (ISO 8601)')
  ],
  validar,
  async (req, res) => {
    try {
      const viaje = await Viaje.create(req.body);
      return res.status(201).json(viaje);
    } catch (_err) {
      return res.status(500).json({ error: 'No se pudo crear el viaje' });
    }
  }
);

// READ: GET /api/viajes
router.get('/', async (_req, res) => {
  try {
    const viajes = await Viaje.find().sort({ createdAt: -1 });
    return res.json(viajes);
  } catch (_err) {
    return res.status(500).json({ error: 'No se pudieron obtener los viajes' });
  }
});

// READ uno: GET /api/viajes/:id
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('id inválido')],
  validar,
  async (req, res) => {
    try {
      const viaje = await Viaje.findById(req.params.id);
      if (!viaje) return res.status(404).json({ mensaje: 'No encontrado' });
      return res.json(viaje);
    } catch (_err) {
      return res.status(500).json({ error: 'Error al buscar el viaje' });
    }
  }
);

// UPDATE: PUT /api/viajes/:id
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('id inválido'),
    body('ciudad').optional().notEmpty(),
    body('pais').optional().notEmpty(),
    body('cliente').optional().notEmpty(),
    body('fecha').optional().isISO8601().toDate()
  ],
  validar,
  async (req, res) => {
    try {
      const viaje = await Viaje.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!viaje) return res.status(404).json({ mensaje: 'No encontrado' });
      return res.json(viaje);
    } catch (_err) {
      return res.status(500).json({ error: 'No se pudo actualizar el viaje' });
    }
  }
);

// DELETE: DELETE /api/viajes/:id
router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('id inválido')],
  validar,
  async (req, res) => {
    try {
      const eliminado = await Viaje.findByIdAndDelete(req.params.id);
      if (!eliminado) return res.status(404).json({ mensaje: 'No encontrado' });
      return res.json({ mensaje: 'Eliminado' });
    } catch (_err) {
      return res.status(500).json({ error: 'No se pudo eliminar el viaje' });
    }
  }
);

module.exports = router;