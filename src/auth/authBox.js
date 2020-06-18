import React, {useState} from "react";
import Login from './login'
import SignUp from './signup'
import NavBar from '../main/NavBar'


export default function AuthBox() {

    const [authSwap, setAuthSwap] = useState(true)




    return(
        <div>
            <NavBar/>
            <div id='auth'>
                {authSwap ? <Login/> : <SignUp/>}
                <br></br>
                <button className="auth-button" onClick={() => setAuthSwap(!authSwap)}>
                    {authSwap ? 'Switch to Signup' : 'Switch to Login'}
                </button>
            </div>
        </div>
    )

}