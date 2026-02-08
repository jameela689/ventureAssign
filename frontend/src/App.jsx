import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route} from 'react-router-dom'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import HomePage from './Components/HomePage/HomePage'
import Navbar from './Components/Navbar/Navbar'

// import './App.css'

function App() {


  return (
<Routes>
  <Route path="/" element={<Signup/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/home" element={<Navbar/>}/>
</Routes>
  )
}

export default App
