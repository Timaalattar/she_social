import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function SingleEvent() {

const [event, setEvent] = useState({})

const params = useParams()    

console.log(params)

useEffect(() => {
  axios.get(`http://localhost:4000/events/'${params.eventId}`)
  .then(res => setEvent(res.data))
}, [])
return (
  <div>
      {event ? 
      <div>
        
          <p>{event.Date}</p>
          <p>{tweet.Time}</p>
          <p>{event.Locate}</p>
          <p>{event.Category}</p>
          <p>{event.Description}</p>

      </div>    
  : null} 
  </div>
)
}

export default SingleEvent