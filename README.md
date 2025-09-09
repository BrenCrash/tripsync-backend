# TripSync Backend — Proyecto final para Global Academy

Este proyecto es el integrador final de backend, desarrollado con **Node.js**, **Express** y **MongoDB Atlas**.  
Permite gestionar viajes mediante una API REST que incluye operaciones de creación, lectura, edición y eliminación (CRUD), con validaciones integradas, middleware propio y consumo de API externa (OpenWeather).

---

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- express-validator
- dotenv
- axios (para integración con OpenWeather)

---

## Instalación y configuración

1. Clonar el repositorio  
   ```bash
   git clone <URL_REPOSITORIO>
   cd tripsync-backend

2.	Instalar dependencias  
    npm install


3.	Crear archivo .env en la raíz del proyecto con el siguiente contenido:

    MONGO_URI=<tu cadena de conexión de Atlas>
OPENWEATHER_KEY=<tu api key de OpenWeather>
PORT=3000


Ejemplo:

MONGO_URI=mongodb+srv://usuario:clave@cluster.mongodb.net/tripsync?retryWrites=true&w=majority
OPENWEATHER_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
PORT=3000


4.	Iniciar el servidor en modo desarrollo
    npm run dev


  Verás en consola:

  Conectado a MongoDB Atlas
  Servidor corriendo en puerto 3000

5.	Verificar que la API responde en el navegador o Thunder Client
    http://localhost:3000/



# Estructura del proyecto


tripsync-backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── middlewares/
│   │   └── logger.js
│   ├── models/
│   │   └── Viaje.js
│   ├── routes/
│   │   ├── viajRoutes.js
│   │   └── climaRoutes.js
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md



Endpoints disponibles

Viajes (CRUD) — /api/viajes
	•	POST /api/viajes
Crea un nuevo viaje.

{
  "ciudad": "Mendoza",
  "pais": "Argentina",
  "fecha": "2025-09-10",
  "cliente": "Brenda Romero"
}



	•	GET /api/viajes
Devuelve todos los viajes guardados.
	•	GET /api/viajes/:id
Devuelve un viaje por ID.
	•	PUT /api/viajes/:id
Edita un viaje existente por ID.


{
  "ciudad": "Bariloche",
  "pais": "Argentina",
  "fecha": "2025-10-01",
  "cliente": "Brenda Romero"
}

	•	DELETE /api/viajes/:id
Elimina un viaje por ID.

⸻

Clima (API externa) — /api/clima
	•	GET /api/clima/:ciudad
Consulta el clima actual de una ciudad usando OpenWeather.
Ejemplo:


curl http://localhost:3000/api/clima/Panama


{
  "ciudad": "Panama",
  "pais": "PA",
  "temperatura": 28.04,
  "sensacion": 27.5,
  "humedad": 70,
  "descripcion": "cielo claro",
  "viento": 3.2
}


# Ejemplos de pruebas con curl

## Crear un viaje
bash
curl -X POST http://localhost:3000/api/viajes \
-H "Content-Type: application/json" \
-d '{"ciudad":"Mendoza","pais":"Argentina","fecha":"2025-09-10","cliente":"Brenda Romero"}'"fecha":"2025-09-10","cliente":"Brenda Romero"

# Listar todos los viajes
curl http://localhost:3000/api/viajes

# Editar un viaje

Nota: se utiliza un _id real generado por MongoDB como ejemplo.
Reemplazarlo por otro si se crean más viajes.

curl -X PUT http://localhost:3000/api/viajes/68c057baf6fa858dfd7500e0 \
-H "Content-Type: application/json" \
-d '{"ciudad":"Bariloche","pais":"Argentina","fecha":"2025-10-01","cliente":"Brenda Romero"}'


# Eliminar un viaje
curl -X DELETE http://localhost:3000/api/viajes/ID_DEL_VIAJE

# Consultar clima
curl http://localhost:3000/api/clima/Panama




# Notas
	•	Todos los campos de viaje son obligatorios y validados con express-validator.
	•	La base de datos tripsync se crea automáticamente al guardar el primer viaje.
	•	El backend está listo para integrarse con un frontend.
	•	Incluye integración externa con OpenWeather para consultar el clima de cualquier ciudad.
	•	El middleware logger registra cada request en consola con método y URL.

⸻

# Autora

# Brenda Florencia Romero
# Proyecto integrador final de backend — Global Academy

