import React, {useState, useEffect, useMemo} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' 
import { Route , NavLink} from 'react-router-dom'
import axios from 'axios'
import './ProfilePage.css'
import {GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'
import { useParams } from 'react-router-dom'
import usePlacesAutocomplete, {getGeocode,getLatLng} from 'use-places-autocomplete'




function HostedEvents() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDfoQb7_iRMi4sGqqEUa906kxdSIm2LNVk",
    libraries: ["places"]
  })
  
const params = useParams()

    
  const [user, setUser] = useState([])
    useEffect(()=> {
        user_confirmation_get()
      
  }, [])
    
    const user_confirmation_get = () => {

        axios.get(`http://localhost:4000/users/${params.userId}/events`)
   
        .then(res =>{
            console.log(res.data)
        setUser(res.data)
    })
        .catch(err => console.log(err))
      }
 
    return (
    <div>
   {/* {eventsList.length ? eventsList.map(user =>  */}
{/* //    {eventsList.length ? eventsList.map(user =>  */}

          <div className='created-event-container' key={user._id}>
             <br></br><p>Hosted By : {user.username}</p>'
             {user.Event ? user.Event.map(event => 
        <div className="user-event-container" key={event._id}>
            <h2>{event.EventName}</h2>
            <br></br><p>Time : {event.Time}</p>
            <br></br><p>Date : {event.Date}</p>
            <br></br><p>Location : {event.Locate}</p>
            <Map lat={event.lat} lng={event.lng} />
            <br></br><p>Category : {event.Category}</p>
            <br></br><p>Description : {event.Description}</p>
                {/* <button>View</button> */}
            <NavLink to={`/events/${event._id}`} >View</NavLink>
             
            </div>
                  ) : null}
        </div>
      </div>
      )
  }

// 26.2171906, 50.1971381
function Map(props){
  console.log(props)
  let lat = parseFloat(props.lat);
  let lng = parseFloat(props.lng);
  console.log(lat);
  console.log(lng);
  const center = useMemo(() => ({ lat: lat, lng: lng}), [])
  const [selected, setSelected] = useState(null)
  console.log(selected);
  // localStorage.setItem("lat", selected.lat)
  // localStorage.setItem("lng", selected.lng)
  // props.getData(selected) ;


  return (
      <>
      {/* <div className="places-container">
      <PlacesAutocomplete setSelected={setSelected} />
      </div> */}

      <GoogleMap 
       mapContainerClassName='map-container'
       zoom={15} center={center} >
        
        <MarkerF position={center}></MarkerF>

      </GoogleMap>

      </>
  )
}

export default HostedEvents