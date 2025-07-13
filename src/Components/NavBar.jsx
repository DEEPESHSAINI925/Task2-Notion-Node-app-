import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { CurrentUser, Userlogout } from '../Store/Action/UserAction'

const NavBar = () => {
    const dispatch=useDispatch()
    const [user, setuser] = useState(JSON.parse(localStorage.getItem("User")))
     useEffect(()=>{
        setuser(JSON.parse(localStorage.getItem("User")))
        dispatch(CurrentUser())
      },[])
  return (
    <>
        <nav className='a w-full z-[3] h-20 p-4 bg-white shadow-md rounded-lg flex items-center justify-between'>
                  <div className='flex justify-between items-center w-full h-full'>
                      <div className=' font-bold text-gray-800 flex items-center gap-2'>
                        <img className='w-20 h-full' src="./OIP.webp" alt="" />
                        <h1 className='text-2xl font-bold font-RobotoBold'> Notion</h1>
                      </div>
                      <div className='flex z-[3] items-center gap-6 text-gray-600 font-Roboto font-semibold'>
                        <a href="/" className='hover:text-blue-500'>Home</a>
                        <a href="/*" className='hover:text-blue-500'>Guides</a>
                        <a href="/*" className='hover:text-blue-500'>API Reference</a>
                        <a href="/*" className='hover:text-blue-500'>Changelog</a>
                        <a href="/*" className='hover:text-blue-500'>Example Code </a>
                      </div>
                      {
                        !user?
                        <>
                        <div className='flex z-[3] items-center gap-4'>
                        <button onClick={()=>{window.location.href="/login"}} className='bg-blue-500 text-white px-4 py-2 cursor-pointer rounded text-400 font-Roboto'>Login</button>
                        <button onClick={()=>{window.location.href="/register"}} className='bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer'>Sign Up</button>
                      </div>
                        </>:
                        <>
                        <div className='flex z-[3] items-center gap-4'>
                          <i className="ri-notification-fill text-2xl"></i>
                          <i className="ri-user-3-fill text-2xl"></i>
                          <button onClick={()=>{
                            dispatch(Userlogout())
                            window.location.href="/login"
                            }} ><i className="ri-logout-circle-r-line text-2xl cursor-pointer"></i></button>
                      </div>
                        </>
                      }
                  </div>
              </nav>
    </>
  )
}

export default NavBar