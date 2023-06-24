import '../App.css'
import Nav from '../components/navbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useEffect, useState } from 'react';
import Cookies from "universal-cookie"

export const CarrosUser = () =>{
    const [carros, setCarros] = useState([]);
    let datos = {}
    const navigate = useNavigate()
    const cookies = new Cookies();
    let initcookie = cookies.get("session")
    const agregar = async (e) => {
        datos = {
            carro:"1",
            viaje:"0",
            iduser:initcookie.id,
            usuario:initcookie.usuario,
            email:initcookie.email,
            Estado:"Pendiente",
            Agency:e.Agency,
            Brand:e.Brand,
            Model:e.Model,
            Badge:e.Badge,
            Price:e.Price,
            City:e.City
        }
        
        console.log("DATOS",datos)
        await fetch(`http://${process.env.REACT_APP_PUERTO}:5000/solicitudes`,{
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
                fetch(`http://${process.env.REACT_APP_PUERTO}:5000/autos`)
                    .then(res => res.json())
                    .then(res => 
                            setCarros(res)
                    )
                    .catch(err => console.error(err));
                    console.log(datos)
            }else{
                navigate('/')
            }
        }else{
            navigate('/')
        }


    }, []);


    let img = "./logo.png"
    
    return (
        <div style={{backgroundColor:'black'}}>
            <Nav></Nav>
            <h3>Carros Disponibles</h3>
                <div class="row">         
            {carros.map(function(carro) {
                console.log(carro)
                console.log(carro.Agency)
                console.log(carro.Price)
                console.log(carro.City)
                return(
                <div class="col-md-3">
                    <h3>{carro.id}</h3>
                    <Card className='espaciado-total' style={{background:"lightgreen", width: '15rem' }}>
                        <Card.Body>
                            <Card.Title><h5>Agencia: {carro.Agency}</h5></Card.Title>
                            <Card.Img variant="top" src={img} />
                            <Card.Text style={{background:"lightblue"}}>
                                <h5>Precio : {carro.Price}</h5>
                            </Card.Text>
                        </Card.Body>
                            <ListGroup className="list-group-flush">
                            <ListGroup.Item><h5>Marca: {carro.Brand}</h5></ListGroup.Item>
                            <ListGroup.Item><h5>Modelo: {carro.Model}</h5></ListGroup.Item>
                            <ListGroup.Item><h5>Placa: {carro.Badge}</h5></ListGroup.Item>
                            </ListGroup>
                            <Card.Text style={{background:"yellow"}}><h5>Recoger en: {carro.City}dsds</h5></Card.Text>
                        <Card.Body>
                            <button style={{fontSize:"30px", color:"blue"}} onClick={(e) => agregar(carro)}>Solicitar</button>
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
