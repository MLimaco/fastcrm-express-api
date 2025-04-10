require('dotenv').config(); // Carga las variables de entorno desde .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');   // Importa cors para permitir solicitudes de diferentes dominios
const templateRoutes = require('./routes/templateRoutes'); // Importa las rutas

const app = express();
const port = process.env.PORT 

// Middleware
app.use(express.json()); // Parsear JSON en las solicitudes
app.use(cors()); // Habilitar CORS para todas las rutas

app.get('/', (req, res) => {
    main().catch(err => console.log(err));
    res.send('Hello World!');
});


// Conectar a MongoDB
async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
}
main().catch(err => console.log(err));

// Usar las rutas
app.use('/api/templates', templateRoutes); // Prefijo para las rutas de plantillas

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});