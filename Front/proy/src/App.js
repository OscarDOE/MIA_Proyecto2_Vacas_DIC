import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/Login';
import Register from './pages/Register';
import Nav from './components/navbar';
import { Home } from './pages/home';
import { Globals } from './helper/globals';
import { ProtectedRoute } from './components/ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Admin } from './pages/admin';
import { User } from './pages/user';
import { Receptionist } from './pages/Receptionist';
import { FormViajes } from './components/formviajes';
import { FormCarros } from './components/formcarros';
import { Carros } from './pages/carros';
import { Viajes } from './pages/viajes';
import { FormUsuarios } from './components/form.usuarios';
import { CarrosUser } from './pages/carrosusers';
import { SolicitudesUser } from './pages/solicitudesusers';
import { ViajesUser } from './pages/viajesusers';
import { AdminUsuarios } from './pages/adminusuarios';
import { ReceptionistSolicitudes } from './pages/solicitudesreceptionist';

function App(){
  const [id,setId] = useState("1");

  const handleChange = (e) => {
      setId(e.target.value)
      console.log(id)
  }
  
  var arraysss = [{id:"555",nombre:"LUIS"},{
    id:"666",nombre:"PEDRO"
  }]

  const botoncito = (e) => {
    setId("500")
  }

  return (
    <div className='App'>

      {/* {arraysss.map(  ( {id, nombre},index) => (
        <div> {nombre}
        <p>{index}</p>
        <p>{id} {nombre} {z}</p>
        </div>
      ))} */}
      <div style={{'backgroundColor':'lightgreen'}}>
        <h1><a style={{textDecoration:'none'}}>Avicar</a></h1>
        

      </div>
      {/* <Nav></Nav> */}

      {/* <header className='App-header'> */}
      <header>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute/>}>
              <Route path="/" element={<Home></Home>}/>
            </Route>
              <Route path="/login" element={<Login></Login>}/>
              <Route path='/register' element={<Register></Register>}/>
            <Route element={<ProtectedRoute></ProtectedRoute>}>
                <Route path='/admin' element={<Admin></Admin>}/>
                <Route path='/adminusuarios' element={<AdminUsuarios></AdminUsuarios>}/>
                <Route path='/adminviajes' element={<Viajes></Viajes>}/>
                <Route path='/admincarros' element={<Carros></Carros>}/>
                <Route path='/adminregistroviajes' element={<FormViajes></FormViajes>}/>
                <Route path='/adminregistrocarros' element={<FormCarros></FormCarros>}/>
                <Route path='/adminregistrousuarios' element={<FormUsuarios></FormUsuarios>}/>
            </Route>
            <Route element={<ProtectedRoute></ProtectedRoute>}>
              <Route path='/receptionist' element={<Receptionist></Receptionist>}/>
              <Route path='/receptionistsolicitudes' element={<ReceptionistSolicitudes></ReceptionistSolicitudes>}/>
            </Route>
            <Route element={<ProtectedRoute></ProtectedRoute>}>
              <Route path='/user' element={<User></User>}/>
              <Route path='/usercarros' element={<CarrosUser></CarrosUser>}/>
              <Route path='/usersolicitudes' element={<SolicitudesUser></SolicitudesUser>}/>
              <Route path='/userviajes' element={<ViajesUser></ViajesUser>}/>
            </Route>
          </Routes>
        </BrowserRouter>
        {/* <h1>DAS ASCdO {id}</h1>
        {id.concat("s")}
        <input type="button" placeholder='PRESIONAME Y CAMBIARE' onClick={botoncito}></input>
        <input type="text" onChange={handleChange}></input>        
        <h1>DAS ASCO  {id}</h1>
        {id}
        {console.log("SSSS")}
        <a href='https://www.google.com'>LALALALA</a> */}

      </header>
    </div>
  )
}

export default App