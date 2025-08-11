import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Home from './components/home.jsx'
import Login from './components/login.jsx'
import Signup from './components/signup.jsx'
import PageNotFound from './components/pageNotFound.jsx'
import {Routes ,Route, Navigate} from 'react-router-dom'
import { Toaster } from 'react-hot-toast';


function App() {
  const [count, setCount] = useState(0)
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  
  return (
    <>
    
      <div>
       
        <Routes>
          <Route path='/' element={token?<Home/>: <Navigate to={"/login"}/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='*' element={<PageNotFound/>} />
        </Routes>
        <Toaster />
        
      </div>
    </>
  )
}

export default App
