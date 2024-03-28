import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import axios from 'axios';
import { userContext } from '../context/userContext';

function Login() {
  let {setUserDetails}= userContext();

  let navigate= useNavigate();

  let [user, setUser]= useState({
    username: "",
    password: ""
  });

  const handleSubmit= async function(e){
    e.preventDefault();
    let res= await axios.post('http://localhost:3000/users/login', user);
    console.log(res.data);
    if(res.data.success===true){
      localStorage.setItem('refreshtoken', res.data.refreshtoken);
      setUserDetails((prev)=>{
        return {
          ...prev,
          username: res.data.userdetails.username,
          email: res.data.userdetails.email
        }
      });
      navigate('/profile')
    }else{
      navigate('/login');
    }
  } 

  return (
    <div className='bg-zinc-900 w-screen h-screen uppercase'>
      <div className="form-logo w-full h-full flex">
        <div className="form w-1/2 h-full flex flex-col gap-4 items-center justify-center px-7 py-14 ">
          <div className='h-1/2 w-2/3 flex flex-col items-center justify-center gap-[3vh]'>
            <input type="text" name="username" placeholder="USERNAME" className='rounded-[12px] p-2 font-medium w-2/3 text-zinc-900' autoFocus onChange={(e)=>{
                setUser({...user, username: e.target.value});
            }}/>
            <input type="password" name="password" placeholder="PASSWORD" className='rounded-[12px] p-2 font-medium w-2/3 text-zinc-900' autoFocus onChange={(e)=>{
                setUser({...user, password: e.target.value});
            }}/>
            <Button gradientMonochrome="info" className='uppercase text-md' onClick={(e)=>handleSubmit(e)}>login</Button>
            <Link to={'/'} className="underline text-violet-500">go to register</Link>
          </div>
          <div><Link to={'/forgetpassword'} className='underline text-violet-500'>forget password?</Link></div>
        </div>
        <div className="logo w-1/2 h-full flex justify-center items-center text-white">
          <div className=' px-7 py-14 h-2/3 w-2/3'>
            <img src="/logos/photogram_transparent.png" alt="" className="object-contain h-full w-full"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login