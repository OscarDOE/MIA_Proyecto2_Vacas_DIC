import '../App.css'
import Nav from '../components/navbar';
import Cookies from "universal-cookie"
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
export const Receptionist = () =>{
    const [viajes, setViajes] = useState([]);
    let datos = {}
    const cookies = new Cookies();
    const navigate = useNavigate()
    const initcookie = cookies.get("session")

    useEffect(() => {
        console.log("EFFECT FORMUSUARIOS")
        if(!!cookies.get("session")){
            const cookie = cookies.get("session")
            if(cookie.type =="0"){
                navigate('/admin')
            }
            else if(cookie.type =="1"){

                fetch(`http://${process.env.REACT_APP_PUERTO}:5000/users/${initcookie.id}`)
            .then(res => res.json())
            .then(res => {
                setViajes(res)
                console.log("RES EN HOME USER",res)
            }
            )
            .catch(err => console.error(err));
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
            {/* <NavHome></NavHome> */}
            <Nav></Nav>
            <h1>Usuario Recepcionista, BIENVENIDO</h1>
            <div className='App-header'>
                <img alt='Logo' width='400px' style={{'border-radius':'8px','marginTop':'50px'}} src={viajes.image}/>
            </div>
        </div>
    )
}
