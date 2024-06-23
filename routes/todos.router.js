const express = require('express');
const router = express.Router();
const Todo = require('../models/todoModel');

// Index - GET /todospanel
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.findAll({
            order: [['title', 'ASC']] // Ordenar por título alfabéticamente ascendente
        });
        res.render('todos/index', { todos });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Create - POST /todospanel
router.post('/', async (req, res) => {
    const { title, completed } = req.body;
    try {
        await Todo.create({ title, completed: completed === 'on' });
        res.redirect('/todospanel');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update - PUT /todospanel/:id
router.put('/:id', async (req, res) => {
    const { title, completed } = req.body;
    try {
        const updatedTodo = await Todo.findByPk(req.params.id);
        if (!updatedTodo) {
            return res.status(404).send('Tarea no encontrada');
        }
        
        updatedTodo.title = title;
        updatedTodo.completed = completed === 'on';
        await updatedTodo.save();
        
        res.redirect('/todospanel'); // Redirigir al índice después de la actualización
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete - DELETE /todospanel/:id
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Todo.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.send('Todo eliminado');
        } else {
            res.status(404).send('Todo no encontrado');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Ruta para mostrar la vista de edición de una tarea específica
router.get('/:id/edit', async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        if (!todo) {
            return res.status(404).send('Tarea no encontrada');
        }
        res.render('todos/edit', { todo });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
