import React from 'react';
import MapBox from './MapBox';
import NavBar from './NavBar'
import  "../App.css";



export default function MainContainer() {

    return(
        <div id="main-container">
            <NavBar />
            <div id='map'>
                <MapBox />
            </div>
        </div>
    )
}