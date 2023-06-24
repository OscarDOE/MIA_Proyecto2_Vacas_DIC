import '../App.css'
import React, {Fragment, useEffect, useState} from 'react';

import Nav from '../components/navbar';
import Cookies from "universal-cookie"

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
export const User = () =>{

    const [viajes, setViajes] = useState([]);
    let datos = {}
    const cookies = new Cookies();
    const initcookie = cookies.get("session")
    useEffect(()=>{
        console.log("ENV")
        fetch(`http://${process.env.REACT_APP_PUERTO}:5000/users/${initcookie.id}`)
            .then(res => res.json())
            .then(res => {
                setViajes(res)
                console.log("RES EN HOME USER",res)
            }
            )
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            {/* <NavHome></NavHome> */}
            <Nav></Nav>
            <h1>BIENVENIDO {viajes.usuario}</h1>
            <div className='App-header'>
                <img alt='LOGO DE EMPRESA' width='400px' style={{'border-radius':'8px','marginTop':'50px'}} src={viajes.image}/>
            </div>
        </div>
    )
}
