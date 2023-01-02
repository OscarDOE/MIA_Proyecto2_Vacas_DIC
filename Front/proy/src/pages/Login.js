import React, {Fragment, useEffect, useState} from 'react';
import { Link, useAsyncError, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Nav from '../components/navbar';
import Cookies from "universal-cookie"


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../App.css'
const Login = () =>{

    const [datos, setDatos] = useState({
        usuario: '',
        password: ''
    })

    let datosrecibidos = {}
    const [e,setE] = useState(null);
    const navigate = useNavigate();
    const cambiarpagina = (e) => {
        navigate(e)
    }

    const cookies = new Cookies();
    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const enviarDatos = async (event) => {
        event.preventDefault()
        console.log('enviando datos...' + datos.usuario + ' ' + datos.password)

        let respuestauno = {}
        const respuesta = await fetch('http://localhost:5000/users/login',{
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(datos)
        }).then(res  => res.json())
        .then(res => {
            respuestauno = {
                ...respuestauno,
                res
            }
            console.log("RESPUESTA AL FINAL DEL FETCH", res)
        })
        if(respuestauno.res.message == 'User is not confirmed.'){
            console.log("ES NO CONFIRMADO")
            alert("Usuario no confirmado, por favor verifique la bandeja de entrada del correo que ingresó a este usuario")
        }else if(respuestauno.res.message == 'Incorrect username or password.'){
            console.log("NO SON IGUALES")
            alert("Credenciales incorrectas, intente de nuevo")
        }else if(respuestauno.res.usuario_logeado != null){
            console.log("SALIO DEL AWAIT", respuestauno)
            console.log("SALIO DEL AWAIT 22", respuestauno.res)
            cookies.set("session",respuestauno.res.usuario_logeado)
            const x = cookies.get("session")
            console.log(x)
            console.log(x["id"])
            if(!!cookies.get("session")){
                const cookie = cookies.get("session")
                if(cookie.type =="0"){
                    navigate('/admin')
                }
                else if(cookie.type =="1"){
                    navigate('/receptionist')
                }
                else if(cookie.type =="2"){
                    navigate('/user')
                }
            }
            //LOGOOUT---=--- cookies.remove("session")
        }
        else{

        }
        
    }
    useEffect(() => {
        console.log("EFFECT LOGIN")
        if(!!cookies.get("session")){
            const cookie = cookies.get("session")
            if(cookie.type =="0"){
                navigate('/admin')
            }
            else if(cookie.type =="1"){
                navigate('/receptionist')
            }
            else if(cookie.type =="2"){
                navigate('/user')
            }
        }
    },[])
    return (
        <div>
            <Nav></Nav>
            <h1>Ingrese sus credenciales para ingresar</h1>
            <div className='App-header'>
                <div className='Cuadrado-central'>
                    <form className="row" onSubmit={enviarDatos}>
                        <div className="col-md-3">
                            <input 
                                type="text" 
                                style={{'marginTop':'20px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 200px',  'box-sizing': 'border-box'}}
                                placeholder="Usuario/Email" 
                                onChange={handleInputChange} 
                                name="usuario" />
                        </div>
                        <div className="col-md-3">
                            <input 
                                type="password" 
                                style={{'marginTop':'20px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 600px',  'box-sizing': 'border-box'}}
                                placeholder="Password" 
                                onChange={handleInputChange} 
                                name="password" />
                        </div>
                        <button className='submit-button' type="submit" >Enviar</button>
                    </form>
                </div>
                    <Navigation/>
            </div>
            
        </div>
    )
}

function Navigation(){

    let location = useLocation();
    const prueba = (e) => {
        if(location.pathname == '/login'){
            return(
                <div>
                    <h2>Si NO tiene una cuenta creada, puedes registrarte por medio del boton "Register"</h2>
                    <button style={{marginRight:'50px',width:'70px',height:'50px'}}><Link style={{textDecoration:'underline wavy red',fontSize:'50px',color:'red'}} to="/register">Register</Link></button>

                </div>
            )
        }
        return (

            <button style={{marginRight:'50px',width:'70px',height:'25px'}}><Link style={{textDecoration:'none',fontSize:'20px'}} to="/register">Register</Link></button>
        )
    }
    return(
        <div>
            {prueba("ss")}
        </div>
    )
}
export default Login;