import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {



    return (
        <div id='navbar'>
            <div id='title' className='nav-element'>
                <NavLink id='nav-link' to='/'>Rentineer Austin </NavLink>
            </div>
            <div id="profile-link">
                <NavLink id="nav-link" to='/profile'> Profile </NavLink>
            </div>
        </div>
    )
}