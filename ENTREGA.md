# TripSync Backend — Paquete de Entrega

## 1) Requisitos
- Node.js 18+ (probado con Node 22)
- Cuenta de MongoDB Atlas (ya configurada)
- API key de OpenWeather (ya configurada en `.env`)

---

## 2) Instalación
Clonar el repositorio y entrar en la carpeta del proyecto:
```bash 
```

git clone <URL_DEL_REPO>
cd tripsync-backend
npm install


3) Configuración de entorno

En la raíz del proyecto ya existe un archivo .env con las variables necesarias:

MONGO_URI=mongodb+srv://brenda_user_01:crysUq6Ag9MyYhNqE@clusterbrenda.8s7zmps.mongodb.net/tripsync?retryWrites=true&w=majority&appName=ClusterBrenda
OPENWEATHER_KEY=8a3dad53c55ad7cae5c5928c37b201dc


4) Ejecutar

npm run dev


Salida esperada en consola:
Conectado a MongoDB Atlas
Servidor corriendo en puerto 3000



Chequeo rápido en navegador:

http://localhost:3000/  →  TripSync está corriendo


5) Endpoints disponibles

Viajes (CRUD) — /api/viajes
	•	POST crear:


    curl -X POST http://localhost:3000/api/viajes \
-H "Content-Type: application/json" \
-d '{"ciudad":"Mendoza","pais":"Argentina","fecha":"2025-09-10","cliente":"Brenda Romero"}'

	
    •	GET listar:

  curl http://localhost:3000/api/viajes/68c057baf6fa858dfd7500e0

   	•	GET por id:

 curl http://localhost:3000/api/viajes/68c057baf6fa858dfd7500e0

 	•	PUT actualizar:

 curl -X PUT http://localhost:3000/api/viajes/68c057baf6fa858dfd7500e0 \
-H "Content-Type: application/json" \
-d '{"ciudad":"Bariloche","pais":"Argentina","fecha":"2025-10-01","cliente":"Brenda Romero"}'

	•	DELETE eliminar:

 curl -X DELETE http://localhost:3000/api/viajes/68c057baf6fa858dfd7500e0   

Clima (OpenWeather) — /api/clima
	•	GET por ciudad:

  curl http://localhost:3000/api/clima/Buenos%20Aires



Respuesta ejemplo:

{
  "ciudad": "Buenos Aires",
  "pais": "AR",
  "temperatura": 20.4,
  "sensacion": 19.46,
  "humedad": 37,
  "descripcion": "cielo claro",
  "viento": 2.06
}

6) Estructura del proyecto


src/
  config/db.js           # Conexión con Mongoose
  middlewares/logger.js  # Middleware propio
  models/Viaje.js        # Esquema Mongoose
  routes/climaRoutes.js  # API externa OpenWeather
  routes/viajRoutes.js   # CRUD + express-validator
  index.js               # App Express y montaje de rutas
.env
.gitignore
package.json
README.md
ENTREGA.md


7) Mapeo a consignas
	1.	Base de datos Mongo Atlas: src/config/db.js con mongoose.connect(...).
	2.	Servidor Node + rutas HTTP: src/index.js monta /api/viajes y /api/clima.
	3.	Esquema propio: src/models/Viaje.js (Mongoose Schema + timestamps).
	4.	Validaciones: src/routes/viajRoutes.js con express-validator.
	5.	Middleware propio: src/middlewares/logger.js.
	6.	API externa: src/routes/climaRoutes.js usando OpenWeather.

⸻

8) Evidencias de pruebas
	•	POST /api/viajes → se creó viaje con _id: 68c057baf6fa858dfd7500e0.
	•	GET /api/viajes → devuelve lista con los viajes creados.
	•	GET /api/clima/Buenos Aires → devuelve clima real de Buenos Aires.

⸻

9) Autora

Brenda Florencia Romero
Proyecto integrador final de backend — Global Academy