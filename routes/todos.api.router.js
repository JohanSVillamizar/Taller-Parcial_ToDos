const router = require('express').Router();
const todoModel = require('../models/todoModel');

// Index - GET /todospanel
router.get('/', async (req, res) => {
    try {
        const todos = await todoModel.findAll();
        res.json(todos);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Create - POST /todospanel
router.post('/', async (req, res) => {
    try {
        const todo = await todoModel.create({
            title: req.body.title,
            completed: req.body.completed
        });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update - PUT /todospanel/:id
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await todoModel.update(
            {
                title: req.body.title,
                completed: req.body.completed
            },
            {
                where: { id: req.params.id }
            }
        );
        if (updated) {
            const updatedTodo = await todoModel.findByPk(req.params.id);
            res.json(updatedTodo);
        } else {
            res.status(404).send('Todo no encontrado');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete - DELETE /todospanel/:id
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await todoModel.destroy({
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

module.exports = router;
