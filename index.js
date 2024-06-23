//crear servidor 
require('dotenv').config()
const express = require('express')
const routerTodos = require('./routes')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3000 

app.use(express.json())

//Middleware para parsear los datos del formulario
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) =>{
    //console.log('Middleware de aplicación')
    //console.log(req.method, req.url)
    next()
})

//rutas
routerTodos(app)
app.set('views', './src/views')
app.set('view engine', 'ejs')

//levantando el servidor para escuchar por el puerto 3000
app.listen(PORT, () => {
    console.log('Listening on port:' + PORT);
})