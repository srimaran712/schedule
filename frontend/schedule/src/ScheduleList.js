import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'

function ScheduleList() {

    const[scheduleList,setScheduleList]=useState([])

    const fetchSchedules= async()=>{
        try{
            const response= await axios.get('http://localhost:8080/schedule')
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
    <div>
        <ul className="grid grid-cols-3 space-x-2 space-y-4">
        {scheduleList.map((schedule)=>{
            return(
                <div key={schedule._id} className="shadow-md bg-gray-50 p-2 ">
                   <h2>{schedule.date}</h2>
                   <h3>{schedule.timeslot}</h3>
                  <h5>{schedule.isBooked ? `Booked by ${schedule.candidateId.name}` : "Available"}</h5>

                </div>
            )
            
        })}
        </ul>
        
      
    </div>
  )
}

export default ScheduleList
