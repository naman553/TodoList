import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

// import router from '../../../backend/route/todo.route'
const signup = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigateTo=useNavigate()


  const handleRegistration=async(e)=>{
    e.preventDefault()

    try {
      const {data} =await axios.post("http://localhost:4001/user/signup",{
        username,
        email,
        password
      },{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })
      console.log(data)
      toast.success(data.message || "user registered successfully")
      localStorage.setItem("jwt" , data.user.token)
      navigateTo("/login")
      setUsername("")
      setEmail("")
      setPassword("")
    } catch (error) {
      toast.error(error.response.data.errors || "user registration failed")
      console.log(error)
    }
  }

  return (
    <div className='flex items-center h-screen justify-center bg-gray-100'>
      <div className='w-full p-8 bg-white rounded-lg shadow-lg max-w-md'>
        <h2 className='font-semibold text-2xl mb-5 text-center'>SignUp</h2>
        <form onSubmit={handleRegistration}>

          <div className='mb-4'>
            <label htmlFor="username" className='mb-2 font-semibold block'>Username</label>
            <input type="text" placeholder='Enter your username' id='username' value={username} onChange={(e)=>setUsername(e.target.value)} className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 duration-200'/>
          </div>

          <div className='mb-4'>
            <label htmlFor="email" className='mb-2 font-semibold block'>Email Id</label>
            <input type="text" placeholder='Enter your Email Id' id='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 duration-200'/>
          </div>
          
          <div className='mb-4'>
            <label htmlFor="password" className='mb-2 font-semibold block'>Password</label>
            <input type="password" placeholder='Create password' id='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 duration-200'/>
          </div>
        <button type='submit' className='text-white p-3 bg-blue-600 w-full hover:bg-blue-800 duration-300 rounded-xl font-semibold'>SignUp</button>
      <p className='text-center text-gray-600 mt-4'>Already have an account? <Link to={"/login"} className='text-blue-600  hover:underline'>SignIn</Link></p>
        </form>

      </div>
    </div>
  )
}

export default signup
