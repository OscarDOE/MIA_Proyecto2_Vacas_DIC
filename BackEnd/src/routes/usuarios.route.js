const { Router } = require('express');
const { check } = require('express-validator');
const validateAttributes = require('../middleware/validateAttributes')
require('dotenv').config();

const router = Router();
const usuariosController = require('../controllers/usuarios.controllers');

//Ruta Principal
router.get('/', (req, res) => {
    res.json({status:"50000",
    msg: "ESTAMOS EN LA API DE USUARIOS"});
});

const usuarios = {
    u1:"u1",
    u2:"u2",
    u3:"u3",
    u4:"u4",
    u5:"OSCAR OLIVA",
    u6:"u6",
    u7:"u7",
    u8:"u8",
    u9:"u9",
    u10:"u10",
    u11:"u11",
    u12:"u12"
}

//Ruta para obtener todos los usuarios
router.get('/todos', (req,res) =>{
    res.json({status:"SSSSS",
                msg:"TODOS LOS USUARIOS",usuarios})
});

router.post('/getUser', [
    check('id','El id es obligatorio').not().isEmpty(),
    validateAttributes
], 
usuariosController.getUser
)

router.get('/user:id',(req,res) => {
    const {id} = req.params;
    const user = usuarios[id];
    if(user){
        res.json({status:"GUT",
        msg:'USUARIO ENCONTRADO EN RUTA',
        user});
    }else{
        res.json({status:"NAI",
        msg:'USUARIO NO ENCONTRADO EN RUTA',
        user});
    }
}
)

module.exports = router;