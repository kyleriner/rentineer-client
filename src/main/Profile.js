import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {logout} from '../index'
import NavBar from './NavBar'
import { Button, Form } from "react-bootstrap";





export default function Profile() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const [user, setUser] = useState('')

    useEffect(() => {
        let bearer = 'Bearer ' + localStorage.getItem('userToken')
        fetch('http://localhost:3001/api/v1/profile', {headers: {Authorization: bearer}})
        .then(function(response) {
            return response.json()
        })
        .then(function(json){
            setUser(json.username)
        })
    }, [])

    function deleteUser() {
        let bearer = 'Bearer ' + localStorage.getItem('userToken');
        fetch('http://localhost:3001/api/v1/profile', {method: 'DELETE', headers: {Authorization: bearer}});
        localStorage.clear();
        dispatch(logout());
    }
    
    function handleSubmit(event) {
        event.preventDefault();

        let bearer = 'Bearer ' + localStorage.getItem('userToken');

        let updateObj = {
            method: "PATCH",
            headers: {
                "Authorization": bearer,
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, 
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
            }})
        }

        
        fetch('http://localhost:3001/api/v1/profile', updateObj);

        setUser(username)

    }

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleLogout() {
        localStorage.clear();
        dispatch(logout());
    }

    return(
        <div>
            <NavBar/>
            <div id="auth">
            <div> Hello {user} </div>
            <br></br>
            

            <form onSubmit={handleSubmit}>
                <Form.Group>
                Change Username:

                    <Form.Control
                        autoFocus
                        type='username'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        />
                </Form.Group>
                <br></br>
                Change Password:

                <Form.Group >
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                </Form.Group>
                <br></br>
                <Button className = 'auth-button' block disabled={!validateForm()} type="submit">
                    Update Profile
                </Button>
            </form>
            <br></br>


            <button className="auth-button" onClick={handleLogout}> Log Out </button>

            <button className="delete-button auth-button" onClick={deleteUser}>Delete Profile</button>
            </div>
        </div>
        
    )
}