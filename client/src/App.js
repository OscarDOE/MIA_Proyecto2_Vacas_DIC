import React, { useState, useEffect } from 'react'
import './App.css'

function App(){
  const [backendData, setBackEndData] = useState([{}])
  const [id,setId] = useState("1");

  const handleChange = (e) => {
      setId(e.target.value)
      console.log(id)
  }
  
  var arraysss = [{id:"555",nombre:"LUIS"},{
    id:"666",nombre:"PEDRO"
  }]

  fetch("https://localhost:3000")




  return (
    <div className='App'>
      {arraysss.map(  ( {id, nombre},index) => (
        <div> {nombre}
        <p>{index}</p>
        <p>{id} {nombre}</p>
        </div>
      ))}
      <header className='App-header'>
        <h1>DAS ASCO {id}</h1>
        {id.concat("s")}
        <input type="text" onChange={handleChange}></input>        
        <h1>DAS ASCO  {id}</h1>
        {id}
        {console.log("SSSS")}
        <a href='https://www.google.com'>LALALALA</a>

      </header>
    </div>
  )
}

export default App


/*import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((res) => setData(res));
  }, []);

  return (
    <div className="App">
     {data.map(()=>())}
    </div>
  );
}*/


/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
