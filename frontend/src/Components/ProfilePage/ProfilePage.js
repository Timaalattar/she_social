import React from 'react'
import './ProfilePage.css'
import { Link } from 'react-router-dom'


function ProfilePage(props) {
  // console.log(props)
  return (
    <>
      <div>
      <ul className="profilenavbar">
      <li><Link to={`/profile/${props.user.id}/Edit`}>Edit Profile</Link></li>
      <li><Link to="/profile/createdevents">Hosted Events</Link></li>
      <li><Link to="/profile/confirmedevents">Confrimed Events</Link></li>
      </ul>
    </div>
    </>

  )
}

export default ProfilePage;
