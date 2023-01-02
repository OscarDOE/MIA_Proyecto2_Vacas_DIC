import '../App.css'
import Nav from '../components/navbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Cookies from "universal-cookie"

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export const Carros = () =>{
    const [carros, setCarros] = useState([]);

    const navigate = useNavigate()
    const cambiarpagina= (e) => {
        navigate('/admincarros#')
    }
    const cookies = new Cookies();

    useEffect(()=>{

        if(!!cookies.get("session")){
            const cookie = cookies.get("session")
            if(cookie.type =="0"){
                fetch('http://localhost:5000/autos')
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
        const datosnuevos = fetch(`http://localhost:5000/autos/${e.id}`,{
            method:"DELETE"
        })
    }

    let img = "./logo.png"
    
    return (
        <div style={{backgroundColor:'black'}}>
            <Nav></Nav>
            <h3>Carros Disponibles</h3>
                <div id='cinvo' class="row">         
            {carros.map(function(carro) {
                return(
                <div class="col-md-3">
                    <h5>{carro.id}</h5>
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
                            <Card.Text style={{background:"yellow"}}><h5>Recoger en: {carro.City}</h5></Card.Text>
                        <Card.Body>

                            <Card.Link onClick={(e) => eliminar(carro)}><h3>Eliminar</h3></Card.Link>
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