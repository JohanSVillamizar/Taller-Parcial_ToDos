const router = require('express').Router()
const client = require('../db/postgres')
const sequelize = require('../db/sequelize');
const todoModel = require('../models/todoModel');  

//index
router.get('/', async (req, res) => {
    try {
        const todos = await todoModel.findAll()
        res.json(todos)
    } catch (error) {
        res.status(500).send(error.message)
    }
    //console.log('GET /api/v1/todos')
    //obtener todos los "todos" de la base de datos
    //await client.connect()
    //const result = await client.query('SELECT * FROM todos')
    //console.log(result)
    //await client.end()
    //res.json(result.rows)
})

//store
router.post('/', async (req,res)=> {
    //console.log('POST /api/v1/todos')
    await client.connect()
    const result = await
    client.query ('INSERT INTO todos (title, completed) VALUES ($1, $2)', 
    [ req.body.title, req.body.completed])
    console.log(result)
    await client.end()
    res.status(201).send('Todo created')
})

//show
router.get('/:id', async (req, res) => {
    try {
        await client.connect()
        const result = await client.query('SELECT * FROM todos WHERE id = $1', [req.params.id])
        if (result.rows.length === 0) {
            res.status(404).send('Todo no encontrado')
        } else {
            res.json(result.rows[0])
        }
    } catch (err) {
        console.error(err)
        res.status(500).send('Error al obtener el todo')
    } finally {
        await client.end() 
    }
})

//Update
router.put('/:id', async (req, res) => {
    try {
        await client.connect()
        const result = await client.query('UPDATE todos SET title = $1, completed = $2 WHERE id = $3', [req.body.title, req.body.completed, req.params.id])
        if (result.rowCount === 0) {
            res.status(404).send('Todo no encontrado')
        } else {
            res.send('Todo updated')
        }
    } catch (err) {
        console.error(err)
        res.status(500).send('Error al actualizar el todo')
    } finally {
        await client.end()
    }
}) 

//Delete
router.delete('/:id', async (req, res) => {
    try {
        await client.connect()
        const result = await client.query('DELETE FROM todos WHERE id = $1', [req.params.id])
        if (result.rowCount === 0) {
            res.status(404).send('Todo no encontrado')
        } else {
            res.send('Todo deleted')
        }
    } catch (err) {
        console.error(err)
        res.status(500).send('Error al eliminar el todo')
    } finally {
        await client.end()
    }
})        

module.exports = router