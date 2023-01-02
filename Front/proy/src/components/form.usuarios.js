import React, {Fragment} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Nav from '../components/navbar';

import { useEffect, useState } from 'react';
import Cookies from "universal-cookie"


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../App.css'

export const FormUsuarios = () =>{

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
    const [tipoUser,setTipoUser] = useState(null)

    const cookies = new Cookies();
    
    const [e,setE] = useState(null);

    const navigate = useNavigate()
    const cambiarpagina = () => {
        navigate('/usuarios')
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
        console.log("TIPO DE USUARIO",tipoUser)
        const formenviar = new FormData();
        formenviar.append("name",datos.name);
        formenviar.append("usuario",datos.usuario);
        formenviar.append("email",datos.email);
        formenviar.append("image",indi);
        formenviar.append("password",datos.password);
        formenviar.append("confirmP",datos.confirmP);

       if(tipoUser == 'Recepcionista'){
            formenviar.append("type","1")
       }else if(tipoUser == 'Turista'){
            formenviar.append("type","2")
       }
      
        
        const resp = fetch('http://localhost:5000/users/registro',{
            method:'POST',
            body:formenviar

        })
        formenviar.delete('name')
        formenviar.delete('usuario')
        formenviar.delete('email')
        formenviar.delete('image')
        formenviar.delete('password')
        formenviar.delete('confirmP')
        formenviar.delete('type')
        const response =  resp.json()
        if(response.status === 400){
            setE(response.message);
        }else{
            setE(null);
            alert("Usuario Registrado")
        }
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
            <h1>Registrando un nuevo Usuario</h1>
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
                        <div className='row'>
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
                        <div className="col-md-5">
                            <h2>Seleccione el tipo de Usuario: </h2>
                            <h1><select onChange={(e) => setTipoUser(e.target.value)} name="type">
                                <option>Turista</option>
                                <option>Recepcionista</option>
                            </select></h1>
                            {/* <input 
                                type="password" 
                                style={{'marginTop':'55px',
                                'width': '100%','padding':'12px 20px', 'margin': '20px 0',  'box-sizing': 'border-box'}}
                                placeholder="Confirm Password" 
                                onChange={handleInputChange} 
                                name="confirmP" /> */}
                        </div>
                        <button className='submit-button' type="submit" >Enviar</button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}
