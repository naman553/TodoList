import React, { useEffect, useState } from 'react'
import axios from 'axios'


import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Home = () => {
  const [todos, setTodos] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newTodo, setNewTodo] = useState("")
  const navigateTo=useNavigate()

  useEffect(() => {
    const fetchtodos = async()=>{
try {
  setLoading(true)
  const response = await axios.get("http://localhost:4001/todo/fetch" ,{
    withCredentials:true,
    headers:{
      "Content-Type":"application/json"
    }
  })
  console.log(response.data.todos)
  setTodos(response.data.todos)
  setError(null)
} catch (error) {
  setError("failed to fetch todos")
} finally{
  setLoading(false)
}
    }
  fetchtodos()
  }, [])
  

  const todoCreate = async () => {
    if(!newTodo){
      return;
    }
    try {
      const response = await axios.post("http://localhost:4001/todo/create", {
        text:newTodo,
        completed:false
      },{
        withCredentials:true
      })
      setTodos([...todos, response.data.newTodo])
      setNewTodo("")
    } catch (error) {
      setError("Failed creating new todo")
    }
  }


const todoStatus = async (id)=>{
  const todo = todos.find((t)=>t._id===id)
  try {
    const response = await axios.put(`http://localhost:4001/todo/update/${id}` , {
      ...todo,
      completed:!todo.completed
    },
    {
      withCredentials:true
    }
    )
    setTodos(todos.map((t)=>t._id===id?response.data.todo:t))
  } catch (error) {
    setError("failed to find todo status")
  }
}


const todoDelete = async (id)=>{
  try {
    await axios.delete(`http://localhost:4001/todo/delete/${id}`, {withCredentials:true})
    setTodos(todos.filter((t)=>t._id!==id))
  } catch (error) {
    setError("Failed to delete todo")
  }

}

const logout = async()=>{
  try {
    await axios.get("http://localhost:4001/user/logout" ,{
      withCredentials:true,
    })
    toast.success("logged out successfully");
    localStorage.removeItem("jwt");
    navigateTo("/login")   
  } catch (error) {
    toast.error("error logging out")
  }
}

const Remaining = todos.filter((todo)=>!todo.completed).length;


  return (
    <>
    <div className='my-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-xl shadow-neutral-400 mx-8 sm:mx-auto p-6'>
      <h1 className='text-2xl font-semibold text-center'>Todo App</h1>
      <div className='mb-4 flex'>
        <input type="text" placeholder='Add a new todo' 
        className='flex-grow p-2 rounded-l-md focus:outline-none' 
        value={newTodo} 
        onChange={(e)=>setNewTodo(e.target.value)}  
        onKeyPress={(e)=>e.key==='Enter' && todoCreate()}/>

        <button className='bg-blue-600 border rounded-r-md text-white hover:bg-blue-900 duration-300 py-2 px-4' onClick={todoCreate}>Add</button>
        
      </div>

    {loading?(<div className='text-center justify-center'><span className='text-gray-500'>loading...</span></div>):error?(<div className='text-center text-red-600 font-semibold'>{error}</div>):(
    
      <ul className='space-y-2'>
        
    {todos.map((todo) =>{
      return(
      <li key={todo._id} className='flex justify-between items-center p-3 bg-gray-100 rounded-md'>
          <div className='flex items-center'>
            <input type="checkbox" checked={todo.completed} onChange={()=>todoStatus(todo._id)} className='mr-2'/>
            <span className={`text-gray-800 font-semibold  ${todo.completed?"line-through":""}`}>{todo.text}</span>
          </div>
          <button onClick={()=>{todoDelete(todo._id)}} className='text-red-500 hover:text-red-800 duration-300'>Delete</button>
        </li> 
    )})}

      </ul>
    )}


      <p className='mt-4 text-center text-sm text-gray-700'>{Remaining} {Remaining>0?"Todos remaining" : "Todo remaining"}</p>
      <button onClick={()=>logout()} className='mt-6 px-4 py-2 bg-red-500 text-white rounded-md mx-auto hover:bg-red-800 duration-500 block'>Logout</button>
    </div>
    </>
  )
}

export default Home