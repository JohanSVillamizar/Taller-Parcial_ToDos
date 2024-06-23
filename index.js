// index.js
require('dotenv').config();
const express = require('express');
const routerTodos = require('./routes');
const methodOverride = require('method-override'); // Importa method-override
const PORT = process.env.PORT || 3000;
const app = express();
const path = require('path');

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Middleware para parsear el body de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para sobrescribir métodos HTTP
app.use(methodOverride('_method')); // Configura method-override

// Configuración de vistas EJS
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Configuración de las rutas
routerTodos(app);

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
