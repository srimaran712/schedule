import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'

function ScheduleList() {

    const[scheduleList,setScheduleList]=useState([])

    const fetchSchedules= async()=>{
        try{
            const response= await axios.get('https://schedule-ctth.onrender.com/schedule')
            setScheduleList(response.data.schedules)
            console.log(response.data.schedules)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchSchedules()
    },[scheduleList])
  return (
    <div className="mx-2 mt-2">
        <ul className="grid grid-cols-3 space-x-4 space-y-4">
        {scheduleList.map((schedule)=>{
            return(
                <div key={schedule._id} className="shadow-md bg-gray-50 p-2 ">
                   <h2>{schedule.date.toLocaleString()}</h2>
                   <h3>{schedule.timeslot}</h3>
                  <h5 className="text-md font-bold">{schedule.isBooked ? `Interview Booked for candidate ${schedule.candidateId.name} and ${schedule.candidateId.email}` : "Available"}</h5>

                </div>
            )
            
        })}
        </ul>
        
      
    </div>
  )
}

export default ScheduleList
