import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Button} from 'flowbite-react';
import axios from 'axios';

function ResetPassword() {
  let navigate= useNavigate();  
  let [send, setSend]= useState(false);
  let [password, setPassword]= useState("");
  let [confirmpassword, setConfirmPassword]= useState("");

  const handleSubmit= async function(e){
    e.preventDefault();
    console.log(password, confirmpassword);
    if(password===confirmpassword){
        let forgetpasswordtoken = localStorage.getItem('forgetpasswordtoken');
        let res= await axios.post('http://localhost:3000/users/resetpassword', {password, confirmpassword, forgetpasswordtoken});
        console.log(res.data);
        if(res.data.success===true){
            localStorage.removeItem('forgetpasswordtoken');
            setSend(true);
            navigate('/login');
        }
    }
  }

  return (
    <div className='h-screen w-full bg-zinc-800'>
        {!send ? <div className='h-full flex flex-col justify-center items-center gap-10'>
            <input type="password" name="password" id="password" placeholder='PASSWORD' className='rounded-[12px] h-10 w-1/6 p-2 text-lg' onChange={(e)=>setPassword(e.target.value)}/>
            <input type="password" name="confirmpassword" id="confirmpassword" placeholder='CONFIRM PASSWORD' className='rounded-[12px] h-10 w-1/6 p-2 text-lg' onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <Button gradientMonochrome="info" className='uppercase text-lg' onClick={(e)=>handleSubmit(e)}>send</Button></div>
            : <div className='h-full flex justify-center items-center uppercase'>
                <h1 className='text-4xl font-semibold'>password reset successfully</h1>
              </div>}
    </div>
  )
}

export default ResetPassword