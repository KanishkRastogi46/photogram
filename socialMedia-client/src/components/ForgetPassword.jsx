import React, { useState } from 'react'
import { Button } from 'flowbite-react';
import axios from 'axios';

function ForgetPassword() {
  let [email, setEmail]= useState('');
  let [sendemail, setSendemail]= useState(false)

  const handleSubmit= async function(e){
    e.preventDefault();
    let res= await axios.post('http://localhost:3000/users/forgetpassword', {email});
    console.log(res.data);
    if(res.data.success===true){
        localStorage.setItem('forgetpasswordtoken', res.data.forgetpasswordtoken);
        setSendemail(true);
    }
  }

  return (
    <div className='h-screen w-full bg-zinc-800'>
        {!sendemail ? <div className='h-full flex flex-col justify-center items-center gap-10'><input type="email" name="email" id="email" placeholder='EMAIL' className='rounded-[12px] h-10 w-1/6 p-2 text-lg' onChange={e=>setEmail(e.target.value)}/>
        <Button gradientMonochrome="info" className='uppercase text-lg' onClick={(e)=>handleSubmit(e)}>send</Button></div> : <div className='h-full flex justify-center items-center uppercase'><h1 className='text-4xl font-semibold'>an email for password reset has been sent to you so go and check it out</h1></div>}
    </div>
  )
}

export default ForgetPassword;