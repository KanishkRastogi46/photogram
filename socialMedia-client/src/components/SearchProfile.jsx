import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from 'react-router-dom';

function SearchProfile() {
  let [username, setUsername]= useState("");
  let [users, setUsers]= useState([]);
  let [message, setMessage]= useState(0);

  const search= async function(e){
    //setUsername(e.target.value);
    let res= await axios.post('http://localhost:3000/users/searchprofile', {username})
    console.log(res.data);
    if(res.data.success){
      setUsers(res.data.userslist);
      setMessage(users.length);
    }else{
      setMessage(0);
    }
  };

  // useEffect(()=>{
  //   search()
  // },[username]);

  return (
    <div className='h-full w-full bg-zinc-900 p-8'>
        <div className='searchbar-id h-full flex flex-col items-center '>
            <div className='flex items-center gap-0 w-full justify-center'>
              <input type="text" name="name" id="searchid" placeholder='SEARCH' className='rounded-2xl h-12 w-1/3 text-xl font-semibold text-zinc-950 mb-6' onChange={(e)=>{
                setUsername(e.target.value);
                search(e);
              }}/>
              <AiOutlineSearch className='text-2xl -translate-x-10 -translate-y-3 text-zinc-800 font-bold'/>
            </div>
            <div className='flex justify-center'>
              <h1 className='uppercase text-xl font-semibold text-white mb-4'>{message} users found</h1>
            </div>
            {
              users.map((user, index)=>{           
                return <Link key={index} to={`/profile/${user.username}`} className='h-20 w-2/3'><div className='userid  flex justify-startx items-center gap-10 p-2 bg-zinc-500 text-white'>
                    <div className='avatar rounded-full border-2 border-solid border-red-600 object-cover h-16 w-16'><img src={`${user.profileimage}`} alt="" className='object-cover h-full w-full rounded-full'/></div>
                    <div className='username text-xl font-semibold'>{user.username}</div>
                </div></Link>
              })
            }
        </div>
    </div>
  )
}

export default SearchProfile