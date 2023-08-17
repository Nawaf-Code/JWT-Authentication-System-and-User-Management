import React from 'react'
// @ts-ignore
import college from "./logos/collegelogo2.png";
// @ts-ignore
import kfu from "./logos/kfulogo.png";

export default function MainHeader() {
  return (
    <section className='copy'>
        <div className='logo-container'>
        <img src={college} alt="college logo" className='college'/>
        <img src={kfu} alt="kfu logo" className='kfu'/>
    </div>
    </section>
    
  )
}