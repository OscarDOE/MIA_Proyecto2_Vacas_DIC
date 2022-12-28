const { Router } = require('express');
const { check } = require('express-validator');
const _ = require('underscore')

const validateAttributes = require('../middleware/validateAttributes')
require('dotenv').config();
const data  = require('../controllers/data')
const router = Router();

let id = 0;

//Ruta Principal
router.get('/', (req, res) => {
    // res.json({status:"50000",
    // msg: "ESTAMOS EN LA API DE USUARIOS"});
    res.json(data.list_users)
});

//Ruta para obtener todos los usuarios
router.get('/todos', (req,res) =>{
    res.json({status:"SSSSS",
                msg:"TODOS LOS USUARIOS",usuarios})
});

router.post('/register', (req, res) => {
    const { Name, User, Photo, Email, Password, ConfirmingP} = req.body;
    if(Name && User && Photo && Email && Password && ConfirmingP){
        if(Password === ConfirmingP){
            const nnn = {Name, User, Photo, Email, Password, id}
            //const newU = {...req, id};
            id++;
            data.list_users.push(nnn)
            res.json(data.list_users)
            res.json("saved");
        }else{
            res.json({msg:"LAS CONTRASEÑAS NO COINCIDEN"})
        }
    }else{
        res.json({error:'Hubo un error'})
    }
})
router.post('/login', (req, res) => {
    const { User, Password} = req.body;
    if(User && Password){
        let encontrado = data.getUserByUser(User);
        console.log(encontrado)
        if(Password === encontrado.Password){
            //res.json(encontrado)
            res.json({msg:"LOGIN CONRRECTO"});
        }else{
            res.json({msg:"LAS CONTRASEÑAS NO COINCIDEN"})
        }
    }else{
        res.json({error:'Hubo un error'})
    }
})



router.delete('/:id', (req, res) => {
    const { id } = req.params
    const index = data.list_users.findIndex((xxx) => xxx.id === +id)
    if(index == -1){
        res.json({msg:"ERROR AL ELIMINAR"})
    }else{
        data.list_users.splice(index,1)
        res.json({msg:"ELIMINADO"})
    }
    //console.log(req.params)
})



router.put('/:id', (req, res) => {
    const { id } = req.params
    let encontrado = data.getUser(id);
    console.log(id)

    const index = data.list_users.findIndex((xxx) => xxx.id === +id)
    if(index == -1){
        res.json({msg:"ERROR AL ELIMINAR"})
    }else{
        const newU = {encontrado}

        data.list_users[index] = {
            ...encontrado,
            ...req.body
        }
       
        console.log(encontrado)
        console.log(req.body)
        res.json({msg:"CAMBIADO"})
    }
    console.log(req.params)
    console.log(data.list_users)
})



router.get('/user:id',(req,res) => {
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