import React from 'react'
import college from "./logos/collegelogo2.png";
import kfu from "./logos/kfulogo.png";

export default function MainHeader() {
  return (

        <div className='logo-container'>
        <img src={college} alt="college logo" className='college'/>
        <img src={kfu} alt="kfu logo" className='kfu'/>
    </div>

    
  )
}