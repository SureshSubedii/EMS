import React from 'react'
import '../styles/home.css'
import Appcontents from './Appcontents'
import Sidebar from './Sidebar'

function Home() {
  
  return (
    <div  className="home">
      <Sidebar/> 
      <Appcontents/>
    </div>
  )
}

export default Home