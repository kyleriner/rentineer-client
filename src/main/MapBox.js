import React, {useState, useRef, useEffect} from 'react';
import mapboxgl from 'mapbox-gl';
import  "../App.css";
 
mapboxgl.accessToken = 'pk.eyJ1Ijoia3lsZXJpbmVyIiwiYSI6ImNrYXd0aXBldDAwY2szMG5xd2tnZWRkNjAifQ.ahT65ZVasl5gdlLGYD7NNA'
 
export default function MapBox() {

    const mapRef = useRef(null)
    const [lng, setLng] = useState(0)
    const [lat, setLat] = useState(0)
    const [zoom, setZoom] = useState(0)

        useEffect(() => {
            fetch('http://localhost:3001/api/v1/properties', {headers: {"Authorization": 'Bearer ' + localStorage.getItem('userToken')}})
            .then(function(response){
                return response.json()
            })
            .then(function(json){
                generateMarkers(json)
                genGeo(json)
            })


            setLat(30.2671921)
            setLng(-97.743236)
            setZoom(13)

            const map = new mapboxgl.Map({
                container: mapRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-97.743236, 30.2671921],
                zoom: 13
            });    
         
            map.on('move', () => {
                setLng(map.getCenter().lng.toFixed(4))
                setLat(map.getCenter().lat.toFixed(4))
                setZoom(map.getZoom().toFixed(2))
                
            });

            function genGeo(properties) {
                let geoData = {
                    "type": "FeatureCollection",
                    "features": [

                    ]
                }
                properties.forEach(property => {
                    let priceHeat = 0
                    if (property.price_min === null) {
                        if (property.apartments.length === 0 || property.apartments[0].price === null) {
                            return;
                        }
                        priceHeat = property.apartments[0].price
                    } else {
                        priceHeat = (property.price_min + property.price_max) / 2
                    }

                    let newData = {
                        "type": "Feature",
                        "properties": {'price': priceHeat},
                        "geometry": {
                            "type": "Point",
                            "coordinates": [
                                property.longitude,
                                property.latitude
                            ]
                        }
                    }

                    geoData.features.push(newData)

                })

            
                map.on('load', function() {
                    map.addSource('properties', {
                        "type": 'geojson',
                        "data": geoData
                    })
                    map.addLayer({
                        'id': 'price-heat',
                        'type': 'heatmap',
                        'source': 'properties',
                        'paint': {
                            'heatmap-weight': {
                                property: 'price',
                                type: 'exponential',
                                stops: [
                                    [1, 0],
                                    [5000, 2]

                            ]

                            },
                            'heatmap-color': [
                                'interpolate',
                                ['linear'],
                                ['heatmap-density'],
                                0, 'rgba(153, 255, 51, 0)',
                                0.2, 'rgb(153, 255, 51)',
                                0.4, 'rgb(255, 255, 0)',
                                0.6, 'rgb(255, 204, 0)',
                                0.8, 'rgb(255, 15, 51)',
                                1, 'rgb(255, 51, 0)'
                              ],
                        }
                    })
                    
                })

            }
        

            function generateMarkers(properties) {
                

                properties.forEach(property => {
                    if (property.name === null || property.name === ' ') {
                        property.name = property.address
                    }
                    new mapboxgl.Marker()
                    .setLngLat([property.longitude, property.latitude])
                    .setPopup(new mapboxgl.Popup().setHTML(`${property.name}`))
                    .addTo(map)
                    .getElement()
                    .addEventListener('click', (e) => {
                        console.log('clickmarker')
                    })
                });
            }

        }, [])

            return (
                <div>
                    <div className='sidebarStyle'>
                        <div>Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}</div>
                    </div>
                <div ref={el => mapRef.current = el} className='mapContainer' />
                </div>
                
            )
        
    }
         
