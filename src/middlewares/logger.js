// src/middlewares/logger.js

// Middleware propio que registra cada petición
module.exports = function logger(req, _res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
};