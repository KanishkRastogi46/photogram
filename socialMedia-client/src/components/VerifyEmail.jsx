import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function VerifyEmail() {
  let navigate= useNavigate();
  let [isverified, setVerified]= useState(false);

  const verify= async function(){
    let verifyemail= localStorage.getItem('verifyemail');
    if(verifyemail){
        setVerified(true);
        localStorage.removeItem('verifyemail')
        let res= await axios.post('http://localhost:3000/users/verifyemail', {verifyemail});
        console.log(res.data);
        setTimeout(()=>{
            navigate('/login');
        }, 2000);
    }else{
        setVerified(false);
        setTimeout(()=>{
            navigate('/');
        }, 2000);
    }
  }

  useEffect(()=>{
    verify();
  },[])

  return (
    <div className='h-screen w-full bg-zinc-900 flex justify-center items-center'>
        <h1 className='uppercase underline text-5xl font-semibold'>
            {isverified ? "verified..." : "not verified..."}
        </h1>
    </div>
  )
}

export default VerifyEmail;