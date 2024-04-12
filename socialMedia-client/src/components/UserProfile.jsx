import React, { useEffect } from 'react'
import { userContext } from '../context/userContext'
import { Button } from 'flowbite-react';
import {Link} from 'react-router-dom';
import axios from "axios";


function UserProfile() {
  let {userDetails, setUserDetails}= userContext(); 

  console.log(userDetails);

  return (
    <>
      <div className='container h-full bg-zinc-900 flex flex-col text-white'>
        <div className="avatar followers h-1/6 mt-10 flex justify-center gap-8">
            <div className="avatar rounded-full border-2 border-solid h-20 w-20 border-pink-500 object-cover">
              <img src={`${userDetails.avatar}`} alt="" className='object-cover h-full w-full rounded-full'/>
            </div>
            <div className="post flex justify-between gap-2"><span>{userDetails.posts}</span><span>posts</span></div>
            <div className="follower flex justify-between gap-2"><span>{userDetails.followers}</span><span>followers</span></div>
            <div className="following flex justify-between gap-2"><span>{userDetails.following}</span><span>following</span>
            </div>
        </div>
        <div className="bio h-auto flex flex-col justify-center items-center gap-8 mb-4">
            <div className="username text-lg font-semibold flex text-white">{userDetails.username}</div>
            <div className="tagline text-lg flex justify-center text-white"><span>{userDetails.bio}</span></div>
        </div>
        <div className="edit flex justify-center items-center">
            <Link to={'/profile/editprofile'}>
              <Button outline gradientDuoTone="cyanToBlue" className='uppercase'>edit profile</Button>
            </Link>
        </div>
        <hr className='font-bold text-blue-500 mt-3'/>
        <div className="posts h-auto flex flex-wrap justify-around items-center">

        </div>
      </div>
    </>
  )
}

export default UserProfile;