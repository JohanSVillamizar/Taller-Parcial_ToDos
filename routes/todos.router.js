const router = require('express').Router()
const {connectClient} = require('../db/postgres')
const Todo = require('../models/todoModel')

//Index
router.get('/', async (req, res) => {
    //console.log('GET /api/v1/todos')
    const client = await connectClient();
    try{
        const result = await client.query('SELECT * FROM todos');
        res.render('todos/index', {todos: result.rows});
    } catch (error) {
        res.status(500).send(error.message);
    } finally{
        await client.end();
    }

});

router.post('/', async (req, res) => {
    console.log(req.body);
    try{
        const todo = await Todo.create({ title, completed: completed == 'on' ? true : false });
        res.redirect('/todospanel');
    }catch (error){
        res.status(500).send(error.message);
    }
});

module.exports = router;