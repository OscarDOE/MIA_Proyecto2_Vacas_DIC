import '../App.css'
import Nav from '../components/navbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Cookies from "universal-cookie"
import { Link, useNavigate } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useEffect, useState } from 'react';


export const Viajes = () =>{

    const [viajes, setViajes] = useState([]);
    const navigate = useNavigate()
    const cookies = new Cookies();
    let initcookie = cookies.get("session")

   useEffect(()=>{

        if(!!cookies.get("session")){
            const cookie = cookies.get("session")
            if(cookie.type =="0"){
                fetch(`http://${process.env.REACT_APP_PUERTO}:5000/viajes`)
            .then(res => res.json())
            .then(res => 
                setViajes(res)
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
        const datosnuevos = fetch(`http://${process.env.REACT_APP_PUERTO}:5000/viajes/${e.id}`,{
            method:"DELETE"
        })
    }

    let img = "./logo.png"

    return (
        <div className='App-header' style={{backgroundColor:"black"}} >
            <Nav></Nav>
            <h3>VUELOS DISPONIBLES</h3>
                <div class="row">
                    {viajes.map(function(viaje,index) {
                        return(
                            <div class="col-md-3">
                                <h3>NUMERO : {viaje.id}</h3>
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
                                        <Card.Link onClick={(e) => eliminar(viaje)}><h3>Eliminar</h3></Card.Link>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

