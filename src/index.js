const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require('./middlewares/logger');

const climaRoutes = require('./routes/climaRoutes');
const viajRoutes = require('./routes/viajRoutes');

dotenv.config();

const app = express();
app.use(express.json());

// middleware propio
app.use(logger);

// rutas
app.use('/api/clima', climaRoutes);
app.use('/api/viajes', viajRoutes);

// ruta raíz
app.get('/', (_req, res) => {
  res.send('TripSync está corriendo');
});

const PORT = process.env.PORT || 3000;

// primero conectamos DB y recién levantamos el server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar DB:', err);
    process.exit(1);
  });