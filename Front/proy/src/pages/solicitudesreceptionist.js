import '../App.css'
import Nav from '../components/navbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Cookies from "universal-cookie"
import { Link, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useEffect, useState } from 'react';

export const ReceptionistSolicitudes = () =>{
    const [carros, setCarros] = useState([]);
    const navigate = useNavigate()
    const cookies = new Cookies();

    let datos = {}
    useEffect(()=>{
        if(!!cookies.get("session")){
            const cookie = cookies.get("session")
            if(cookie.type =="0"){
            }
            else if(cookie.type =="1"){
                fetch('http://localhost:5000/solicitudes')
                    .then(res => res.json())
                    .then(res => 
                            setCarros(res)
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


    }, []);

    const denegar = (e) => {
        datos = e
        datos = {
            ...datos,
            Estado:"Denegada"
        }
        const datosnuevos = fetch(`http://localhost:5000/solicitudes/${e.id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(datos)
        })
        .then(res => res.json())
        .then(res => {
        })
    }
    const aceptar = (e) => {
        datos = e
        datos = {
            ...datos,
            Estado:"Aceptada"
        }
        const datosnuevos = fetch(`http://localhost:5000/solicitudes/${e.id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(datos)
        })
        .then(res => res.json())
        .then(res => {
        })
    }

    return (
        <div style={{backgroundColor:'black'}}>
            <Nav></Nav>
            <h3>Solicitudes Recibidas</h3>
                <div id='cinvo' class="row">         
            {carros.map(function(carro) {
                if(carro.Estado =="Pendiente"){
                    if(carro.carro =="1"){
                        return(
                        <div class="col-md-3">
                            <h5>{carro.id}</h5>
                            <Card className='espaciado-total' style={{background:"yellow", width: '15rem' }}>
                                <Card.Body>
                                    <Card.Title><h5>Usuario: {carro.usuario}</h5></Card.Title>
                                    <Card.Title><h5>Correo Electrónico: {carro.email}</h5></Card.Title>
                                    <Card.Img variant="top" src={carro.image} />
                                </Card.Body>
                                    <Card.Text style={{background:"lightblue"}}><h5>Agencia : {carro.Agency}</h5></Card.Text>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item><h5>Marca: {carro.Brand}</h5></ListGroup.Item>
                                    <ListGroup.Item><h5>Modelo: {carro.Model}</h5></ListGroup.Item>
                                    <ListGroup.Item><h5>Placa: {carro.Badge}</h5></ListGroup.Item>
                                </ListGroup>
                                <Card.Text style={{background:"lightblue"}}><h5>Precio: {carro.Price}</h5></Card.Text>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item><h5>Ciudad: {carro.City}</h5></ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    <Card.Link onClick={(e) => aceptar(carro)}>Aceptar</Card.Link>
                                    <Card.Link onClick={(e) => denegar(carro)}>Denegar</Card.Link>
                                </Card.Body>
                            </Card>
                        </div>
                        )
                    }else if(carro.viaje=="1"){
                        return(
                        <div class="col-md-3">
                            <h5>{carro.id}</h5>
                            <Card className='espaciado-total' style={{background:"#ac9597", width: '15rem' }}>
                                <Card.Body>
                                    <Card.Title><h5>Usuario: {carro.usuario}</h5></Card.Title>
                                    <Card.Title><h5>Correo Electrónico: {carro.email}</h5></Card.Title>
                                    <Card.Img variant="top" src={carro.image} />
                                </Card.Body>
                                    <Card.Text style={{background:"lightblue"}}><h5>Agencia : {carro.Agency}</h5></Card.Text>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item><h5>Origen: {carro.From}</h5></ListGroup.Item>
                                    <ListGroup.Item><h5>Destino: {carro.To}</h5></ListGroup.Item>
                                    <ListGroup.Item><h5>Días de Vuelo: {carro.Days}</h5></ListGroup.Item>
                                </ListGroup>
                                <Card.Text style={{background:"lightblue"}}><h5>Precio: {carro.Price}</h5></Card.Text>
                                <ListGroup className="list-group-flush">
                                </ListGroup>
                                <Card.Body>
                                    <Card.Link onClick={(e) => aceptar(carro)}>Aceptar</Card.Link>
                                    <Card.Link onClick={(e) => denegar(carro)}>Denegar</Card.Link>
                                </Card.Body>
                            </Card>
                        </div>
                        )
                    }
                }
            })}
</div>
        <div className='App-header'>
            </div>
        </div>
    )
}