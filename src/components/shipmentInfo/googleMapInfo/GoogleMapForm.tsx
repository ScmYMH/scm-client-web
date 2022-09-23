import React, { useRef } from 'react'
import GoogleMapReact from 'google-map-react';
import { Polyline, GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '600px'
};
  
const center = {
    lat: -3.745,
    lng: -38.523
};

const GoogleMapForm = () => {
    const cordinates = { lat: 34.9328653, lng: 127.7361051};
    const mapRef = useRef();
    const path = [
        {lat: 34.9328653, lng: 127.7361051},
        {lat: 31.090396564020192,  lng: 128.64815478753206},
        {lat: 21.04961147500605,  lng: 154.03320910099987},
        {lat: 25.503442799160354,  lng: -159.09579921666798}, 
        {lat: 34.07364171303651, lng:  -118.23872946479459}
    ];

    const onLoad = polyline => {
        console.log('polyline: ', polyline)
    };
    
    const options = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        paths: [
            {lat: 37.772, lng: -122.214},
            {lat: 21.291, lng: -157.821},
            {lat: -18.142, lng: 178.431},
            {lat: -27.467, lng: 153.027}
        ],
        zIndex: 1
    };
    const mapContainerStyle = {
        height: "520px",
        width: "800px"
      };
    return (
        
        <LoadScript
             googleMapsApiKey="AIzaSyC54rGP0q3aIP_wiWu9U8GJ8trQUbr7cqk"
         >
            <GoogleMap
            id="marker-example"
            mapContainerStyle={mapContainerStyle}
            zoom={2}
            center={center}
            
            >
            <Polyline
                onLoad={onLoad}
                path={path}
                options={options}
            />
           
            </GoogleMap>
        </LoadScript>
        // <LoadScript
        //     googleMapsApiKey="AIzaSyC54rGP0q3aIP_wiWu9U8GJ8trQUbr7cqk"
        // >
        // <GoogleMap
        //     mapContainerStyle={containerStyle}
        //     center={center}
        //     zoom={10}
        // >
        //     { /* Child components, such as markers, info windows, etc. */ }
        //     <></>
        // </GoogleMap>
        
    )
}

export default GoogleMapForm