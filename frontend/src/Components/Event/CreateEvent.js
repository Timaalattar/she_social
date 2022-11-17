import React, {useEffect, useState } from 'react'
import { useNavigate} from "react-router-dom";
import axios from 'axios'
import './CreateEvent.css'
import EventMap from './EventMap'



function CreateEvent() {

const navigate = useNavigate()

  
  useEffect(() => {
    
    event_create_post()
   
  }, [])

  const event_create_post = () => {
      const token = localStorage.getItem('token')
      axios.post(`http://localhost:4000/users/events/create`, formData,
      {
        headers: {'Authorization': token}
      })
      .catch(err => console.log(err))
  }
  const [formData, setFormData] = useState({
    EventName: '',
    Date: '',
    Time: '',
    Locate: '',
    lat:'',
    lng:'',
    Category: '',
    Description: ''
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
    e.preventDefault()
    // axios.post(Create an event)
    
    let lat = localStorage.getItem("lat");
    let lng = localStorage.getItem("lng");
    console.log(lat);
    console.log(lng);
    formData['lat'] = lat
    formData['lng'] = lng
    const token = localStorage.getItem('token')
    axios.post('http://localhost:4000/users/events/create', formData, 
    {
      headers: {Authorization: token}
    })
    .then(res => {
      console.log(res)
      event_create_post()
      navigate(`/events`)
    }
      )
    // .then(() => event_create_post())
    // .then(() =>  navigate(`/events`))
    .catch(err => console.log(err))
  }

  const getData = (cor) => {
    console.log(cor);
  }
  return (
    <div>

<form onSubmit={handleSubmit} className='homeform'>
       <br />
       <label>Create your Event </label> <br></br>
        <input  className='input' name="EventName" value={formData.EventName} onChange={handleChange} placeholder="Event Name" /> <br /><br />
        <input  className='input' name="Date" value={formData.Date} onChange={handleChange} placeholder="Date" /> <br /><br />
        <input  className='input' name="Time" value={formData.Time} onChange={handleChange} placeholder="Time" /> <br /><br /> 
        {/* <input  className='input' name="Locate" value={formData.Locate} onChange={handleChange}  placeholder="Locate" /> <br /><br /> */}
        <input  className='input' name="Category" value={formData.Category} onChange={handleChange} placeholder="Category" /> <br /><br />
        <input  className='input' name="Description" value={formData.Description} onChange={handleChange} placeholder="Description" /> <br /><br />
        <div> <EventMap className="map" getData={getData}/> </div> <br /><br /><br /><br />
        <button className='submit' type="submit">Submit</button>
        <br />
      </form>

    </div>
  )
}

export default CreateEvent