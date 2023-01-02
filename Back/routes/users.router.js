const express = require('express');

const UserService = require('../services/user.service');
//const UserCognito = require('../services/user');
// const validatorHandler = require('../middleware/validator.handler');
// const { updateUserSchema, createUserSchema, getUserSchema } = require('./../schemas/user.schema');
const upFile  = require('../services/s3.js');
const AWS = require('aws-sdk');

const router = express.Router();
const service = new UserService.UserService();

router.get('/', async (req, res, next) => {
    const users = await service.find();
    res.json(users);
});

router.get('/:id',
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
      } catch (error) {
      next(error);
    }
  }
);

router.post('/registro',
  async (req, res, next) => {
      const body = req.body;
      try{
        const reg = await UserService.register_cognito(req,res);
        const result = await upFile.uploadFile(req.files.image);
        const new_body = {
          ...body,
          image:await upFile.getFileURL(req.files.image.name),
        }
        const newCategory = await service.create(new_body);
      }catch(e){
        return res.status(500).json({
          msg:e
        })
      }
  }
);

// router.post('/registro', 
// async (req,res)=>{
//   const body = req.body;
//   // console.log("REQ BODY",req.body)
//   // console.log("REQ PARAMS",req.param)
//   const newViajes = await service.create(body);
//   console.log("MEWVIAJES",newViajes)
//   if(newViajes.usuario){
//     // console.log("FUNCIONO EL NEWW")
//     return ( res.status(201).json(newViajes));
//   }else{
//     // console.log("FALLO EL NEW")
//   }
// })



router.post('/login',
  async (req, res, next) => {
      const body = req.body;
      try{
        const usuario = await UserService.login_cognito(req,res);
        res.json({usuario_logeado:usuario})
      }catch(e){
        res.json({message:e.message})
      }
      //res.status(201).json(newCategory);
  }
);

// router.post('/login',
//   async(req,res) => {
//     try{
//       const usuario = await service.login_comprobation(req.body)
//       console.log("USUARIO DENTRO DE LOGIN", usuario)
//       console.log(usuario)
//     return(res.status(201).json(usuario));
//     }catch(e){
//       res.json({msg:e})
//     }
//   }
// )

router.patch('/:id',
  async (req, res, next) => {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
  }
);


router.delete('/:id',
  async (req,res,next) => {
    const {id} = req.params;
    try{
      const usuario = await service.findOne(id)
      await service.removeuser(usuario.usuario, usuario.password, id)
      res.json({msg:"SE ELimino correctamente"})
    }catch(e){
      res.json({msg:e.message})
    }
})
// router.delete('/:id',
//   async (req, res, next) => {
//       const { id } = req.params;
//       const usuario = await service.findOne(id)
//       console.log("USUARIO EN DELETE",usuario)
      
//   AWS.config.update({
//     accessKeyId: process.env.ACCESS_KEY_COG,
//     secretAccessKey: process.env.SECRET_ACCESS_KEY_COG,
//     region: process.env.COGNITO_REGION,
//   });

//   const cognito = new AWS.CognitoIdentityServiceProvider();

//   await cognito.adminDeleteUser({
//     UserPoolId: "us-east-2_279qxbr84",
//     Username: usuario.usuario,
//   },async (err,data)=>{
//     if(err){

//       res.json({status:false,msg:err.code});
//     }else{
//       await service.delete(id);
//       const usr = req.body.usr;

//       // const indice = varibles.usr_exist(usr,"",varibles.list_usr );
//       // const image = await service.findOne(id)
//       // const params = {
//       //   Bucket: process.env.AWS_BUCKET_NAME,
//       //   Key: 
//       // }
//       // const command = new DeleteObjectCommand(params);
//       // await varibles.s3Client.send(command);
//       res.json({status:true,msg:"Se elimino exitosamente el usuario"});
//     }
//   });
//       // res.status(201).json({id});
//   }
// );

module.exports = router;