import { useState } from 'react'
import {Route , Routes} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';

import './App.css'

function App() {

  return (
    <div>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/auth' element={<AuthPage/>}/>
        </Routes>
    </div>
  );
}

export default App
