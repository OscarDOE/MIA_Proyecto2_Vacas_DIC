const boob = require('@hapi/boom');
require('dotenv').config();

const AmamazonCognitoIdentity = require('amazon-cognito-identity-js');

const { signUpCognito, signInCognito } = require("./cognito");
//const { uploadFile } = require("../middleware/bucket");
users = []
id = 0
const register_cognito = async (req, res) => {
  const { usuario, password } = req.body;
  console.log('Datos recibidos', usuario, password)
  
  //-----
  // aqui hacer la validacion de que no se encuentre el usuario en la estructura de datos
  //-----


  await signUpCognito(req,res);
  //subir una foto
  //await uploadFile(req,res);
  // return res.json({
  //     status: true,
  //     msg: "Usuario registrado",
  //     usuario,
  //     password
  // });
}

//login
const login_cognito = async (req, res) => {
  const { usuario, password } = req.body;
  console.log('Datos recibidos', usuario);
  //-----
  // aqui hacer la validacion de que se encuentre el usuario en la estructura de datos
  await signInCognito(req,res);

  let userName = users.find(item => item.usuario === usuario);
  
  if(!userName){
    return {message: "Username: " + userName + ", no existe"}
  }
  userName = {
    ...userName,
    tam:users.length
  }

  return userName
  //-----
  //Mandar a traer de cognito
}


class UserService {
  constructor() {}

  async create(data) {
    const userEncontrado = users.find(item => item.usuario ===data.usuario)
    if(userEncontrado){
      // console.log(userEncontrado)
    }else{
      id++;
      if(users.length==0){
        var newUser = {
            id: id,
            ...data,
            type:"0"
        }
      }else{
        var newUser = {
            id: id,
            ...data,
            
        }
      }
      users.push(newUser);
      newUser = {
        ...newUser,
        msg:"0"
      }
      return newUser;

    }
  }

  async find() {
    return users;
  }

  async findOne(id) {
    const userEncontrado = users.find(item => item.id === +id);
    if (!userEncontrado) {
      return {message: "User con id: " + id + ", no existe"}
    }
    return userEncontrado;
  }

  async findOneUser(usuario) {
    const userEncontrado = users.find(item => item.usuario === usuario);
    if (!userEncontrado) {
      return {message: "User : " + usuario + ", no existe"}
    }
    return userEncontrado;
  }

  async removeuser(usuario, password, id){

    const authenticationDetails = new AmamazonCognitoIdentity.AuthenticationDetails ({
      Username:usuario,
      Password:password
    })

    
    const cognito = {
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_CLIENT_ID,
    }
    const userPool= new AmamazonCognitoIdentity.CognitoUserPool(cognito);
    const userData = {
      Username:usuario,
      Pool:userPool
    }
    
    const cognitoUser = new AmamazonCognitoIdentity.CognitoUser(userData);

    await this.delete(id)
    return new Promise((resolve,reject) => {
      return cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          cognitoUser.deleteUser((err, result) => {
            if(err) reject(err);
            else resolve(result);
          });
        },
        onFailure: (err) => {
          reject(err);
        }
      })
    })
  }

  async login_comprobation(id) {
    console.log("ID",id)
    const userEncontrado = users.find(item => item.usuario === id.usuario);
    console.log("USER ENCON",userEncontrado)
    if(!userEncontrado){
      const useraunEncontrado = users.find(item => item.email === id.usuario);
      console.log("USERAUN",useraunEncontrado)
      if(!useraunEncontrado){
        return ({msg:"1"})
      }
      if(useraunEncontrado.password === id.password){
        useraunEncontrado = {
          ...useraunEncontrado,
          msg:"0"
        }
        return useraunEncontrado
      }
    }
    if(userEncontrado.password === id.password){
      userEncontrado = {
        ...userEncontrado,
        msg:"0"
      }
    }
    console.log("USER ENCONTRADO")
    return userEncontrado;
  }




  async update(id, changes) {
    const index = users.findIndex(item => item.id === +id);
    if (index === -1) {
      return "User con id: " + id + ", no existe"
    }
    const new_viaje = users[index];
    users[index] = {
      ...new_viaje,
      ...changes
    };
    return users[index];
  }

  async delete(id) {
    const index = users.findIndex(item => item.id === +id);
    if (index === -1) {
      return "User con id: " + id + ", no existe"
    }
    users.splice(index, 1);
    return { id };
  }
}

module.exports = {
  UserService,
  register_cognito,
  login_cognito
}
