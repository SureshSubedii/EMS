import React from 'react'
import '../styles/sidebar.css'

function Sidebar() {
  return (
    <> 
    <div className="sidebar">
            <p className='sidebar_items'>Dashboard</p>
            <p className='sidebar_items'>Products</p>
            <p className='sidebar_items'>Add Products</p>
            <p className='sidebar_items'>User Management</p>


    </div>
            <div className="line"></div>
            </>

  )
}

export default Sidebar