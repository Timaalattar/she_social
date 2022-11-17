import React, {useState} from 'react'
import {Container, Form, Button} from "react-bootstrap";
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
    <div>'
        <h1>Signup</h1>

        <Container>
            <Form.Group>
                <Form.Label> First Name</Form.Label>
                <Form.Control name="FirstName" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="LastName" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control name="email" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" onChange={changeHandler}></Form.Control>
            </Form.Group>

            <br></br>

            <Button variant="primary" onClick={regsiterHandler}>Register</Button>

        </Container>
        
    </div>
  )
}
