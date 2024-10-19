import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function CandidateForm() {
    const [username,setUserName]=useState('')
    const [email,setEmail]=useState('')
    const [result,setResult]=useState('')


    const handleSubmit=async(e)=>{
        e.preventDefault()

        try{
            const response= await axios.post('http://localhost:8080/candidate',{username,email})
            console.log(response.data)
            setResult(response.data.result)
            toast(response.data.message)
            console.log(response.data.result)

            setTimeout(()=>{
                setEmail('')
                setUserName('')
            },2000)

        }catch(error){
            console.log(error)
        }
    }
  return (
    <div className="flex flex-col justify-center items-center">
        <ToastContainer/>
      
      <form onSubmit={handleSubmit} className="w-1/2 border-2 py-2 px-2 bg-gray-100">
        <label htmlFor="candidate Name" >Candidate Name</label>
        <input type="text" value={username} onChange={(e)=>setUserName(e.target.value)} className="m-4"/><br/>
        <label htmlFor="email">Candidate email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="m-4"/><br/>

        <button type="submit" className="bg-blue-500 text-white text-md font-semibold py-2 px-2">add Candidate</button>
      </form>
    </div>
  )
}

export default CandidateForm
