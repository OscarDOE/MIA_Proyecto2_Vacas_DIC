//Crear un servidor usando express, cors y body-parse
const express = require('express');
const app = express();

//const cors = require('cors');

app.use(express.json({limit:'200mb'}));


//ROUTES
app.get('/', (req, res) => {
    res.json({status: "1",
                name:{first:"OSCAR",last:"OLIVA"} ,dck:"LALALAL" })
    //res.send('<a href="https://developer.mozilla.org/es/docs/Web/HTML/Element/a"> Hola muindo, blablablablablbalblfffffa </a>')
})

//Ruta de Usuarios
app.use('/usuarios', require('./routes/usuarios.route'));

module.exports = app;