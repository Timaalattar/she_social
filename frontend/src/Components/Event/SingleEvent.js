import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function SingleEvent() {

const [singleEvent, setsingleEvent] = useState({})
const [isConfirmed, setIsConfirmed] = useState(false);

const params = useParams()    

// console.log(params)

useEffect(() => {

  event_details_get()
}, [])
const event_details_get = () => {
axios.get(`http://localhost:4000/events/${params.eventId}`)
  .then(res => setsingleEvent(res.data))


}
return (
  <div>
      {singleEvent ? 
      <div>
        
        <h2>{singleEvent.EventName}</h2>
            <br></br><p>Time: {singleEvent.Time}</p>
            <br></br><p>Date: {singleEvent.Date}</p>
            <br></br><p>Location: {singleEvent.Locate}</p>
            <br></br><p>{singleEvent.Description}</p>

            <button>Confirmed</button> 

      </div>    
  : null} 
  </div>
)
}

export default SingleEvent