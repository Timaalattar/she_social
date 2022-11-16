import React, {useState, useMemo} from 'react'
import './EventMap.css'
import {GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import usePlacesAutocomplete, {getGeocode,getLatLng} from 'use-places-autocomplete'
import {Combobox, ComboboxInput, ComboboxPoporer, ComboboxList, ComboboxOption }  from '@headlessui/react'

export default function EventMap(props) {

    // console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
 
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDfoQb7_iRMi4sGqqEUa906kxdSIm2LNVk",
    libraries: ["places"]
  })
  
 
 

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return <Map />
}

function Map(props){
    const center = useMemo(() => ({ lat: 26.1, lng: 50.4}), [])
    const [selected, setSelected] = useState(null)
    if(selected != null){
    console.log(selected);
    localStorage.setItem("lat", selected.lat)
    localStorage.setItem("lng", selected.lng)
    // props.getData(selected) ;
    }


    return (
        <>
        <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
        </div>

        <GoogleMap 
         mapContainerClassName='map-container'
         zoom={10} center={center} >
          
         {selected && <Marker position={selected}></Marker>}

        </GoogleMap>

        </>
    )
}


const PlacesAutocomplete = ({ setSelected}) => {
    const {
        ready,
        value, 
        setValue,
        suggestions: {status, data},
        clearSuggestions,
    } = usePlacesAutocomplete()

    const handleSelect = async  (address) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({address});
        const {lat, lng} = await getLatLng(results[0]);
        setSelected({lat, lng});


    }


    return (
    
        <Combobox onChange={handleSelect}>
        <Combobox.Input value={value} onChange={e =>setValue(e.target.value)} disabled={!ready} placeholder={"Search an address"} />
    
            <Combobox.Options>
            {data.map(e => 
            <ul>
                <Combobox.Option key={e.place_id}  value={e.description}>
                    <li>{e.description}</li>
                </Combobox.Option>
            </ul>
            )}
            </Combobox.Options>
        </Combobox>
    )

}




    
  
