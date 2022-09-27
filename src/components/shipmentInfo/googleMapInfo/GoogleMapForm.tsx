import React, { useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Polyline, GoogleMap, LoadScript, InfoWindow, InfoBox, Circle } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { RootState } from "modules";

const path = [
  [
    { lat: 34.9328653, lng: 127.7361051 },
    { lat: 31.090396564020192, lng: 128.64815478753206 },
    { lat: 21.04961147500605, lng: 154.03320910099987 },
    { lat: 25.503442799160354, lng: -159.09579921666798 },
    { lat: 34.07364171303651, lng: -118.23872946479459 },
  ],
  [
    { lat: 34.9328653, lng: 127.7361051 },
    {lat: 14.616201266893077,	lng:120.99588896466769},
  ],
  [
    { lat: 34.9328653, lng: 127.7361051 },
    {lat: -6.298582860801025,	lng:	106.85948711929437},
  ],
  [
    { lat: 34.9328653, lng: 127.7361051 },
    {lat: 13.100326514288318,	lng:	80.25226140026038},
  ],
  // China
  [
    { lat: 34.9328653, lng: 127.7361051 },
    {lat: 38.99162556774881,	lng:	117.74821047515125},
  ],
  [
    { lat: 34.9328653, lng: 127.7361051 },
    {lat: 36.088282991631374,	lng:	120.35315730520846},
  ],
  // japan
  [
    { lat: 34.9328653, lng: 127.7361051 },
    {lat: 35.7103001101156	, lng:	139.83069908824},
  ],
  [
    { lat: 34.9328653, lng: 127.7361051 },
    { lat: 34.74766957581907	, lng: 137.38560186833453 }
  ],
];

