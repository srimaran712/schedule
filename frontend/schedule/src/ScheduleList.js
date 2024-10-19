import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import Spinner from 'react-spinner-material'; //I'm using for fetching api before getting for loading

function ScheduleList() {

    const[scheduleList,setScheduleList]=useState([])
    const [isLoading,setIsLoading]=useState(true)

    const fetchSchedules= async()=>{
        try{
            const response= await axios.get('https://schedule-ctth.onrender.com/schedule')
            setScheduleList(response.data.schedules)
            console.log(response.data.schedules)
            setIsLoading(false)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchSchedules()
    },[scheduleList])
  return (
    <div className="mx-2 mt-2">
        <h2 className="text-md text-black text-center font-bold text-xl">Time Slots</h2>
      {isLoading?       <Spinner radius={120} color={"#333"} stroke={2} visible={true} />:<ul className="grid grid-cols-3 space-x-4 space-y-4">
        {scheduleList.map((schedule)=>{
            return(
                <div key={schedule._id} className="shadow-md bg-white p-4 ">
                   <h2 className="text-lg font-md text-gray-700"> Date:{schedule.date.toLocaleString()}</h2>
                   <h3>Time Slot:{schedule.timeslot}</h3>
                  <h5 className="text-md font-bold">{schedule.isBooked ? `Interview Booked for candidate ${schedule.candidateId.name} and ${schedule.candidateId.email}` : "Available"}</h5>

                </div>
            )
            
        })}
        </ul>}  
        
      
    </div>
  )
}

export default ScheduleList
