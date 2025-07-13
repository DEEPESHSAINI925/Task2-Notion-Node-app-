import React, { useState } from 'react'
import "./edt.css"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useDispatch } from 'react-redux'
import { UpdateUser } from '../Store/Action/UserAction'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'
import { set } from 'react-hook-form'
const Folders = () => {
  const [isactive, setisactive] = useState(true)
  const Navigator=useNavigate()
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("User")))
  const dispatch =useDispatch()
  useGSAP(() => {
    const t1=gsap.timeline()
    t1.to(".main",{
      opacity:1,
      duration:1
    })
  })
  const [active, setactive] = useState(false)
  const [URL, setURL] = useState("")
  const [tittle, settittle] = useState("")
  const [currentPosition, setcurrentPosition] = useState("node app")
  const submitHandler=async(e)=>{
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("User"));
    // Always get the latest user data from localStorage, and clone the folder array to avoid mutation issues
    const folders = Array.isArray(user.folder) ? [...user.folder] : [];
    folders.push({
      id:nanoid,
      URL,
      tittle,
      description: ""
    });
    const updatedUser = { ...user, folder: folders };
    const res = await dispatch(UpdateUser(user.id, updatedUser));
    if (res) {
      toast.success("folder is created ");
      setactive(false);
      // Update localStorage with the new user data
      localStorage.setItem("User", JSON.stringify(updatedUser));
    } else {
      toast.error("folder is not created ");
    }
    setURL("");
    settittle("");
  }
  
  return (
    <>
      <div className="main opacity-0 w-full h-screen bg-black ">
          
              <div  className={`upper w-full h-full absolute flex items-center justify-center ${active?"z-[5]":"z-[0]"}  `}>
                <div className="createFolder w-[30%] h-60 rounded-lg shadow-lg  bg-gray-300 relative hover:scale-[1.1] cursor-pointer p-5">
                  <h1 onClick={()=>{setactive(false)}} className='text-xl absolute right-5 top-1'>X</h1>
                  <h1 className='text-xl text-900 text-black font-bold text-center mt-2 font-Roboto'>Create Folder</h1>
                  <h1>URL:</h1>
                  <input value={URL} onChange={(e)=>{setURL(e.target.value)}} className='w-full h-10 border-gray-500 border-1 rounded-md p-2' type="text" />
                  <h1>Tittle Name:</h1>
                  <input value={tittle} onChange={(e)=>{settittle(e.target.value)}} className='w-full h-10 border-gray-500 border-1 rounded-md p-2' type="text" />
                  <button onClick={(e)=>{
                    submitHandler(e)
                  }} className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer mt-2 ml-55'>Submit</button>
                </div>

              </div>
            <div className="middleSection w-full h-full flex items-start justify-start relative  ">
              <div  className="part1 w-50 h-[93vh] bg-gray-600  flex p-5 -items-center gap-4 justify-start flex-col">
                <div onClick={()=>{
                  setcurrentPosition("node app")
                }} className={`box px-3 py-2  rounded-lg ${currentPosition==="node app"?"bg-blue-500":""}`}><h1 className='text-[1.1rem] font-semibold text-white cursor-pointer '><i className="ri-arrow-right-line "></i> Note Folder </h1></div>
                <div onClick={()=>{
                  setcurrentPosition("TodoList")
                }} className={`box px-3 py-2  rounded-lg ${currentPosition==="TodoList"?"bg-blue-500":""}`}><h1 className='text-[1.2rem] font-semibold text-white cursor-pointer '><i className="ri-arrow-right-line "></i> TodoList </h1></div>
              </div>
              <div className="part2 flex-grow h-[93vh] bg-blue-100 grid grid-cols-7 gap-x-8 gap-y-12 p-5 items-start">
                {
                  currentPosition=="node app"?
                  <>
                  <div onClick={()=>{ setactive(true)}} className="createFolder flex items-center justify-center flex-col ml-10 rounded-lg shadow-lg w-50 h-60 bg-gray-700 relative hover:scale-[1.1] cursor-pointer">
                  <i className="ri-add-large-line  text-[7rem] text-white"></i>
                  <h1 className='text-xl  text-900 text-white font-Roboto'>Create Folder</h1>
                </div>
                {
                  user?.folder.map((data) => {
                    // console.log(data.URL)
                    return (
                      <div
                        key={data.id}
                        onClick={() => { Navigator(`/main/${data.id}`) }}
                        className={`createFolder ml-10 rounded-lg shadow-lg w-40 h-50 relative hover:scale-[1.1] cursor-pointer ${data.URL ? `bg-[url('${data.URL}')]` : "bg-gray-700"}`}
                      >
                        <div className="img w-full h-40">
                          {/* <img className='w-full h-full object-cover rounded-lg' src={data.URL} alt="" /> */}
                          <img className='w-full h-full object-cover rounded-lg' src={data.URL} alt="" />
                        </div>
                        <h1 className='text-xl text-center font-semibold text-black text-900 pt-2 font-Roboto'>{data.tittle}</h1>
                      </div>
                    );
                  })
                }
                  </>
                  :
                  <>
                  {/* create Todolist */}
                  <div  className={`upper w-full z-[100] h-full absolute flex items-center justify-center ${isactive?"hidden":""}  `}>
                    <div className="createFolder w-[32%] h-70 rounded-lg shadow-lg  bg-gray-300 relative hover:scale-[1.1] cursor-pointer p-5">
                      <h1 onClick={()=>{setisactive(true)}} className='text-xl absolute right-5 top-1'>X</h1>
                      <h1 className='text-xl text-900 text-black font-bold text-center mt-2 font-Roboto'>Create TodoList</h1>
                      <h1>Task:</h1>
                      <input value={URL} onChange={(e)=>{setURL(e.target.value)}} className='w-full h-10 border-gray-500 border-1 rounded-md p-2 mb-1' type="text" />
                      <h1>Main Points:</h1>
                      <input value={tittle} onChange={(e)=>{settittle(e.target.value)}} className='w-full h-10 border-gray-500 border-1 rounded-md p-2' type="text" />
                      <button onClick={()=>{
                        setisactive(false)
                      }} className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer mt-5 ml-60'>Create Todo </button>
                    </div>
                  </div>
                  <div onClick={()=>{ setisactive(false)}} className="createFolder flex items-center justify-center flex-col ml-10 rounded-lg shadow-lg w-50 h-60 bg-gray-700 relative hover:scale-[1.1] cursor-pointer">
                    <i className="ri-add-large-line  text-[7rem] text-white"></i>
                    <h1 className='text-xl  text-900 text-white font-Roboto'>Create TodoList</h1>
                  </div>
                   {
                    user?.todolist?.map((data)=>{
                      return (
                    <div className={`w-60  relative p-2 overflow-hidden card ml-6 rounded-lg shadow-lg flex   flex-col hover:scale-[1.01] ${data.completed?"bg-green-500":"bg-red-500 text-white"}`}>
                      <h1 className=' w-full text-xl font-bold'>Task:<span className='text-sm font-semibold'>{`${data.task}`} </span></h1>
                      <h1 className='text-xm font-bold '>Main Points:<span className='text-sm leading-none tracking-tight font-semibold'>{`${data.description.slice(0,10)} ...more`}</span></h1>
                      <button  className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer mt-2'>completed </button>
                    </div>
                      )
                    })
                   }
                  </>
                }
              </div>
            </div>
      </div>
    </>
  )
}

export default Folders