const jp_line_options = {
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 4,
  fillOpacity: 0.35,
  clickable: true,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1,
};
const cn_line_options = {
  strokeColor: "#2e86de",
  strokeOpacity: 0.8,
  strokeWeight: 4,
  fillOpacity: 0.35,
  clickable: true,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1,
};
const ea_line_options = {
  strokeColor: "#ff9f43",
  strokeOpacity: 0.8,
  strokeWeight: 4,
  fillOpacity: 0.35,
  clickable: true,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1,
};
const options4 = {
  strokeColor: "#fed330",
  strokeOpacity: 0.8,
  strokeWeight: 4,
  fillOpacity: 0.35,
  clickable: true,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1,
};
const options5 = {
  strokeColor: "#a55eea",
  strokeOpacity: 0.8,
  strokeWeight: 4,
  fillOpacity: 0.35,
  clickable: true,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1,
};
const options6 = {
  strokeColor: "#ff9f1a",
  strokeOpacity: 0.8,
  strokeWeight: 4,
  fillOpacity: 0.35,
  clickable: true,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1,
};
export const GoogleMapForm = () => {
  const [infoBoxFlag, setInfoBoxFlag] = useState<any>(false);
  // INDMAAP01	CHENNAI	EA			
  // IDNJKTP03	JAKARTA-G-CTN	EA		ID	N	20130315	170001	Admin	20160304	110825	20140428000004	-6.298582860801025	106.85948711929437
  // PHLMNLP02	MANILA-CTN	EA		PL	N	20130315	170001	Admin	20160304	110825	20140428000004	14.616201266893077	120.99588896466769
  // ESPSAGP01	SAGUNTO	E		SP	N	20130315	170001	Admin	20160304	110825	20140428000004	39.6806472697051	-0.28074160823030697
  // PRTLEIP01	LEIXOES	E		PG	N	20130315	170001	Admin	20160304	110825	20140428000004	41.1830999025114	-8.702411896270204
  // ESPBIOP01	BILBAO	E		SP	N	20130315	170001	Admin	20160304	110825	20140428000004	43.26607222386634	-2.9354527783290774
  const kp_center  : any = { lat: 34.9328653, lng: 127.7361051 };
  const jp_center_position : any = { lat: 34.74766957581907	, lng: 137.38560186833453 };
  const jp2_center_position : any = {lat: 35.7103001101156	, lng:	139.83069908824};
  const cn_center_postion : any = {lat: 36.088282991631374,	lng:	120.35315730520846};
  const cn2_center_postion : any = {lat: 38.99162556774881,	lng:	117.74821047515125};
  // CHENNAI
  const ea_center_postion : any = {lat: 13.100326514288318,	lng:	80.25226140026038}
  // JAKARTA
  const ea2_center_postion : any = {lat: -6.298582860801025,	lng:	106.85948711929437}
  // MANILA
  const ea3_center_postion : any = {lat: 14.616201266893077,	lng:120.99588896466769}


  const windowOnLoadonLoad = infoWindow => {
    console.log('infoWindow: ', infoWindow)
  }

  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 0
  }

  const onLoad = (polyline) => {
    console.log('polyline: ', polyline)
  };

  const init_center = {
    lat: 34.9328653,
    lng: 127.7361051,
  };

  const mapContainerStyle = {
    marginTop: "1em",
    height: "35em",
    width: "80vw",
  };
  
  const lineClickHandle = (e: google.maps.MapMouseEvent) => {
    console.log("show unit price!");
    setInfoBoxFlag(!infoBoxFlag);
  };

  const jp_info_onLoad = infoBox => {
    console.log('infoBox: ', infoBox)
  };

  const circle_onLoad = circle => {
    console.log('Circle onLoad circle: ', circle)
  }
  
  const circle_onUnmount = circle => {
    console.log('Circle onUnmount circle: ', circle)
  }

  const jp_options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 40000,
    zIndex: 1
  }

  const cn_options = {
    strokeColor: '#2e86de',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#2e86de',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 40000,
    zIndex: 1
  }
  const ea_options = {
    strokeColor: '#ff9f43',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#ff9f43',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 40000,
    zIndex: 1
  }
  
  return (
    <LoadScript googleMapsApiKey="AIzaSyC54rGP0q3aIP_wiWu9U8GJ8trQUbr7cqk">
      <GoogleMap
        id="marker-example"
        mapContainerStyle={mapContainerStyle}
        zoom={3}
        center={init_center}
      >
        {/* Korea */}
        <Circle
            onLoad={circle_onLoad}
            onUnmount={circle_onUnmount}
            center={kp_center}
            options={jp_options}
          />
        {/* Japan */}
        <Circle
          onLoad={circle_onLoad}
          onUnmount={circle_onUnmount}
          center={jp_center_position}
          options={jp_options}
        />
        <Polyline
          onLoad={onLoad}
          path={path[7]}
          options={jp_line_options}
          onClick={lineClickHandle}
        />
        {infoBoxFlag ? (
          <InfoWindow
          onLoad={windowOnLoadonLoad}
          position={jp_center_position}
        >
          <div style={divStyle}>
            <b>Osaka 단가</b>
            <p>99.2 USD</p>
          </div>
        </InfoWindow>
        ) : null}
        {/* ICHIKAWA */}
        <Circle
          onLoad={circle_onLoad}
          onUnmount={circle_onUnmount}
          center={jp2_center_position}
          options={jp_options}
        />
        <Polyline
          onLoad={onLoad}
          path={path[6]}
          options={jp_line_options}
        />
        <InfoWindow
          onLoad={windowOnLoadonLoad}
          position={jp2_center_position}
        >
          <div style={divStyle}>
            <b>ICHIKAWA 단가</b>
            <p>97.2 USD</p>
          </div>
        </InfoWindow>
        {/* QINGDAO */}
        <Circle
          onLoad={circle_onLoad}
          onUnmount={circle_onUnmount}
          center={cn_center_postion}
          options={cn_options}
        />
        <Polyline
          onLoad={onLoad}
          path={path[5]}
          options={cn_line_options}
        />
        <InfoWindow
          onLoad={windowOnLoadonLoad}
          position={cn_center_postion}
        >
          <div style={divStyle}>
            <b>QINGDAO 단가</b>
            <p>88.7 USD</p>
          </div>
        </InfoWindow>
        {/* XINGANG */}
        <Circle
          onLoad={circle_onLoad}
          onUnmount={circle_onUnmount}
          center={cn2_center_postion}
          options={cn_options}
        />
        <Polyline
          onLoad={onLoad}
          path={path[4]}
          options={cn_line_options}
        />
        <InfoWindow
          onLoad={windowOnLoadonLoad}
          position={cn2_center_postion}
        >
          <div style={divStyle}>
            <b>XINGANG 단가</b>
            <p>76.7 USD</p>
          </div>
        </InfoWindow>

        {/* East Asia */}
        <Circle
          onLoad={circle_onLoad}
          onUnmount={circle_onUnmount}
          center={ea_center_postion}
          options={ea_options}
        />
        <Polyline
          onLoad={onLoad}
          path={path[3]}
          options={ea_line_options}
        />
        <InfoWindow
          onLoad={windowOnLoadonLoad}
          position={ea_center_postion}
        >
        <div style={divStyle}>
          <b>CHENNAI 단가</b>
          <p>196.7 USD</p>
        </div>
        </InfoWindow>
        <Circle
          onLoad={circle_onLoad}
          onUnmount={circle_onUnmount}
          center={ea2_center_postion}
          options={ea_options}
        />
        <Polyline
          onLoad={onLoad}
          path={path[2]}
          options={ea_line_options}
        />
        <InfoWindow
          onLoad={windowOnLoadonLoad}
          position={ea2_center_postion}
        >
        <div style={divStyle}>
          <b>JAKARTA 단가</b>
          <p>120.7 USD</p>
        </div>
        </InfoWindow>

        <Circle
          onLoad={circle_onLoad}
          onUnmount={circle_onUnmount}
          center={ea3_center_postion}
          options={ea_options}
        />
        <Polyline
          onLoad={onLoad}
          path={path[1]}
          options={ea_line_options}
        />
        <InfoWindow
          onLoad={windowOnLoadonLoad}
          position={ea3_center_postion}
        >
        <div style={divStyle}>
          <b>MANILA 단가</b>
          <p>110.7 USD</p>
        </div>
        </InfoWindow>

        {/* <Polyline
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
        /> */}
      </GoogleMap>
    </LoadScript>
  );
};




{/* <InfoBox
onLoad={jp_info_onLoad}
options={jp_options}
position={jp_center_position}
>
<div style={{ backgroundColor: 'yellow', opacity: 0.75, padding: 12 }}>
  <div style={{ fontSize: 16 }}>
    <b>Osaka 단가</b>
    <p>99.2</p>
  </div>
</div>
</InfoBox> */}