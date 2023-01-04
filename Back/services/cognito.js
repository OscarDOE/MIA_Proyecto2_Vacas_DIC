const AmamazonCognitoIdentity = require('amazon-cognito-identity-js');
require('dotenv').config();

const cognito = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_CLIENT_ID,
}

const userPool = new AmamazonCognitoIdentity.CognitoUserPool(cognito);

const signUpCognito = async(req, res) => {
    const { usuario, password, email } = req.body;
    // aqui pueden encriptar la contrasenia con bcrypt o algo similar
    const attributeList = [];
    // attributeList.push(new AmamazonCognitoIdentity.CognitoUserAttribute({'': username}));
    attributeList.push(new AmamazonCognitoIdentity.CognitoUserAttribute({'Name': 'email', 'Value': email}));
    const username=usuario;
    userPool.signUp(username, password, attributeList, null, async(err, data)=>{
        console.log("EEEEEEEEEEEEEEEEEERRRRRRRRRRRRR",err)
        if(err){
            if(err.name =="UsernameExistsException" ){
                // console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSI ES EXISTS")
                console.log("ERROE  333",err.name);
                return res.status(201).json({
                    msg:"1"
                })
            }else if(err.name=="LimitExceededException"){
                return res.status(201).json({
                    msg:"2"
                })
            }else if(err.name=="InvalidParameterException"){
                return res.status(201).json({
                    msg:"3"
                })
            }
            console.log("ERROE",err.message);
            console.log("ERROE  222",err.stack);
            console.log("ERROE  333",err.name);
            // return res.status(500).send()
        }else{
            console.log("NO HUBO ERROR", userPool)
            console.log("data",data)
            res.status(200).json({
                msg:"0"
            });
        }
    });
}

const signInCognito = async(req, res) => {
    const {usuario, password} = req.body;
    
    const authenticationDetails = new AmamazonCognitoIdentity.AuthenticationDetails({
        Username: usuario,
        Password: password
    });

    const userData = {
        Username: usuario,
        Pool: userPool
    };

    const cognitoUser = new AmamazonCognitoIdentity.CognitoUser(userData);

    return new Promise((resolve, reject) => {
        return cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
            resolve(result);
        },
        onFailure: (err) => {
            reject(err);
        },
        });
    });

    // cognitoUser.authenticateUser(authenticationDetails, {
    //     onSuccess: function (result) {
    //         const verified = result;
    //         console.log(verified);
    //         res.status(200).json({
    //             'status': true,
    //             'msg':result
    //         });
    //     },
    //     onFailure: function (err) {
    //         console.log('Entra aqui con error: ' + err);
    //         res.status(500).json({
    //             'status': false,
    //             'msg':err
    //             });
    //     }
    // });
}

const deleteUserCognitoA = async (req, res) => {
    const username = req.body.us
    const password = req.body.contranueva

    const hash = crypto.createHash('sha256').update(password).digest('hex') + "D**";

    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: hash
    });
    
    const userData = {
        Username: username,
        Pool: userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            cognitoUser.deleteUser((err, result) => {
                if (err) {
                    res.status(400).json({
                        status: false,
                        message: 'Error al eliminar usuario',
                    });
                } else {
                    res.status(200).json({
                        status: true,
                        message: 'Usuario eliminado correctamente',
                    });
                }
            });
        },
        onFailure: function (err) {
            console.log('Entra aqui con error: ' + err);
            res.status(500).json({
                'status': false,
                'msg':err
                });
        }
    });
}

module.exports = {
    signUpCognito,
    signInCognito,
    deleteUserCognitoA
}