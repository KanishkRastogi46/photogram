import React, { useState } from 'react'
import {Button} from 'flowbite-react';
import axios from 'axios';
//import UserProfile from './UserProfile';
import { userContext } from '../context/userContext';
import {useNavigate} from 'react-router-dom';

function EditProfile() {
  let navigate= useNavigate();
  let {userDetails,setUserDetails}= userContext();

  let [username, setUsername]= useState('');
  let [bio, setBio]= useState('');
  let [image, setImage]= useState();
  //let [edit, setEdit]= useState(false);

  const handleSubmit= async function(e){
    e.preventDefault();
    let formData= new FormData();
    formData.append('avatar', image)
    formData.append('username', userDetails.username);
    formData.append('newusername', username);
    formData.append('tagline', bio)
    let res= await axios.post('http://localhost:3000/users/profilechange', formData);
    console.log(res.data);
    if(res.data.success===true){
      setUserDetails({...userDetails, avatar: res.data.profileimage});
      navigate('/profile/myprofile');
    }else{
      navigate('/profile/myprofile');
    }
  }  

  return (
    <>
    <div className='container h-full w-full bg-zinc-900 flex flex-col items-center gap-10 text-white py-8'>
        <div className="avatar rounded-full border-2 border-solid h-20 w-20 border-pink-500"><img src={`${userDetails.avatar}`} alt="" className='object-cover h-full w-full rounded-full'/></div>
        <input type="file" name="avatar" id="mypic" accept='image/png,image/jpeg' className='rounded-md h-10 w-1/6 text-lg' onChange={e=>setImage(e.target.files[0])}/>
        <input type="text" name="username" id="username" placeholder='USERNAME' className='text-black text-center rounded-[16px] h-10 w-[10vw] text-lg' onChange={e=>setUsername(e.target.value)}/>
        <input type="text" name="tagline" id="tagline" placeholder='TAGLINE' className='overflow-scroll text-black text-center rounded-[16px] h-10 w-[20vw] text-lg' onChange={e=>setBio(e.target.value)}/>
        <Button gradientMonochrome="info" className='uppercase text-md' onClick={e=>handleSubmit(e)}>change</Button>   
    </div>
    </>
  )
}

export default EditProfile