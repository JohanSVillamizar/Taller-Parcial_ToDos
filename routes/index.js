const express = require('express');
const todosApiRouter = require('./todos.api.router');
const todosRouter = require('./todos.router');

function routerTodos(app){
    const router = express.Router()

    app.use('/', router)
    router.use ('/todospanel', todosRouter)
    router.use('/api/v1/todos', todosApiRouter)
}
module.exports = routerTodos ;