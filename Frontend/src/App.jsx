import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import Admin from './pages/admin';
import Lecture from './pages/lecturer';
import LectureDashnoard from './pages/lecturerDashboard';
import AdminDashboard from './pages/adminDashboard';
import LectureLogin from './pages/lec_login';
import AdminLogin from './pages/admin_login';
import AdminSubject from './pages/admin_subject';

function App() {

  return (
    <>
      <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
          <Route path='/lecturer' element={<Lecture/>}></Route>
          <Route path='/lecturer/lecturer_dashboard' element={<LectureDashnoard/>}></Route>
          <Route path='/admin/admin_dashboard' element={<AdminSubject/>}></Route>
          <Route path='/lecturer_login' element={<LectureLogin/>}></Route>
          <Route path='/admin_Login' element={<AdminLogin/>}></Route>
      </Routes>
    </>
  )
}

export default App
