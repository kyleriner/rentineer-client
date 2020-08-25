import React, { useState } from 'react';
import MapBox from './MapBox';
import NavBar from './NavBar';
import SideBar from './SideBar';
import "../App.css";



export default function MainContainer() {

    const [aptInfo, setAptInfo] = useState({})
    const getAptInfo = (id) => getApartment(id)

    function getApartment(id) {
        fetch(`http://localhost:3001/api/v1/properties/${id}`, { headers: { "Authorization": 'Bearer ' + localStorage.getItem('userToken') } })
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                setAptInfo(json)
            })
    }

    return (
        <div id="main-container">
            <NavBar />
            <div id='map'>
                <MapBox getAptInfo={getAptInfo} />
            </div>
            <SideBar aptInfo={aptInfo} />
        </div>
    )
}