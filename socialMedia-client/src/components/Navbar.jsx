import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {Button,Navbar} from 'flowbite-react';
import { AiFillHome } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
import { IoNotificationsSharp } from "react-icons/io5";
import { BiSolidSearch } from "react-icons/bi";
import { MdCreateNewFolder } from "react-icons/md";

export default function NavBar() {
  let naviagte= useNavigate();

  const handleSubmit= async function(e){
    e.preventDefault();
    let res= await axios.post('http://localhost:3000/users/logout', {refreshtoken: localStorage.getItem('refreshtoken')});
    console.log(res.data);
    if(res.data.success===true){
      localStorage.removeItem('refreshtoken');
      naviagte('/');
    }else{
      localStorage.removeItem('refreshtoken');
      naviagte('/login');
    }
  }

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="https://flowbite-react.com">
        <img src="https://res.cloudinary.com/dobcz2ree/image/upload/v1711800694/Photogram/photogram_gzbdqh.png" className="mr-3 h-full w-20 object-cover sm:h-12" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">photogram</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button className="uppercase text-lg font-semibold" onClick={(e)=>handleSubmit(e)}>logout</Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/profile" className="font-semibold text-2xl" active><AiFillHome /></Navbar.Link>
        <Navbar.Link href="#" className="font-semibold text-2xl" ><IoNotificationsSharp/></Navbar.Link>
        <Navbar.Link href="#" className="font-semibold text-2xl" ><MdCreateNewFolder/></Navbar.Link>
        <Navbar.Link href="/profile/searchprofile" className="font-semibold text-2xl" ><BiSolidSearch/></Navbar.Link>
        <Navbar.Link href="/profile/myprofile" className="font-semibold text-2xl" ><BiSolidUser/></Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
