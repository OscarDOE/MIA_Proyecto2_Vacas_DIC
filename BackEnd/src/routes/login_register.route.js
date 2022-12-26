const { Router } = require('express');
const { check } = require('express-validator');
const validateAttributes = require('../middleware/validateAttributes')
require('dotenv').config();

const router = Router();
const login_register = require('../controllers/login_register.controller');

//Ruta Principal
router.get('/', (req, res) => {
    res.json({
        status:"LOFIN REGISTER",
        msg: "ESTAMMOS EN LA APIS DE LOGIN RESIGTER"
    })
})

//Registro de usuarios turista
router.post('/register', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('foto', 'La foto es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateAttributes],
    login_register.register 
);