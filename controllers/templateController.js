const Template = require('../models/templateModel');

// Obtener todas las plantillas
const getAllTemplates = async (req, res) => {
    try {
        const templates = await Template.find({});
        res.status(200).json(templates);
    } catch (err) {
        console.error('Error fetching templates:', err);
        res.status(500).send('Error fetching templates');
    }
};

// Crear una nueva plantilla
const createTemplate = async (req, res) => {
    try {
        const { name, type, content, labels, author } = req.body;

        // Validaciones básicas
        if (!name || !type || !content || !author) {
            return res.status(400).send('Missing required fields: name, type, content, author');
        }

        const newTemplate = new Template({ name, type, content, labels, author });
        await newTemplate.save();
        res.status(201).send('Template created successfully!');
    } catch (err) {
        console.error('Error creating template:', err);
        res.status(500).send('Error creating template');
    }
};

// Actualizar una plantilla por ID
const updateTemplate = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, content, labels, author } = req.body;

        // Validaciones básicas
        if (!name || !type || !content || !author) {
            return res.status(400).send('Missing required fields: name, type, content, author');
        }

        const updatedTemplate = await Template.findByIdAndUpdate(
            id,
            { name, type, content, labels, author },
            { new: true, runValidators: true } // Retorna el documento actualizado
        );

        if (!updatedTemplate) {
            return res.status(404).send('Template not found');
        }

        res.status(200).json(updatedTemplate);
    } catch (err) {
        console.error('Error updating template:', err);
        res.status(500).send('Error updating template');
    }
};

// Eliminar una plantilla por ID
const deleteTemplate = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTemplate = await Template.findByIdAndDelete(id);

        if (!deletedTemplate) {
            return res.status(404).send('Template not found');
        }

        res.status(200).send('Template deleted successfully!');
    } catch (err) {
        console.error('Error deleting template:', err);
        res.status(500).send('Error deleting template');
    }
};

// Buscar plantillas por palabra clave
const searchTemplates = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).send('Search query is required');
        }

        // Buscar en los campos content y name usando $regex
        const templates = await Template.find({
            $or: [
                { content: { $regex: q, $options: 'i' } },
                { name: { $regex: q, $options: 'i' } }
            ]
        });

        res.status(200).json(templates);
    } catch (err) {
        console.error('Error searching templates:', err);
        res.status(500).send('Error searching templates');
    }
};

// Exportar las funciones del controlador
module.exports = {
    getAllTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    searchTemplates,
};