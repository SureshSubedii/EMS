import { Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import '../styles/home.css';
import Appcontents from './Appcontents';
import Sidebar from './Sidebar';



function Home() {
  useEffect(() => {
    document.querySelector(".home_menu")?.classList.add("hide")

  }, [])
  const handleShow=()=>{
    document.querySelector(".sidebar").classList.remove("hide")
    document.querySelector(".home_menu").classList.add("hide")
  
  }
  
  return (
    <div  className="home">
       
      <Sidebar/> 
      <div className="home_menu">
<IconButton  onClick={()=>handleShow()}>
         <Menu />
          </IconButton> 
</div>
  
      
      <Appcontents/>
    </div>
  )
}

export default Home