import React, {useState, useEffect} from 'react'
import ImageDisplay from './ImageDisplay'

export default function SideBar(props) {

    const [fav, setFav] = useState()

    const id = props.aptInfo.id || 0
    let name = ''
    let address = ''
    let price_min = props.aptInfo.price_min
    let price_max = props.aptInfo.price_max
    let apartments = props.aptInfo.apartments
    let cats = props.aptInfo.cat_friendly
    let dogs = props.aptInfo.dog_friendly

    useEffect(() => {
        fetch(`http://localhost:3001/api/v1/is_fav/${id}`, {headers: {"Authorization": 'Bearer ' + localStorage.getItem('userToken')}})
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            setFav(json)
            if (fav) {
                document.getElementById('fav-button').textContent = 'Remove from Favorites'
            } else {
                document.getElementById('fav-button').textContent = 'Add to Favorites'
            }
        })
    }, [])

    
    

    try {
        if (props.aptInfo.address.length > 1) {
            document.getElementById('welcome-text').remove();
            document.getElementById('sidebar').style.visibility = 'visible'
        }
    } catch (error) {
        
    }
    

    if (price_min === null) {
        price_min = apartments[0].price
        price_max = apartments[0].price
        for (let x = 0; x < props.aptInfo.apartments.length; x++ ) {
            if (apartments[x].price < price_min) {
                price_min = apartments[x].price
            }
            if (apartments[x].price > price_max) {
                price_max = apartments[x].price
            }
        }
    }

    if (props.aptInfo.name === null) {
        name = props.aptInfo.address
        address = 'Austin, TX ' + props.aptInfo.zip
    } else {
        name = props.aptInfo.name
        address = props.aptInfo.address + ', Austin, Tx ' + props.aptInfo.zip
    }

    if (price_min === null) {
        price_min = 0
        price_max = 0
    }

    if (cats) {
        cats = "Cat Friendly!"
    } else {
        cats = "Not Cat Friendly."
    }
    if (dogs) {
        dogs = "Dog Friendly!"
    } else {
        dogs = "Not Dog Friendly."
    }

    function favorite() {
        fetch(`http://localhost:3001/api/v1/fav_toggle/${id}`, {headers: {"Authorization": 'Bearer ' + localStorage.getItem('userToken')}})
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            setFav(json)
            if (json) {
                document.getElementById(id).className = 'fav-marker'
            } else {
                document.getElementById(id).className = 'marker'
            }
        })



    }


    return(
        <div id="sidebar-placeholder">
            <div id='welcome-text'>
                Welcome to Rentineer Austin. Select a marker on the map to view an apartment.
            </div>
            <div id='sidebar'>
                <div id="prop-name">
                {name}
                
                <br></br>
                {address}
                </div>
                <button id="fav-button" onClick={favorite}></button>
                <br></br>
                <div id="prop-price">
                ${price_min} - ${price_max}
                </div>
                <p id ="prop-animals">
                    {cats}
                    <br></br>
                    {dogs}
                </p>

                <ImageDisplay images={props.aptInfo.images}/>
            </div>
        </div>
    )
}