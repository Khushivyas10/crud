import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EmpListing from './EmpListing';
import EmpEdit from './EmpEdit';
import EmpCreate from './EmpCreate';
import EmpDetails from './EmpDetails';

import React from 'react'

function App() {
  return (
    <div className="App">
      <h1> CRUD </h1>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EmpListing/>}></Route>
          <Route path='/employee/edit/:empid' element={<EmpEdit/>}></Route>
          <Route path='/employee/create' element={<EmpCreate/>}></Route>
          <Route path='/employee/details/:empid' element={<EmpDetails/>}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );

  



}

export default App;
