import React, {useEffect, useState } from 'react'
import axios from 'axios'
import './CreateEvent.css'
import {Image} from "cloudinary-react"

function CreateEvent() {
  useEffect(() => {
    
    event_create_post()
    }, [])

    const event_create_post = () => {
      const token = localStorage.getItem('token')
      axios.post(`http://localhost:4000/users/events`,
      {
        headers: {Authorization: token}
      })
      .catch(err => console.log(err))
    }
  const [formData, setFormData] = useState({
    EventName: '',
    Date: '',
    Time: '',
    Locate: '',
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
    // axios.post(Create a tweet)
    const token = localStorage.getItem('token')
    axios.post('http://localhost:4000/users/events/create', formData, 
    {
      headers: {Authorization: token}
    })
    .then(res => console.log(res))
    .then(() => event_create_post())
    .catch(err => console.log(err))
  }

  
//upload image
const [imageSelected, setImageSelected]=useState("")
const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

const handleSubmitFile = () => {
  if (!previewSource) return;
  uploadImage(previewSource);
};

const uploadImage = async (base64EncodedImage) => {
  try {
    await fetch(`http://localhost:4000/api/upload`, {
      method: "POST",
      body: JSON.stringify({ data: base64EncodedImage }),
      headers: { "Content-type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
};


// const uploadImage = ()=> {
//   // console.log(files[0]);
//  const formData= new FormData()
//  formData.append("file", imageSelected)
//  formData.append('upload-preset', "dgw4mungp")
//  axios.post("http://api.cloudinary.com/v1_1/dgw4mungp/image/upload", formData)
// .then((Response)=>{
//   console.log(Response)
//  });
// };

  return (
    <>
    
    <div>

<form onSubmit={handleSubmit} className='homeform'>
       <br />
       <label>Create your Event </label> <br></br>
        <input  className='input' name="EventName" value={formData.EventName} onChange={handleChange} placeholder="Event Name" /> <br /><br />
        <input  className='input' name="Date" value={formData.Date} onChange={handleChange} placeholder="Date" /> <br /><br />
        <input  className='input' name="Time" value={formData.Time} onChange={handleChange} placeholder="Time" /> <br /><br />
        <input  className='input' name="Locate" value={formData.Locate} onChange={handleChange} placeholder="Locate" /> <br /><br />
        <input  className='input' name="Category" value={formData.Category} onChange={handleChange} placeholder="Category" /> <br /><br />
        <input  className='input' name="Description" value={formData.Description} onChange={handleChange} placeholder="Description" /> <br /><br />
        <button className='submit' type="submit">Submit</button>
        <br />
      </form>

    </div>
    <div>
      {/* <input
       type="file" 
       onChange={(event) =>{
      setImageSelected(event.target.files[0])}} />
        <button onClick={handleSubmitFile}>upload Image</button> */}

       {/* <Image style={{width:200}} cloudName="e5wupgul"
       publicId=""
       />
        // */}
         

         
         <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                <button className="btn" type="submit" cloudName="e5wupgul">
                    Submit
                </button>
            </form>
            {previewSource && (
                <img 
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}

    </div>
    </>
  )
}

export default CreateEvent