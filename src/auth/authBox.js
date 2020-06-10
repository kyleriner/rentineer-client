import React, {useState} from "react";
import Login from './login'
import SignUp from './signup'


export default function AuthBox() {

    const [authSwap, setAuthSwap] = useState(true)




    return(
        <div>
            {authSwap ? <Login/> : <SignUp/>}
            <button onClick={() => setAuthSwap(!authSwap)}>
                {authSwap ? 'Sign up' : 'Log In'}
            </button>
        </div>
    )

}