import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'flowbite-react';
import axios from 'axios';
import { redirect } from "react-router-dom";

function Register() {
  let [user, setUser]= useState({
    username: "",
    password: "",
    email: "",
  });
  let [sendemail, setSendemail]= useState(false)

  const handleSubmit= async function(e){
    e.preventDefault();
    let res= await axios.post('http://localhost:3000/users/register', user);
    console.log(res.data);
    if(res.data.success===true){
      localStorage.setItem('verifyemail', res.data.verifyemail);
      setSendemail(true);
    }else{
      redirect('/');
    }
  }

  return (
    <div className='bg-zinc-900 w-screen h-screen uppercase'>
      {!sendemail ? <div className="form-logo w-full h-full flex">
        <div className="form w-1/2 h-full flex items-center justify-center px-7 py-14 ">
          <div className='h-1/2 w-2/3 flex flex-col items-center justify-center gap-[3vh]'>
            <input type="text" name="username" placeholder="USERNAME" className='rounded-[12px] p-2 font-medium w-2/3 text-zinc-900' autoFocus onChange={(e)=>{
                setUser({...user, username: e.target.value});
            }}/>
            <input type="password" name="password" placeholder="PASSWORD" className='rounded-[12px] p-2 font-medium w-2/3 text-zinc-900' autoFocus onChange={(e)=>{
                setUser({...user, password: e.target.value});
            }}/>
            <input type="email" name="email" placeholder="EMAIL" className='rounded-[12px] p-2 font-medium w-2/3 text-zinc-900' autoFocus onChange={(e)=>{
                setUser({...user, email: e.target.value});
            }}/>
            <Button gradientMonochrome="info" className='uppercase text-md' onClick={(e)=>handleSubmit(e)}>register</Button>
            <Link to={'/login'} className="underline text-violet-500">go to login</Link>
          </div>
        </div>
        <div className="logo w-1/2 h-full flex justify-center items-center text-white">
          <div className=' px-7 py-14 h-2/3 w-2/3'>
            <img src="/logos/photogram_transparent.png" alt="" className="object-contain h-full w-full"/>
          </div>
        </div>
      </div> : <div className="message h-full flex justify-center items-center">
        <h1 className='uppercase text-2xl text-center text-white'>an email has been sent to you go and check it</h1>
      </div> }
    </div>
  )
}

export default Register;