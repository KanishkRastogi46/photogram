import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import VerifyEmail from './components/VerifyEmail.jsx'
import ForgetPassword from './components/ForgetPassword.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import UserProfile from './components/UserProfile.jsx'
import EditProfile from './components/EditProfile.jsx'
import SearchProfile from './components/SearchProfile.jsx'
import OtherUser from './components/OtherUser.jsx'

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgetpassword' element={<ForgetPassword/>}/>
      <Route path='/resetpassword' element={<ResetPassword/>}/>
      <Route path='/verifyemail' element={<VerifyEmail/>}/>
      <Route path='/profile' element={<App/>}>
        <Route path='' element={<Home/>}/>
        <Route path='searchprofile' element={<SearchProfile/>}/>
        <Route path='myprofile' element={<UserProfile/>}/>
        <Route path='editprofile' element={<EditProfile/>}/>
        <Route path=':usrname' element={<OtherUser/>}/>
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
