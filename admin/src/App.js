// import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from './components/pages/Form';
import Table from './components/pages/Table';
import Performance from './components/pages/Performance';
import Navbar from './components/Navbar';
import CreateCollection from './components/pages/CreateCollection';
import CreateNFTs from './components/pages/CreateNFTs';
import Rightarrow from './components/SVG/rightarrow';

import {NotificationContainer} from 'react-notifications';

const instaImg = {
  backgroundImage: "url(./images/main_bg.png)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
}

function App() {

  const [mode, setMode] = useState('Darkmode');

  const toggleMode = ()=> { 
    if(mode === 'Darkmode'){ 
      setMode('Lightmode');
    }else{
      setMode('Darkmode');
    } 
  }; 

  return (
    <div style={instaImg} className={mode} >

      <div className='btn_hidden'>
        <div className='define_mode'>
          <button type='button' onClick={toggleMode}>
            <Rightarrow /> <span className='mode_text'>{mode==='Darkmode'?'Light Mode':'Dark Mode'}</span>
          </button>
        </div>
      </div>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path="navbar" model={mode} element={ <Navbar /> } toggleMode={toggleMode} />
          <Route path='form' element={ <Form /> } />
          <Route path='table' element={ <Table /> } />
          <Route path='performance' element={ <Performance /> } />
          <Route path='createcollection' element={ <CreateCollection />  } />
          <Route path='createnfts' element={ <CreateNFTs /> } />
        </Routes>
        <NotificationContainer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
