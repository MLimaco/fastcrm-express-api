const mongoose = require('mongoose');

// Define el esquema
const templateSchema = new mongoose.Schema({
    name: String,
    type: String, // Tipo de plantilla
    content: String, // Contenido de la plantilla
    labels: [String], // Etiquetas asociadas
    author: String, // Autor de la plantilla
    createdAt: {
        type: Date,
        default: Date.now, // Fecha de creación
    },
});

// Crea el modelo basado en el esquema
const Template = mongoose.model('Template', templateSchema);

module.exports = Template; // Exporta el modelo