import React, {useState} from 'react'
import {Container, Form, Button} from "react-bootstrap";
import './Signup.css'
import { useNavigate,useParams } from "react-router-dom";

// const Navigate = useNavigate();


export default function Signup(props) {

    const [newUser, setNewUser] = useState({});
    // const params = useParams()
    const navigate = useNavigate()
    const changeHandler = (e) => {
        const user = { ...newUser };
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }

    const regsiterHandler = () => {
        props.register(newUser)
        // /profile/${props.user.user.id}
        navigate(`/signin`)
     }

  return (

    <div>
       <br></br>
        <h1>Join She Social today</h1>
    <div>'
        <h1>Signup</h1>


        <Container className='form-signup-1'>
            <Form.Group className='form-signup'>
                <Form.Label> First Name</Form.Label>
                <Form.Control name="FirstName" onChange={changeHandler} placeholder="First Name"></Form.Control>
            </Form.Group>

            <Form.Group className='form-signup'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="LastName" onChange={changeHandler} placeholder="Last Name"></Form.Control>
            </Form.Group>

            <Form.Group className='form-signup'>
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" onChange={changeHandler} placeholder="Username"></Form.Control>
            </Form.Group>

            <Form.Group className='form-signup'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control name="email" onChange={changeHandler} placeholder="Email Address"></Form.Control>
            </Form.Group>

            <Form.Group className='form-signup'>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" onChange={changeHandler} placeholder="Password"></Form.Control>
            </Form.Group>

            <br></br>

            <Button  className='submit-btn' variant="primary" onClick={regsiterHandler}>Register</Button>
            <br></br>
        </Container>
        
    </div>
  )
}
