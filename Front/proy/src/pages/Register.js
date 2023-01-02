import React, {Fragment} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Nav from '../components/navbar';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie"


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../App.css'



let userexiste = true;
let limitedecorreos = true;
let invalidparameter = true;
const Register = () =>{

const [show, setShow] = useState(true);

    const [datos, setDatos] = useState(
        {
        name: '',
        usuario: '',
        email: '',
        image:'',
        password:'',
        confirmP:'',
        type:''
                }
    )
    const [indi,setIndi] = useState(null)
    
    const [e,setE] = useState(null);

    const navigate = useNavigate()
    const cambiarpagina = (e) => {
        navigate(e)
    }

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }
    let location = useLocation();
    const enviarDatos = (event) => {
        event.preventDefault()
        if(datos.name == '' || datos.usuario == '' || datos.email == '' || datos.password == '' || datos.confirmP == ''   ){
            console.log("HAY UNO VACIO")
            alert("Usuario no registrado, todos los espacios deben de estar llenos")
            cambiarpagina('/')            
        }
        console.log("SALIO DENTRO DE ENVIARATOS")
        const formenviar = new FormData();
        formenviar.append("name",datos.name);
        formenviar.append("usuario",datos.usuario);
        formenviar.append("email",datos.email);
        formenviar.append("image",indi);
        formenviar.append("password",datos.password);
        formenviar.append("confirmP",datos.confirmP);
        formenviar.append("type","2");      
        
        const resp = fetch('http://localhost:5000/users/registro',{
            method:'POST',
            body:formenviar
        }).then(res => res.json()
        .then(res => {
            console.log("REPUESTA DEL JSON",res)
            console.log("REPUESTA DEL JSON MESSAGE",res.msg)
            if(res.msg =="1"){
                userexiste = false
            }else if(res.msg =="2"){
                limitedecorreos = false
            }else if(res.msg =="3"){
                invalidparameter = false
            }else if(res.msg =="4"){
                invalidparameter = false
            }else if(res.msg =="5"){
                invalidparameter = false
            }else if(res.msg == "0"){
                alert(`Usuario ${res.usuario} registrado correctamente`)
                cambiarpagina('/login');

            }
        }))
        console.log("ESTATUS 201", resp)
        // if(response.status === "201"){
        //     setE(response.message);
        //     alert("NONONO")
        // }else{
        //     setE(null);
        //     alert("Usuario Registrado")
        // }
    }
    return (
        <div>
            <Nav></Nav>
            <div className='App-header'>
                <div className='Cuadrado-central'>
                    <form className="row" onSubmit={enviarDatos}>
                        <div className="col-md-3">
                            <input 
                                type="text" 
                                style={{'marginTop':'55px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Nombre" 
                                onChange={handleInputChange} 
                                name="name" />
                        </div>
                        <div className="col-md-3">
                            <input 
                                type="text" 
                                style={{'marginTop':'55px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Usuario"  
                                onChange={handleInputChange} 
                                name="usuario" />
                        </div>
                        <br/>
                        <div className='row-md-3'>
                            <input 
                                type="email" 
                                style={{'marginTop':'55px',
                                'width': '50%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Email" 
                                onChange={handleInputChange} 
                                name="email" />
                        </div>
                        <div>
                            <input 
                                type="file" 
                                style={{'marginTop':'55px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Avatar" 
                                onChange={(e) => setIndi(e.target.files[0])}
                                name="image" />
                        </div>
                        <div className="col-md-3">
                            <input 
                                type="password" 
                                style={{'marginTop':'55px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Password" 
                                onChange={handleInputChange} 
                                name="password" />
                        </div>
                        <div className="col-md-4">
                            <input 
                                type="password" 
                                style={{'marginTop':'55px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Confirm Password" 
                                onChange={handleInputChange} 
                                name="confirmP" />
                        </div>
                        <button className='submit-button' type="submit" >Enviar</button>
                    </form>
                    <div hidden={userexiste}>
                        <Funcionusuarioexiste></Funcionusuarioexiste>
                    </div>
                    <div hidden={limitedecorreos}>
                        <Funcionlimitedecorreos></Funcionlimitedecorreos>
                    </div>
                    <div hidden={invalidparameter}>
                        <Funcionparametrosinvalidos></Funcionparametrosinvalidos>
                    </div>
                </div>
                <Navigation></Navigation>
            </div>
            
        </div>
    )
}

function Navigation(){
    let location = useLocation();
    const prueba = (e) => {
        if(location.pathname == '/register'){
            return(
                <div>
                    <h2>Si ya tiene una cuenta creada, puede ingresar por medio del boton "LOGIN"</h2>
                    <button style={{marginRight:'50px',width:'70px',height:'50px'}}><Link style={{textDecoration:'underline wavy red',fontSize:'50px'}} to="/login">Login</Link></button>

                </div>
            )
        }
        return (
            <button style={{marginRight:'50px',width:'70px',height:'25px'}}><Link style={{textDecoration:'none',fontSize:'20px'}} to="/login">Register</Link></button>
        )
    }
    return(
        <div>
            {prueba("ss")}
        </div>
    )
}

function Funcionusuarioexiste() {  
    return (
      <>
        <Alert variant="warning">
            <Alert.Heading>El usuario ya existe</Alert.Heading>
            <p>
                El nombre de usuario ya existe porfavor utilice otro
            </p>
            <hr />
                <Button onClick={() => userexiste=true} variant="outline-success">
                Ocultar mensaje
                </Button>
        </Alert>
      </>
    );
  }
function Funcionlimitedecorreos() {  
    return (
      <>
        <Alert variant="warning">
            <Alert.Heading>Limite de correos excedido por el día</Alert.Heading>
            <p>Se han enviado demasiados correos poe este día, por favor intente más tarde</p>
            <p>Tenga en cuenta que solo se puede usar una vez un correo electrónico</p>
            <hr />
                <Button onClick={() => limitedecorreos=true} variant="outline-success">
                Ocultar mensaje
                </Button>
        </Alert>
      </>
    );
  }
function Funcionparametrosinvalidos() {  
    return (
      <>
        <Alert variant="warning">
            <Alert.Heading>Los parametros no cumplen los requisitos</Alert.Heading>
            <p>- Debe de ingresar todos los parámetros</p>
            <p>- El nombre de usuario y la contraseña deben de contener mínimo 6 caracteres</p>
            <hr />
                <Button onClick={() => invalidparameter=true} variant="outline-success">
                Ocultar mensaje
                </Button>
        </Alert>
      </>
    );
  }
  

export default Register;