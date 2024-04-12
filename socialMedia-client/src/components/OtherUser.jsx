import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {userContext} from '../context/userContext';
import {Button} from 'flowbite-react';

function OtherUser() {
  let {userDetails}= userContext();

  let { usrname }= useParams();
  let navigate= useNavigate();

  let [user, setUser]= useState({});
  let [msg, setMsg]= useState("");
  let [follows, setFollows]= useState();
  let [posts, setPosts]= useState();

  const search= async function(){
    let res= await axios.post('http://localhost:3000/users/getprofile', {username: usrname});
    console.log(res.data);
    if(res.data.success){
        setUser(res.data.user);
        setPosts(res.data.posts);
        //console.log(user);
    }else{
        setMsg(`No user found by username: ${usrname}`);
    }
  };

  const follower= async function(){
    let res= await axios.post('http://localhost:3000/users/checkfollow', {username: userDetails.username, otheruser: usrname});
    console.log(res.data);
    if(res.data.success){
        setFollows(res.data.isFollowing);
    }
  };

  useEffect(()=>{
    if(usrname===userDetails.username){
        navigate('/profile/myprofile')
    }
  },[])

  useEffect(()=>{
    search();
  },[]);

  useEffect(()=>{
    follower();
  },[])

  //console.log(user, userDetails);

  return (
    <>
       {!msg  ? <div className='container h-full bg-zinc-900 flex flex-col text-white'>
            <div className="avatar followers h-1/6 mt-10 flex justify-center gap-8">
                <div className="avatar rounded-full border-2 border-solid h-20 w-20 border-pink-500 object-cover">
                    <img src={`${user.profileimage}`} alt="img" className='object-cover h-full w-full rounded-full'/>
                </div>
                <div className="post flex justify-between gap-2"><span>{posts}</span><span>posts</span></div>
                <div className="follower flex justify-between gap-2"><span>{0}</span><span>followers</span></div>
                <div className="following flex justify-between gap-2"><span>{0}</span><span>following</span>
                </div>
            </div>
            <div className="bio h-auto flex flex-col justify-center items-center gap-8 mb-4">
                <div className="username text-lg font-semibold flex text-white">{user.username}</div>
                <div className="tagline text-lg flex justify-center text-white">Happy developer peeps<span></span></div>
            </div>
            {!follows ? <div className="follow-btn flex justify-center">
                <Button gradientMonochrome="cyan" className='uppercase font-semibold text-zinc-900'>follow +</Button>
            </div> : <><hr className='font-bold text-blue-500 mt-3'/>
        <div className="posts h-auto flex flex-wrap justify-around items-center">

        </div></>}
        </div> : <div className='container h-full w-full bg-zinc-900 flex flex-col justify-center items-center gap-4'>
                <h1 className='uppercase font-semibold text-white text-2xl'>{msg}</h1>
                <Link to={'/profile/searchprofile'} className='uppercase font-semibold text-blue-500 text-2xl'>search profile</Link>
            </div>}
    </>
  )
}

export default OtherUser