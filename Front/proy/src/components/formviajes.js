import React, {Fragment} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Nav from '../components/navbar';
import Cookies from "universal-cookie"

import { useEffect, useState } from 'react';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../App.css'
export const FormViajes = () =>{

    const [datos, setDatos] = useState({
        Agency: '',
        From: '',
        To: '',
        Days:'',
        Price:''
    })
    const navigate = useNavigate();
    const cambiarpagina= () => {
        navigate('/adminviajes')
    }
    const cookies = new Cookies();

    const handleInputChange = (event) => {
        //console.log(event.target.name)
        //console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
        console.log(datos)
    }
    const enviarDatos = (event) => {
        console.log("---------")
        event.preventDefault()
        // console.log("DENTRO DE ENIVAR",datos)
        // console.log('enviando datos...' + datos.Agency + ' ' + datos.From+ ' ' + datos.To + ' ' + ' ' + datos.Days + ' ' + datos.Price)

        const datosnuevos = fetch('http://localhost:5000/viajes',{
            method: 'POST',
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify(datos)
        })
        alert("Vuelo Registrado Correctamente")
        cambiarpagina()
    }

    useEffect(() => {
        console.log("EFFECT FORMUSUARIOS")
        if(!!cookies.get("session")){
            const cookie = cookies.get("session")
            if(cookie.type =="0"){
            }
            else if(cookie.type =="1"){
                navigate('/receptionist')
            }
            else if(cookie.type =="2"){
                navigate('/user')
            }else{
                navigate('/')
            }
        }else{
            navigate('/')
        }
    },[])
    return (
        <div>
            <Nav></Nav>
            <div className='App-header'>
                <h1 style={{color:'red'}}>Registrando un nuevo Viaje</h1>
                <div className='Cuadrado-central'>

                    <form className="row" onSubmit={enviarDatos}>
                        <div className="col-md-3">
                            <input 
                                type="text" 
                                style={{'marginTop':'55px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Nombre de la Agencia" 
                                onChange={handleInputChange} 
                                name="Agency" />
                        </div>
                        <div className="col-md-3">
                            <input 
                                type="text" 
                                style={{'marginTop':'55px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Ciudad de Origen" 
                                onChange={handleInputChange} 
                                name="From" />
                        </div>
                        <br/>
                        <div className='row-md-3'>
                            <input 
                                type="text" 
                                style={{'marginTop':'55px',
                                'width': '50%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Ciudad Destino" 
                                onChange={handleInputChange} 
                                name="To" />
                        </div>
                        <div>
                            <input 
                                type="text" 
                                style={{'marginTop':'55px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Días de Vuelo" 
                                onChange={handleInputChange} 
                                name="Days" />
                        </div>
                        <div className="col-md-3">
                            <input 
                                type="text" 
                                style={{'marginTop':'55px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Precio de Vuelo" 
                                onChange={handleInputChange} 
                                name="Price" />
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
        if(location.pathname == '/admin/viajes'){
            console.log("------------------")
            console.log(location)
            console.log(location.pathname)
            return(
                <div>
                    <h2>Si ya tiene una cuenta creada, puede ingresar por medio del boton "LOGIN"</h2>
                    <button style={{marginRight:'50px',width:'70px',height:'50px'}}><Link style={{textDecoration:'underline wavy red',fontSize:'50px'}} to="/login">sassa</Link></button>

                </div>
            )
        }

    }
    return(
        <div>
            {prueba("ss")}
        </div>
    )
}