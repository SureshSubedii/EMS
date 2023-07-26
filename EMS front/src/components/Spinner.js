import React from 'react'
import '../styles/spinner.css'
import loading from './loadingImage.gif'
export default function Spinner() {
  
    return (
      <div className='spinner'><img src={loading} alt='Loading' /> </div>
    )
  }
