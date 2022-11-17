import './App.css';
import NavBar from './Components/NavBar/NavBar'
import ProfilePage from './Components/ProfilePage/ProfilePage'
import EditProfile from './Components/ProfilePage/EditProfile'
import ConfirmedEvents from './Components/ProfilePage/ConfirmedEvents'
import HostedEvents from './Components/ProfilePage/HostedEvents'
import HomePage from './Components/HomePage/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './Components/User/Signup'
import Signin from './Components/User/Signin'
import CreateEvent from './Components/Event/CreateEvent';
import EventList from './Components/Event/EventList';
import SingleEvent from './Components/Event/SingleEvent';
import axios from 'axios';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useParams } from 'react-router-dom'



function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  const params = useParams()

  useEffect(() => {
    let token = localStorage.getItem("token");

    if(token != null){
      let user = jwt_decode(token);
      console.log("useEffect" + user);

      if(user){
        setIsAuth(true);
        setUser(user)
      }
      else if(!user){
        localStorage.removeItem("token");
        setIsAuth(false);
      }
    }
  }, [])
  

  const registerHandler = (user) => {
    axios.post("http://localhost:4000/users", user)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err)
    });
  }

  
  const loginHandler = (cred) => {
    axios.post("http://localhost:4000/users/login", cred)
    .then(res => {
      console.log(res.data.token)

      // Store the token in Local Storage.
      if(res.data.token != null){
        localStorage.setItem("token", res.data.token);
        let user = jwt_decode(res.data.token);
        setIsAuth(true);
        setUser(user);
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const onLogoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
  }

  const confirmationHandler = (confirm) => {
    console.log(params)
    debugger
    axios.post(`http://localhost:4000/events/${params.eventId}/confirmed`, user.user.id)
    .then(() => setIsConfrimed(true))
  }

console.log(user)

  return (
    <Router>
    <NavBar onLogoutHandler={onLogoutHandler} isAuth={isAuth} user={user}/>
    <div className="App">
      <Routes>
        <Route path='/home' element={isAuth ? <HomePage /> : <Signin login={loginHandler}></Signin>} />
        <Route path='/profile/:userId' element={<ProfilePage user={user.user}/>} />
        <Route path='/profile/:userId/Edit' element={<EditProfile />} />
        <Route path='/profile/:userId/Created/' element={<HostedEvents />} />
        <Route path='/profile/:userId/Confirmed' element={<ConfirmedEvents />} />
        <Route path='/events/:eventId' element={<SingleEvent user={user}/>} />
        <Route path='/CreateEvent' element={<CreateEvent />} />
        <Route path='*' element={<HomePage />} />
        <Route path='/events' element={<EventList/>} />
        <Route path="/signup" element={<Signup register={registerHandler}></Signup>}></Route>
        <Route path="/signin" element={isAuth ? <HomePage></HomePage> : <Signin login={loginHandler}></Signin>}></Route>
      </Routes>
    </div>
  </Router>
  );
}

export default App;