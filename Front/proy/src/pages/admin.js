import '../App.css'
import Nav from '../components/navbar';
import { Link, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie"


export const Admin = () =>{
    const cookies = new Cookies();
    const navigate = useNavigate()

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
                <h1>USUARIO ADMINISTRDOR, BIENVENIDO</h1>
                <img alt='Logo' width='400px' style={{'border-radius':'8px','marginTop':'50px'}} src='./logo.png'/>
            </div>
        </div>
    )
}
