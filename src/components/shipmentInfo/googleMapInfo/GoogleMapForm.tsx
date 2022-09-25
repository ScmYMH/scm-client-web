import React, { useRef } from 'react'
import GoogleMapReact from 'google-map-react';
import { Polyline, GoogleMap, LoadScript } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { RootState } from 'modules';


const center = {
    lat: 34.9328653,
    lng: 127.7361051
};
const path = 
[
    [
        {lat: 34.9328653, lng: 127.7361051},
        {lat: 31.090396564020192,  lng: 128.64815478753206},
        {lat: 21.04961147500605,  lng: 154.03320910099987},
        {lat: 25.503442799160354,  lng: -159.09579921666798}, 
        {lat: 34.07364171303651, lng:  -118.23872946479459}
    ],
    [
        {lat: 34.9328653, lng: 127.7361051},
        {lat: 20.9582133251058	, lng:  -97.3988821363339}
    ],
    [
        {lat: 34.9328653, lng: 127.7361051},
        {lat: 36.088282991631374, lng:  120.35315730520846}
    ],
    [
        {lat: 34.9328653, lng: 127.7361051},
        {lat:10.540809150988894, lng:66.7790039909897},
        {lat: 43.26607222386634	, lng: -2.9354527783290774}
    ],
    [
        {lat: 34.9328653, lng: 127.7361051},
        {lat: 41.1830999025114, lng:-8.702411896270204}
    ],
    [
        {lat: 34.9328653, lng: 127.7361051},
        {lat: 14.616201266893077, lng: 120.99588896466769}
    ],
    [
        {lat: 34.9328653, lng: 127.7361051},
        {lat: 13.100326514288318, lng:80.25226140026038}
    ]
];

const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillOpacity: 0.35,
    clickable: true,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
};
const options2 = {
    strokeColor: 'blue',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillOpacity: 0.35,
    clickable: true,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
};
const options3 = {
    strokeColor: '#26de81',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillOpacity: 0.35,
    clickable: true,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
};
const options4 = {
    strokeColor: '#fed330',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillOpacity: 0.35,
    clickable: true,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
};
const options5 = {
    strokeColor: '#a55eea',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillOpacity: 0.35,
    clickable: true,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
};
const options6 = {
    strokeColor: '#ff9f1a',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillOpacity: 0.35,
    clickable: true,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    zIndex: 1
};
const GoogleMapForm = () => {

    const onLoad = polyline => {
        console.log('polyline: ', polyline)
    };
    
    const mapContainerStyle = {
        height: "35em",
        width: "50em"
      };

    const lineClickHandle = (e: google.maps.MapMouseEvent) => {
        alert("line click")
    }

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
                path={path[0]}
                options={options}
                onClick={lineClickHandle}
            />
            <Polyline
                onLoad={onLoad}
                path={path[1]}
                options={options2}
                onClick={lineClickHandle}
            />
            <Polyline
                onLoad={onLoad}
                path={path[2]}
                options={options3}
                onClick={lineClickHandle}
            />
            <Polyline
                onLoad={onLoad}
                path={path[3]}
                options={options4}
                onClick={lineClickHandle}
            />
             <Polyline
                onLoad={onLoad}
                path={path[4]}
                options={options5}
                onClick={lineClickHandle}
            />
            <Polyline
                onLoad={onLoad}
                path={path[5]}
                options={options6}
                onClick={lineClickHandle}
            />
            </GoogleMap>
        </LoadScript>
    )
}

export default GoogleMapForm