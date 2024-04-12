import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import { useEffect, useState } from "react";
import axios from 'axios';
import { userContext, UserProvider } from "./context/userContext";

export default function App() {
  let [userDetails, setUserDetails]= useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
    posts: 0,
    followers: 0,
    following: 0,
    bio: ""
  });

  let navigate= useNavigate();

  const authenticate= async function(){
    let res= await axios.post('http://localhost:3000/users/profile', {refreshtoken: localStorage.getItem('refreshtoken')});
    console.log(res.data);
    if(!res.data.success){
      navigate('/login');
    }
    setUserDetails({...userDetails, username: res.data.user.username, email: res.data.user.email, bio: "hello I am a web developer and data science and ml enthusiast", avatar: res.data.user.profileimage});
  };
  
  useEffect(()=>{
    authenticate();
  },[])

  return (
    <UserProvider value={{userDetails, setUserDetails}}>
      <div className="container h-screen w-full flex flex-col">
        <NavBar/>
        <div className='bg-zinc-900 w-screen h-[92%] text-white'>
          <Outlet/>
        </div>
      </div>
    </UserProvider>
  )
}

//export default App
