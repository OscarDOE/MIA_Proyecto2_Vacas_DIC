import React from 'react';
import {  useNavigate } from 'react-router-dom';
import Nav from '../components/navbar';
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie"

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../App.css'

export const FormCarros = () =>{
    const [datos, setDatos] = useState()
    const navigate = useNavigate();
    const cambiarpagina= () => {
        navigate('/admincarros')
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
    const enviarDatos = (event) => {
        console.log("---------")
        event.preventDefault()
        
        console.log('enviando datos...' + datos.name + ' ' + datos.usuario+ ' ' + datos.email + ' ' + datos.image + ' ' + datos.password + ' ' + datos.confirmP)
        fetch(`http://${process.env.REACT_APP_PUERTO}:5000/autos`,{
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(datos)
        })
        alert("Auto Registrado Correctamente")
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
    }, [])
    return (
        <div>
            <Nav></Nav>
            <h1>Registrando un nuevo Carro</h1>
            <div className='App-header'>
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
                                placeholder="Marca" 
                                onChange={handleInputChange} 
                                name="Brand" />
                        </div>
                        <br/>
                        <div className='row-md-3'>
                            <input 
                                type="text" 
                                style={{'marginTop':'55px',
                                'width': '50%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Modelo" 
                                onChange={handleInputChange} 
                                name="Model" />
                        </div>
                        <div>
                            <input 
                                type="text" 
                                style={{'marginTop':'55px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Placa" 
                                onChange={handleInputChange} 
                                name="Badge" />
                        </div>
                        <div className="col-md-3">
                            <input 
                                type="text" 
                                style={{'marginTop':'55px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Precio" 
                                onChange={handleInputChange} 
                                name="Price" />
                        </div>
                        <div className="col-md-4">
                            <input 
                                type="text" 
                                style={{'marginTop':'55px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Ciudad en la que se encuentra" 
                                onChange={handleInputChange} 
                                name="City" />
                        </div>
                        <button className='submit-button' type="submit" >Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

