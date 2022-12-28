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
    res.json(data.list_dates)
});

//Ruta para obtener todos los usuarios
router.get('/todos', (req,res) =>{
    res.json({status:"SSSSS",
                msg:"TODOS LOS VUELOS"})
});

router.post('/', (req, res) => {
    const { Agency, CFrom, CTo, FlyDays, Price} = req.body;
    if(Agency && CFrom && CTo && FlyDays && Price){
        const newU = {...req.body, id};
        id++;
        data.list_dates.push(newU)
        res.json(data.list_dates)
        res.json("saved");

    }else{
        const {Agency, Brand, Model, Price} = req.body;
        if(Agency && Brand, Model, Price){
            const newU ={...req.body, id}
            id++;
            data.list_dates.push(newU);
            res.json(data.list_dates)
            res.json({msg:"DATE SAVED"})
        }else{
            res.json({error:'There was an error on Date Register'})
        }
        res.json({error:'There was an error on Date Register'})
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    const index = data.list_dates.findIndex((xxx) => xxx.id === +id)
    if(index == -1){
        res.json({msg:"ERROR AL ELIMINAR"})
    }else{
        data.list_dates.splice(index,1)
        res.json({msg:"ELIMINADO"})
    }
    //console.log(req.params)
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    let encontrado = data.getDate(id);
    console.log(id)
    const index = data.list_dates.findIndex((xxx) => xxx.id === +id)
    if(index == -1){
        res.json({msg:"ERROR AL ELIMINAR"})
    }else{
        const newU = {encontrado}

        data.list_dates[index] = {
            ...encontrado,
            ...req.body
        }
       
        console.log(encontrado)
        console.log(req.body)
        res.json({msg:"CAMBIADO"})
    }
    console.log(req.params)
    console.log(data.list_travel)
})

router.get('/travel:id',(req,res) => {
    const {id} = req.params;
    const user = usuarios[id];
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