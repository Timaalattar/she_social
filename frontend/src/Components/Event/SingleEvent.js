import React, {useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './EventList.css'
import EventMap from './EventMap'
import {GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api'
import usePlacesAutocomplete, {getGeocode,getLatLng} from 'use-places-autocomplete'


function SingleEvent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDfoQb7_iRMi4sGqqEUa906kxdSIm2LNVk",
    libraries: ["places"]
  })
  

const [singleEvent, setsingleEvent] = useState({})

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
            <br></br><p>Category : {singleEvent.Category}</p>
            <br></br><p>Description: {singleEvent.Description}</p>

            <br></br><p>Location:{singleEvent.Locate}</p>
          
            <Map className="map" lat={singleEvent.lat} lng={singleEvent.lng} />

            {/* <button onClick={confirmationHandler}>Confirmed</button>  */}

      </div>    
  : null} 
  </div>
)
}

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
       zoom={10} center={center} >
        
        <MarkerF position={center}></MarkerF>

      </GoogleMap>

      </>
  )
}

export default SingleEvent