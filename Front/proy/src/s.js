import { BrowserRouter,Route,Routes } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import './App.css'
import Login from "./pages/Login";

function App(){
    
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login></Login>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App