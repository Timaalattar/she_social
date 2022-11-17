import React, {useState} from 'react'
import {Container, Form, Button} from "react-bootstrap";
import './Signin.css'

export default function Signin(props) {

    const [newUser, setNewUser] = useState({});

    const changeHandler = (e) => {
        const user = { ...newUser };
        user[e.target.name] = e.target.value;
        console.log(user);
        setNewUser(user);
    }

    const loginHandler = () => {
        props.login(newUser)
    }

  return (
    <div>
        <br></br>
        <h1>Sign In</h1>

        <Container className='form-signin-1'>
            <Form.Group className='form-signin'>
                <Form.Label>User Name</Form.Label>
                <Form.Control name="username" onChange={changeHandler} placeholder="User Name"></Form.Control>
            </Form.Group>

            <Form.Group className='form-signin'>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" onChange={changeHandler} placeholder="Password"></Form.Control>
            </Form.Group>

            <br></br>

            <Button  className='submit-btn' variant="primary" onClick={loginHandler}>Login</Button>

        </Container>
        
    </div>
  )
}


