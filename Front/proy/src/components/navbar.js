import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Cookies from "universal-cookie"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";



const Navavicar = () =>{
    
    let location = useLocation();
    return (
        <div >
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <CollapsibleExample/>
                </Container>
                <Navigation></Navigation>
            </Navbar>

            
            {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="/">Avicar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <Navigation2/>
                </div>
                <div>  
                    <Navigation/>
                </div>
            </nav> */}
        </div>
        
    )
}



function CollapsibleExample() {
    let location = useLocation();
    const prueba = (e) => {
        if(location.pathname == '/'){
            return (
                <div>
                    <h3>
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav.Link href="/"><img alt='logo' width='50px' height='30px' src='./logo.png'></img>Avicar</Nav.Link>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/">Ofertas</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </h3>
                </div>
            );
        }else if(location.pathname == '/login'){
            return(
                <div>
                    <h3>
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav.Link href="/"><img alt='logo' width='50px' height='30px' src='./logo.png'></img>Avicar</Nav.Link>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </h3>
                </div>
            )
        }else if(location.pathname == '/register'){
            return(
                <div>
                    <h3>
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav.Link href="/"><img alt='logo' width='50px' height='30px' src='./logo.png'></img>Avicar</Nav.Link>
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </h3>
                </div>
            )

        }else if(location.pathname == '/admin' || location.pathname == '/adminviajes' || location.pathname == '/admincarros' || location.pathname == '/adminusuarios'|| location.pathname == '/adminregistroviajes' || location.pathname == '/adminregistrocarros' || location.pathname == '/adminregistrousuarios'){
            return (
                <div>
                    <h3>
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav.Link href="/admin"><img alt='logo' width='50px' height='30px' src='../logo.png'></img>Avicar</Nav.Link>
                        <Nav className="me-auto">
                            <Nav.Link href="/admin">Home</Nav.Link>
                            <Nav.Link href="/adminusuarios">Usuarios</Nav.Link>
                            <Nav.Link href="/adminviajes">Viajes</Nav.Link>
                            <Nav.Link href="/admincarros">Carros</Nav.Link>
                            <NavDropdown title="Registros" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/adminregistroviajes">Viajes</NavDropdown.Item>
                                <NavDropdown.Item href="/adminregistrocarros">Carros</NavDropdown.Item>
                                <NavDropdown.Item href="/adminregistrousuarios">Usuarios</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        </Navbar.Collapse>
                    </h3>
                </div>
            );
        }else if(location.pathname == '/user' || location.pathname == '/usercarros' || location.pathname == '/userviajes' || location.pathname == '/usersolicitudes'){
            return (
                <div>
                    <h3>
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav.Link href="/user"><img alt='logo' width='50px' height='30px' src='./logo.png'></img>Avicar</Nav.Link>
                        <Nav className="me-auto">
                            <Nav.Link href="/user">Home</Nav.Link>
                            <Nav.Link href="/user">Ofertas</Nav.Link>
                            <Nav.Link href="/userviajes">Viajes</Nav.Link>
                            <Nav.Link href="/usercarros">Carros</Nav.Link>
                            <Nav.Link href="/usersolicitudes">Solicitudes</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </h3>
                </div>
            );
        }else if(location.pathname == '/receptionist' || location.pathname == '/receptionistsolicitudes'){
            return (
                <div>
                    <h3>
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav.Link href="/receptionist"><img alt='logo' width='50px' height='30px' src='./logo.png'></img>Avicar</Nav.Link>
                        <Nav className="me-auto">
                            <Nav.Link href="/receptionist">Home</Nav.Link>
                            <Nav.Link href="/receptionist">Ofertas</Nav.Link>
                            <Nav.Link href="/receptionistsolicitudes">Solicitudes</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </h3>
                </div>
            );
        }
    }

    return(
        <div>
            {prueba("ss")}
        </div>
    )
          /* <Nav>
            <Nav.Link href="#">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav> */
}


function Navigation(){
    const cookies = new Cookies();

    const lele = (e) => {
        cookies.remove("session")
    }
    let location = useLocation();
    const prueba = (e) => {
        if(location.pathname == '/'){
            return(
                <div>
                    <h3>
                    <button style={{marginRight:'50px',width:'70px',height:'25px'}}><Link style={{color:'yellow',textDecoration:'none'}} to="/login" onClick={lele}>Login</Link></button>
                    <button style={{marginRight:'100px',width:'50px',height:'25px'}}><Link style={{color:'yellow', textDecoration:'none'}} to="/register">Register</Link></button>
                    </h3>
                </div>
            )
        }else if(location.pathname == '/login'){
            return(
                <div>
                    <h3>
                        <button style={{marginRight:'500px',width:'70px',height:'25px'}}><Link style={{color:'yellow',textDecoration:'none'}} to="/register">Register</Link></button>
                    </h3>
                </div>
            )
        }else if(location.pathname == '/register'){
            return(
                <div>
                    <h3>
                        <button style={{marginRight:'500px',width:'70px',height:'25px'}}><Link style={{color:'yellow',textDecoration:'none'}} to="/login" >Login</Link></button>
                    </h3>
                </div>

            )
        }else if(location.pathname == '/admin' || location.pathname == '/adminusuarios' || location.pathname == '/adminviajes' || location.pathname == '/admincarros' || location.pathname == '/adminregistroviajes'|| location.pathname == '/adminregistrocarros'|| location.pathname == '/adminregistrousuarios' || location.pathname == '/user'|| location.pathname == '/usercarros' || location.pathname == '/userviajes' || location.pathname == '/usersolicitudes' || location.pathname == '/recepctionist' || location.pathname == '/receptionistsolicitudes'){
            return(
                <div>
                    <h3>
                        <button style={{marginRight:'500px',width:'70px',height:'25px'}}><Link style={{color:'yellow',textDecoration:'none'}} to="/" onClick={lele}>Logout</Link></button>
                    </h3>
                </div>
            )
        }
    }
    return(
        <div>
            {prueba("ss")}
        </div>
    )
}
export default Navavicar;