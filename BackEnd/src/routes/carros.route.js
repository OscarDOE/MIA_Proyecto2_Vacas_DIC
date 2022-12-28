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
    res.json(data.list_cars)
});

//Ruta para obtener todos los usuarios
router.get('/todos', (req,res) =>{
    res.json({status:"SSSSS",
                msg:"TODOS LOS VUELOS"})
});

router.post('/register', (req, res) => {
    const { Agency, Brand, Badge, Model, Price, ActualCity} = req.body;
    console.log(req.body)
    if(Agency && Brand && Badge && Model && ActualCity && Price){
        const newU = {...req.body, id};
        id++;
        data.list_cars.push(newU)
        res.json(data.list_cars)
        res.json("saved");

    }else{
        console.log()
        res.json({error:'Hubo un error'})
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    const index = data.list_cars.findIndex((xxx) => xxx.id === +id)
    if(index == -1){
        res.json({msg:"ERROR AL ELIMINAR"})
    }else{
        data.list_cars.splice(index,1)
        res.json({msg:"ELIMINADO"})
    }
    //console.log(req.params)
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    let encontrado = data.getCar(id);
    console.log(id)

    const index = data.list_cars.findIndex((xxx) => xxx.id === +id)
    if(index == -1){
        res.json({msg:"ERROR AL ELIMINAR"})
    }else{
        const newU = {encontrado}

        data.list_cars[index] = {
            ...encontrado,
            ...req.body
        }
       
        console.log(encontrado)
        console.log(req.body)
        res.json({msg:"CAMBIADO"})
    }
    console.log(req.params)
    console.log(data.list_cars)
})




router.get('/car:id',(req,res) => {
    if(user){
        res.json({status:"GUT",
        msg:'VIAJES ENCONTRADO EN RUTA',
        user});
    }else{
        res.json({status:"NAI",
        msg:'VIAJES NO ENCONTRADO EN RUTA',
        user});
    }
}
)
module.exports = router;