import '../App.css'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import Navavicar from '../components/navbar';


export const Home = () =>{

if(sessionStorage==="admin"){
    return(
        console.log("XXX")
    )
}else if(sessionStorage==="user"){
    return(
        console.log("YYY")
    )

}

    return (
        <div>
            {/* <NavHome></NavHome> */}
            <Navavicar></Navavicar>
            <div className='App-header'>
                <img alt='LOGO' width='400px' style={{'border-radius':'8px','marginTop':'50px'}} src='./logo.png'/>
            <h2>Los Mejores Viajes al alcance de 2 clicks</h2>
            </div>
        </div>
    )
}
