import '../App.css'
import Nav from '../components/navbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Cookies from "universal-cookie"
import { Link, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useEffect, useState } from 'react';

export const SolicitudesUser = () =>{

    const [carros, setCarros] = useState([]);
    const navigate = useNavigate()

    const cookies = new Cookies();
    const initcookie = cookies.get("session")
    let ver = cookies.get("ver")
    useEffect(()=>{
        ver = cookies.get("ver")
        if(!!cookies.get("session")){
            const cookie = cookies.get("session")
            if(cookie.type =="0"){
                fetch('http://localhost:5000/solicitudes')
                    .then(res => res.json())
                    .then(res => 
                            setCarros(res)
                    )
                    .catch(err => console.error(err));
                }else if(cookie.type =="1"){
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

    const denegar = (e) => {
        console.log(e)
        console.log("ENTRO A ELIMINAR")
        const datosnuevos = fetch(`http://localhost:5000/users/${e.id}`,{
            method:"PATCH"
        })
    }
    const aceptar = (e) => {
        console.log(e)
        console.log("ENTRO A ELIMINAR")
        const datosnuevos = fetch(`http://localhost:5000/users/${e.id}`,{
            method:"PATCH"
        })
    }
    
    return (
        <div style={{backgroundColor:'black'}}>
            <Nav></Nav>
            <h1>Carros Disponibles</h1>
                <div class="row">         
            {carros.map(function(carro) {
                let tiposolicitud = "yellow"
                let colortipo = "yellow"
                if(carro.Estado =="Pendiente"){
                    tiposolicitud="yellow"
                    colortipo = "red"
                }else if(carro.Estado =="Aceptada"){
                    tiposolicitud="green"
                    colortipo="yellow"
                }else if(carro.Estado == "Denegada"){
                    tiposolicitud="#800000"
                    colortipo = "white"
                }
                    if(carro.carro =="1" && carro.iduser==ver.iduser){
                        return(
                        <div class="col-md-3">
                            <h5>{carro.id}</h5>
                            <Card className='espaciado-total' style={{background:tiposolicitud, width: '15rem' }}>
                                <Card.Body>
                <Card.Text style={{color:colortipo}}><h5>AUTO</h5></Card.Text>
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
                                    <ListGroup.Item><h5>Agencia: {carro.City}</h5></ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                </Card.Body>
                            </Card>
                        </div>
                        )
                    }else if(carro.viaje=="1" && carro.iduser == ver.iduser){
                        return(
                        <div class="col-md-3">
                            <h5>{carro.id}</h5>
                            <Card className='espaciado-total' style={{background:tiposolicitud, width: '15rem' }}>
                                <Card.Body>
                                    <Card.Text style={{color:colortipo}}><h5>VIAJE</h5></Card.Text>
                                    <Card.Img variant="top" src={carro.image} />
                                </Card.Body>
                                    <Card.Text style={{background:"lightblue"}}><h5>Agencia : {carro.Agency}</h5></Card.Text>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item><h5>Origen: {carro.Brand}</h5></ListGroup.Item>
                                    <ListGroup.Item><h5>Destino: {carro.Model}</h5></ListGroup.Item>
                                    <ListGroup.Item><h5>Días de Vuelo: {carro.Badge}</h5></ListGroup.Item>
                                </ListGroup>
                                <Card.Text style={{background:"lightblue"}}><h5>Precio: {carro.Price}</h5></Card.Text>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item><h5>Agencia: {carro.City}</h5></ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                </Card.Body>
                            </Card>
                        </div>
                        )
                    }
                
            })}
</div>
            <div className='App-header'>
            </div>
        </div>
    )
}