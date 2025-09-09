const { Schema, model } = require('mongoose');

const ViajeSchema = new Schema({
  ciudad:  { type: String, required: true, trim: true },
  pais:    { type: String, required: true, trim: true },
  fecha:   { type: Date,   required: true, default: Date.now },
  cliente: { type: String, required: true, trim: true }
}, { timestamps: true });

module.exports = model('Viaje', ViajeSchema);