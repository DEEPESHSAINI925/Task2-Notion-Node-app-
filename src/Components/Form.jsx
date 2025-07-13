import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserLogin, UserRegister } from '../Store/Action/UserAction'
import { toast } from 'react-toastify'
import { nanoid } from '@reduxjs/toolkit'

export const LoginForm = () => {
    const navigator=useNavigate()
      const dispatch =useDispatch()
      const {register,handleSubmit,reset}=useForm()
      const submit=async(data)=>{
        const res=await dispatch(UserLogin(data))
        if(res){
              toast.success("User Login Successfully")
              setTimeout(()=>{
              navigator('/')
            },1000)
            }
        reset()
      }
  return (
    <>
          <form onSubmit={handleSubmit(submit)} className="loginPage w-[30vw] h-[40vh] border-1 border-gray-300 rounded-lg shadow-md flex flex-col  p-5 gap-5 ">
        <h1 className='text-[2rem] font-bold tracking-trighter text-center '>Login Page</h1>
       <div className="email">
         <h3 className='text-xm font-semibold mb-1'>Email</h3>
        <input {...register("email")} className='w-full h-10 rounded-lg outline-none border-1 border-gray-200 p-3 placeholder:pl-2 ' placeholder='Email' type="email" name="email" id="" />
       </div>
       <div className="password">
         <h3 className='text-xm font-semibold mb-1'>Password</h3>
        <input {...register("password")} className='w-full h-10 rounded-lg outline-none border-1 border-gray-200 p-3 placeholder:pl-2  ' placeholder='Password'  type="password" name="password" id="" />
       </div>
        <button className='w-20 bg-blue-400 text-xm p-2 rounded-lg font-bold text-white ml-60 cursor-Pointer ' type="submit">submit</button>
      </form>
    </>
  )
}

export const RegisterForm=()=>{
     const navigator=useNavigate()
  const dispatch =useDispatch()
  const {register,handleSubmit,reset}=useForm()
  const submit=async(data)=>{
    console.log(data)
    data.id=nanoid()
    data.folder=[]
    const res=await dispatch(UserRegister(data))
    if(res){
      toast.success("User Register Successfully")
    setTimeout(()=>{
      navigator('/login')
    },5000)
    }
    reset()
  }
    return (
        <>
            <form onSubmit={handleSubmit(submit)} className="loginPage w-[30vw] h-[40vh] border-1 border-gray-300 rounded-lg shadow-md flex flex-col  p-5 gap-5 ">
        <h1 className='text-[2rem] font-bold tracking-trighter text-center '>Register Page</h1>
       <div className="email">
         <h3 className='text-xm font-semibold mb-1'>Email</h3>
        <input {...register("email")} className='w-full h-10 p-3 rounded-lg outline-none border-1 border-gray-200 placeholder:pl-2 ' placeholder='Email' type="email" name="email" id="" />
       </div>
       <div className="password">
         <h3 className='text-xm font-semibold mb-1'>Password</h3>
        <input {...register("password")} className='w-full h-10 p-3 rounded-lg outline-none border-1 border-gray-200 placeholder:pl-2 ' placeholder='Password'  type="password" name="password" id="" />
       </div>
        <button className='w-20 bg-blue-400 text-xm p-2 rounded-lg font-bold text-white ml-60 cursor-pointer ' type="submit">submit</button>
      </form>
        </>
    )
} 
