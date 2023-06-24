import '../App.css'
import Nav from '../components/navbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { useEffect, useState } from 'react';


export const Carros = () =>{

    const [carros, setCarros] = useState([]);

    useEffect(()=>{
        fetch(`http://${process.env.REACT_APP_PUERTO}:5000/carros`)
            .then(res => res.json())
            .then(res => 
                    setCarros(res)
            )
            .catch(err => console.error(err));
    }, []);
let img = "./logo.png"
    return (
        <div >
            <Nav></Nav>
            <h1>DJFSD</h1>
                <div class="row">
                    <Card className='espaciado-total' style={{background:"lightgreen", width: '25rem' }}>
                        <Card.Body>
                            <Card.Title>fdfdfd</Card.Title>
                        <Card.Img variant="top" src={img} />
                            <Card.Text>
                                Agencia
                            </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>
                    <Card className='espaciado-total' style={{background:"lightgreen", width: '25rem' }}>
                        <Card.Body>
                            <Card.Title>fdfdfd</Card.Title>
                        <Card.Img variant="top" src={img} />
                            <Card.Text>
                                Agencia
                            </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>
                    <Card className='espaciado-total' style={{background:"lightgreen", width: '25rem' }}>
                        <Card.Body>
                            <Card.Title>fdfdfd</Card.Title>
                        <Card.Img variant="top" src={img} />
                            <Card.Text>
                                Agencia
                            </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>
                    <Card className='espaciado-total' style={{background:"lightgreen", width: '25rem' }}>
                        <Card.Body>
                            <Card.Title>fdfdfd</Card.Title>
                        <Card.Img variant="top" src={img} />
                            <Card.Text>
                                Agencia
                            </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>
                    
            </div>
         
            {carros.map(function(carro) {
                return(
                <div>
                    <h1>JDJKJDKSD</h1>
                </div>
                )
            })}

            <div className='App-header'>
            </div>
        </div>
    )
}
