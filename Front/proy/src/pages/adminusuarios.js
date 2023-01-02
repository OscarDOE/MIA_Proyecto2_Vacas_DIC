import '../App.css'
import Nav from '../components/navbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie"

export const AdminUsuarios = () =>{
    const [carros, setCarros] = useState([]);
    const cookies = new Cookies();
    const navigate = useNavigate()

    useEffect(()=>{
            console.log("EFFECT FORMUSUARIOS")
            if(!!cookies.get("session")){
                const cookie = cookies.get("session")
                if(cookie.type =="0"){
                    fetch('http://localhost:5000/users')
                        .then(res => res.json())
                        .then(res => 
                                setCarros(res)
                        )
                        .catch(err => console.error(err));
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

    }, []);

    const eliminar = (e) => {
        console.log(e)
        console.log("ENTRO A ELIMINAR")
        const datosnuevos = fetch(`http://localhost:5000/users/${e.id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }            
        }).then(res => res.json()
        .then(res => {
            console.log("RESPUESTA DEL JSON PARA ELIMINAR ",res)
        }))
    }

    const ver = (e) => {
        console.log("DENTRO DE VEWR")
    }

    let img = "./logo.png"
    
    return (
        <div style={{backgroundColor:'black'}}>
            <Nav></Nav>
            <h3>Usuarios Creados</h3>
                <div id='cinvo' class="row">         
            {carros.map(function(carro) {
                return(
                <div class="col-md-3">
                    <h5>{carro.id}</h5>
                    <Card className='espaciado-total' style={{background:"lightgreen", width: '15rem' }}>
                        <Card.Body>
                            <Card.Title><h5>Usuario: {carro.usuario}</h5></Card.Title>
                            <Card.Img variant="top" src={carro.image} />
                            <Card.Text style={{background:"lightblue"}}>
                                <h5>Tipo de Usuario : {carro.type}</h5>
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item><h5>Nombre: {carro.name}</h5></ListGroup.Item>
                            <ListGroup.Item><h5>Contraseña: {carro.password}</h5></ListGroup.Item>
                        </ListGroup>
                        <Card.Text style={{background:"yellow"}}><h5>Correo Electrónico: {carro.email}</h5></Card.Text>
                        <Card.Body>
                            <Card.Link onClick={(e) => eliminar(carro)}>Eliminar</Card.Link>
                            <Card.Link onClick={(e) => ver(carro)}>Ver</Card.Link>
                        </Card.Body>
                    </Card>
                </div>
                )
            })}
</div>
        <div className='App-header'>
            </div>
        </div>
    )
}