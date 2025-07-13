import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './edt.css'
import {useGSAP} from "@gsap/react"
import gsap from 'gsap'
import { useDispatch } from 'react-redux'
import { CurrentUser, Userlogout } from '../Store/Action/UserAction'
import NavBar from '../Components/NavBar'

const LandingPage = () => {

  const [user, setuser] = useState(JSON.parse(localStorage.getItem("User")))
  const dispatch=useDispatch()
  const navigator=useNavigate()
  useEffect(()=>{
    setuser(JSON.parse(localStorage.getItem("User")))
    dispatch(CurrentUser())
  },[])

  useGSAP(() => {
    const t1=gsap.timeline()
    t1.to(".logo",{
      scale:1,
      opacity:1,
      duration:1.5,
    })
    .from(".no ",{
      y:190,
      opacity:0,
      duration:1.5,
      stagger:0.2,
      ease:"bounce.in"
    })
    .from(".cir3 ",{
      opacity:0,
      stagger:0.2,
    })
    .from(".cir2 ",{
      opacity:0,
      stagger:0.2,
    },"j")
    .from(".cir4 ",{
      opacity:0,
      stagger:0.2,
    },"j")
    .from(".cir1 ",{
      opacity:0,
      stagger:0.2,
    },"k")
    .from(".cir5 ",{
      opacity:0,
      stagger:0.2,
    },"k")
    .to(".ab",{
      scale:0,
      opacity:0,
      display:"none",
      duration:.8,
    },"b")
    .from(".a",{
      scale:0,
      delay:.5,
      ease:"power1.inOut"
    },"b")
    .to(".blue",{
      width:"100%",
      height:"90%",
      opacity:1,
      duration:1,
      ease:"back.out(1.7)"
    })
    .from(".text .up",{
      opacity:0,
      delay:.4,
      duration:1.5,
      ease:"back.out(1.7)"
    },"a")
    .from(".text .down",{
      opacity:0,
      duration:1,
      ease:"back.out(1.7)"
    },"a")
  })
  return (
    <>
   <main className='w-full h-screen relative  overflow-hidden'>
      <div className='ab z-[5] w-[100vw] h-full bg-white border-1 absolute rounded-b-[4px]  flex items-center justify-center gap-2'>
        <img className=' logo w-[30vw] h-70 bg-white scale-[1.9] opacity-0' src="./OIP.webp" alt="" />
        <div className="ani flex items-center justify-center flex-col">
          <div className="allcircle flex gap-3">
            <div className="cir1  w-5 h-5 bg-yellow-300 rounded-full"></div>
            <div className="cir2  w-5 h-5 bg-green-400 rounded-full"></div>
            <div className="cir3  w-5 h-5 bg-blue-500 rounded-full"></div>
            <div className="cir4 w-5 h-5 bg-green-300 rounded-full"></div>
            <div className="cir5  w-5 h-5 bg-yellow-300 rounded-full"></div>
          </div>
          <h1 className=' text-9xl text-gray-800 font-bold font-RobotoBold '><span className='no'>N</span><span className='no'>o</span><span className='no'>t</span><span className='no'>i</span><span className='no'>o</span><span className='no'>n</span></h1>
        </div>
      </div>
      
      
      <div className='a w-full h-full rounded-lg flex items-center justify-center leading-[] '>
          <div className='z-[3] flex items-center justify-center flex-col w-1/2 h-full  '>
              <div className="text   flex items-start  flex-col mb-6 leading-[.8]">
                <h1 className='up text-[5rem]    font-bold text-gray-800 mb-4'>Start Building With  </h1>
                <h1 className='down text-[5rem] font-bold text-gray-800 mb-4'>The Notion API </h1>
              </div>
              <p className='text-gray-500 mb-6 text-[1.3rem] leading-[1.2]  tracking-tight font-Roboto text-start w-[70%]'>Connect Notion Page And Database to the tool  you use every date, creating powerful workflow.</p>
              <button onClick={()=>{navigator("/folder")}} className='btn bg-orange-500 text-white px-6 py-3 rounded-lg font-Roboto cursor-pointer text-xm font-semibold cursor-pointer'>Get Started</button>
          </div>
          <div className="image w-1/2 h-full flex items-center justify-center">
          <img className='blue opacity-0 absolute w-0 h-0  top-0 right-0 z-[2] ' src="https://www.pikpng.com/pngl/b/273-2731764_blue-stripe-png-circle-clipart.png" alt="" />
          <img className='w-full h-80 z-[3] mr-10 bg-nprepeat' src="https://public-files.gumroad.com/nfd24hlarr0m8yl8zcl8h8ej8pap" alt="" />
          </div>
      </div>

   </main>
   </>
  )
}

export default LandingPage