const express = require('express');
const {
    getAllTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
} = require('../controllers/templateController');

const router = express.Router();

// Rutas para las plantillas
router.get('/', getAllTemplates); // Obtener todas las plantillas
router.post('/', createTemplate); // Crear una nueva plantilla
router.put('/:id', updateTemplate); // Actualizar una plantilla por ID
router.delete('/:id', deleteTemplate); // Eliminar una plantilla por ID

module.exports = router;