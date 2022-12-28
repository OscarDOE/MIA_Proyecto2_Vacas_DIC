//Crear un servidor usando express, cors y body-parse
const express = require('express');
const app = express();
const morgan = require('morgan')
const cors = require('cors');


//middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use(cors());

//ROUTES
// app.get('/', (req, res) => {
//     res.json({status: "1",
//                 name:{first:"OSCAR",last:"OLIVA"} ,dck:"LALALAL" })
//     //res.send('<a href="https://developer.mozilla.org/es/docs/Web/HTML/Element/a"> Hola muindo, blablablablablbalblfffffa </a>')
// })


app.use(require('./routes/index'))
//Ruta de Usuarios
app.use('/users', require('./routes/usuarios.route'));

//Ruta de Vuelos
app.use('/travels', require('./routes/viajes.route'));

//Ruta de Carros
app.use('/cars', require('./routes/carros.route'));
//Ruta de Carros
app.use('/dates', require('./routes/dates.route'));

module.exports = app;