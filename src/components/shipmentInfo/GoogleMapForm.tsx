import React, { useRef } from 'react'
import GoogleMapReact from 'google-map-react';

const GoogleMapForm = () => {
    const cordinates = { lat:34.9328653, lng:127.7361051};
    const mapRef = useRef();
    return (
        <GoogleMapReact
            bootstrapURLKeys={{key: 'AIzaSyC54rGP0q3aIP_wiWu9U8GJ8trQUbr7cqk'}}
            defaultCenter={cordinates}
            center={cordinates}
            defaultZoom={3}
            margin = {[50, 50, 50, 50]}
            options={''}
            onChange={''}
            onChildClick={''}
        >
        </GoogleMapReact>
    )
}

export default GoogleMapForm