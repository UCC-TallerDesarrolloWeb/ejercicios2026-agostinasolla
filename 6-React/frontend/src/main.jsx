import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route} from "react-router";
import './index.css';
import Login from './Login.jsx';
import Activities from './Activities.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login /> }
      <Route path='/actividades' element={Activities />} >/</Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
