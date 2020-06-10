import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
    


    return(
        <div id='navbar'>
            <div id='title' className='nav-element'>
                Rentineer Austin
            </div>
            <NavLink to='/profile'> Profile </NavLink>
        </div>
    )
}