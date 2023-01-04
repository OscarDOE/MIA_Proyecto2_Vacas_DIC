import '../App.css'
import Nav from '../components/navbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Cookies from "universal-cookie"
import { Link, useNavigate } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useEffect, useState } from 'react';
// require('dotenv').config()


export const ViajesUser = () =>{
    const cookies = new Cookies();
    const navigate = useNavigate()

    const [viajes, setViajes] = useState([]);
    let datos = {}


    let initcookie = cookies.get("session")

    const agregar = async (e) => {
        console.log("EEEEEEEEEEEEEE",e)
        console.log("ENTRO A AGREGAR")

        datos = {
            carro:"0",
            viaje:"1",
            iduser:initcookie.id,
            usuario:initcookie.usuario,
            email:initcookie.email,
            Estado:"Pendiente",
            Agency:e.Agency,
            From:e.From,
            To:e.To,
            Days:e.Days,
            Price:e.Price
        }
        
        console.log("DATOS",datos)
        await fetch(`http://localhost:5000/solicitudes`,{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(datos)
        })
    }


    useEffect(()=>{

        if(!!cookies.get("session")){
            const cookie = cookies.get("session")
            if(cookie.type =="0"){
                navigate('/admin')
            }
            else if(cookie.type =="1"){
                navigate('/receptionist')
            }
            else if(cookie.type =="2"){
                fetch('http://localhost:5000/viajes')
            .then(res => res.json())
            .then(res => 
                setViajes(res)
            )
            .catch(err => console.error(err));
            }else{
                navigate('/')
            }
        }else{
            navigate('/')
        }


    }, []);


    let img = "./logo.png"

    return (
        <div className='App-header' style={{backgroundColor:"black"}} >
            <Nav></Nav>
            <h3>VUELOS DISPONIBLES</h3>
                <div class="row">
                    {viajes.map(function(viaje,index) {
                        return(
                            <div class="col-md-3">
                                <h5>NUMERO : {viaje.id}</h5>
                                <Card className='espaciado-total' style={{background:"lightgreen", width: '15rem' }}>
                                    <Card.Body>
                                        <Card.Title><h5>Agencia: {viaje.Agency}</h5></Card.Title>
                                        <Card.Img variant="top" src={img} />
                                        <Card.Text>
                                            <h5>Precio : {viaje.Price}</h5>
                                        </Card.Text>
                                    </Card.Body>
                                        <ListGroup className="list-group-flush">
                                        <ListGroup.Item><h5>Origen: {viaje.From}</h5></ListGroup.Item>
                                        <ListGroup.Item><h5>Destino: {viaje.To}</h5></ListGroup.Item>
                                        </ListGroup>
                                        <Card.Body>
                                        <button onClick={(e) => agregar(viaje)}>Solicitar</button>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

