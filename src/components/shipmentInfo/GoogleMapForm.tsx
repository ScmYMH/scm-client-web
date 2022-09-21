import React from 'react'
import GoogleMapReact from 'google-map-react';

const GoogleMapForm = () => {
    const cordinates = { lat:36.1216992, lng:128.3437218};
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