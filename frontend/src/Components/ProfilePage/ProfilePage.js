import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './EditProfile'
import './UserEventList'
import './EventAttendees'
import axios from 'axios'
import './ProfilePage.css'
import {useParams} from 'react-router-dom'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';




function ProfilePage() {

  const [userDetails, setUserDetails] = useState([])

    const params = useParams()
  console.log('params', params)
  useEffect(() => {
    user_details_get()
}, [])

const user_details_get = () => {
  axios.get(`http://localhost:4000/users/${params.userId}`)
  .then(res => {
    console.log(res.data)
    setUserDetails(res.data)
  })
  .catch(err => console.log(err))
}

const user_update_put= () => {
  axios.put(`http://localhost:4000/users/${params.userId}`)
  .then(res => user_update_put(res.data))
  .catch(err => console.log(err))
}
const [formData, setFormData] = useState({
  
    FirstName: '',
    LastName: '',
    username:'',
    email:''
  
  }
)

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  })
}

const handleSubmit = (e) => {
  e.preventDefault()
  axios.put(`http://localhost:4000/users/${params.userId}`, formData)
  .then(res => console.log(res))
  // .then(() => user_update_put())
  .then(() => user_details_get() )
  .catch(err => console.log(err))
}

  return (
    
      <div>
  
      <div>
        <p>Hello {userDetails.FirstName}</p>
        <p>{userDetails.username}</p>
        
      </div>

        <div className='profilecontainer' >
        <form onSubmit={handleSubmit}>
          <label>Edit Profile</label><br></br>
          <input name="FirstName" value={formData.FirstName} onChange={handleChange} placeholder="First Name" /><br></br>
          <input name="LastName" value={formData.LastName} onChange={handleChange} placeholder="Last Name" /><br></br>
          <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" /><br></br>
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" /><br></br>
          <button type="submit">Edit Profile</button>
        </form>
        </div>
    


      {/* <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5">{userDetails.FirstName}</MDBTypography>
                  <MDBCardText>{userDetails.username}</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Profile</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">info@example.com</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">123 456 789</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">info@example.com</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">123 456 789</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section> */}
    </div>
  )
}

export default ProfilePage