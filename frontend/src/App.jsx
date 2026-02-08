import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route} from 'react-router-dom'
import Signup from './Components/Signup/Signup'
import Login from './Components/Login/Login'
import NavHomebar from './Components/NavHomebar/NavHomebar'

// import './App.css'

function App() {


  return (
<Routes>
  <Route path="/" element={<Signup/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/home" element={<NavHomebar/>}/>
</Routes>
  )
}

export default App
