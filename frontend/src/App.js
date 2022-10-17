import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify';

import { Route, Routes } from 'react-router-dom'

if(!localStorage.getItem("sessId")) localStorage.setItem("sessId", btoa(Math.floor((Math.random() * 1000) + 1) * 100))

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
