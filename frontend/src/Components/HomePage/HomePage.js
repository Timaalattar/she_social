import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './HomePage.css'
// import {Link} from 'react-router-dom'

function HomePage() {

  //GOAL - display all events below
  const [EventList, setEventList] = useState([])
  useEffect(() => {
    // STEP 1: API call to our backend (
      // useEffect
      // -> Hook, run immediately when the component renders
      // axios.get(.. ..localhost:4000/Event) -> returns parsed json data
      // STEP 2: Take the tweet list data and store it in our state
      // Take response -> setState(response)
      // event_details_get()
      event_search_get()
    }, [])

// Added for event search 
const event_search_get = () => {
  axios.get('http://localhost:4000/events/:category')
  .then(res => setEventList(res.data))
  .catch(err => console.log(err))
}

    // const event_details_get = () => {
    //   axios.get('http://localhost:4000/events/:eventId')
    //   .then(res => setEventList(res.data))
    //   .catch(err => console.log(err))
    // }
    // STEP 3: Display data in HTML using Event.map .. .. 
   
    // - Form to create event -> onChange, onSubmit, store form data in state, API call
    
    
    
    const [formData, setFormData] = useState({
      Category: ''
     
      }
    )
    const handleChange = (e) => {
      //Store the user input into state
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
    const handleSubmit = (e) => {
      // axios.post(Create a tweet)
      axios.get('http://localhost:4000/events/:category', formData,
      )
      .then(res => console.log(res))
      .then(() =>  event_search_get())
      .catch(err => console.log(err))
    }




  return (
    <div>
<h1>Home Page</h1>
      
<form onSubmit={handleSubmit}>
        <br></br>
        <input name="Category" value={formData.Category} onChange={handleChange} placeholder="Search your event.." /><br></br>
       <br></br>
        <button type="submit">Search</button>
      </form>
      {EventList.length ? EventList.map(event => 
      <div key={event._id}>
        <p>Event Name: {event.EventName}</p>
      </div>
    )
    : null}
      </div>
  )
}

export default HomePage