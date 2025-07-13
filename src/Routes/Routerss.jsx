import React, { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Folders from '../Page/Folders'
import Login from '../Page/Login'
import Register from '../Page/Register'
const EditorPage =lazy(()=>import('../Page/EditorPage'))
const LandingPage =lazy(()=>import('../Page/LandingPage'))
const PageNotFound =lazy(()=>import('../Page/PageNotFound'))

const Routerss = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/main/:id' element={<EditorPage/>}/>
            <Route path='*' element={<PageNotFound/>}/>
            <Route path='/folder' element={<Folders/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Routerss