import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from 'react-redux'
import {login} from '../index'


export default function Login() {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passConf, setPassConf] = useState('')


    async function handleSubmit(event) {
        event.preventDefault();

        if (password === passConf) try {
            let UserLoginObj = {
                method: "POST",
                headers: {
                   "Content-Type": "application/json",
                    "Accept": "application/json"
                },
              
                body: JSON.stringify({
                    user: {
                   username: username,
                   password: password
                    }
                })
              };

            await fetch('http://localhost:3001/api/v1/users', UserLoginObj)
            .then(function(response) {
                return response.json()
            })
            .then(function(json) {
                window.localStorage.clear()
                window.localStorage.setItem('userToken', json.jwt)
                window.localStorage.setItem('user', json.user.username)
                dispatch(login())
            })



            alert('Logged in!')
        } catch (e) {
            alert(e.message)
        }
      }

    function validateForm() {
        return username.length > 0 && password.length > 0 && passConf.length > 0
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <Form.Group>
                    Username
                    <Form.Control
                        autoFocus
                        type='username'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        />
                </Form.Group>
                <br></br>
                <Form.Group>
                    Password
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                </Form.Group>
                <br></br>
                <Form.Group>
                    Confirm Password
                    <Form.Control
                        type="password"
                        value={passConf}
                        onChange={e => setPassConf(e.target.value)}
                        />
                </Form.Group>
                <br></br>
                <Button className="auth-button" block disabled={!validateForm()} type="submit">
                    Sign Up
                </Button>
            </form>
        </div>
    )
}