import React, { useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Polyline, GoogleMap, LoadScript, InfoWindow, InfoBox, Circle } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { RootState } from "modules";


const path = [
  // SAGUNTO
  [
    { lat: 34.9328653, lng: 127.7361051 },
    {lat: 39.6806472697051,	lng: -0.28074160823030697},
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
    { lat: 36.0197716	, lng: 129.3710823 },
    {lat: 35.7103001101156	, lng:	139.83069908824},
  ],
  [
    { lat: 36.0197716	, lng: 129.3710823 },
    { lat: 34.74766957581907	, lng: 137.38560186833453 }
  ],
  // LEIXOES
  [
    { lat: 34.9328653, lng: 127.7361051 },
    {lat: 41.1830999025114,	lng: -8.702411896270204}
  ],
  // BILBAO
  [
    { lat: 34.9328653, lng: 127.7361051 },
    {lat: 43.26607222386634,	lng: -2.9354527783290774}
  ], 
  [
    { lat: 36.0197716	, lng: 129.3710823 },
    { lat: 31.8613866353963,	lng: -116.623083001353},
  ]
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

const eu_line_options = {
  strokeColor: "#1B1464",
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
const u_line_options = {
  strokeColor: "#7158e2",
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

const eu_options = {
  strokeColor: '#44bd32',
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillColor: '#44bd32',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 40000,
  zIndex: 1
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

const k_options = {
  strokeColor: '#fff200',
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillColor: '#fff200',
  fillOpacity: 0.35,
  clickable: true,
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

const u_options = {
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
export const GoogleMapForm = () => {
  const [infoBoxFlag, setInfoBoxFlag] = useState<any>(false);

  const kp_center  : any = { lat: 34.9328653, lng: 127.7361051 };
  const kp2_center  : any = { lat: 36.0197716	, lng: 129.3710823 };
  const jp_center_position : any = { lat: 34.74766957581907	, lng: 137.38560186833453 };
  const jp2_center_position : any = {lat: 35.7103001101156	, lng:	139.83069908824};
  const cn_center_postion : any = {lat: 36.088282991631374,	lng:	120.35315730520846};
  const cn2_center_postion : any = {lat: 38.99162556774881,	lng:	117.74821047515125};
  // CHENNAI
  const ea_center_postion : any = {lat: 13.100326514288318,	lng:	80.25226140026038};
  // JAKARTA
  const ea2_center_postion : any = {lat: -6.298582860801025,	lng:	106.85948711929437};
  // MANILA
  const ea3_center_postion : any = {lat: 14.616201266893077,	lng:120.99588896466769};
  // SAGUNTO
  const eu_center_postion : any = {lat: 39.6806472697051,	lng: -0.28074160823030697};
  // LEIXOES
  const eu1_center_postion : any = {lat: 41.1830999025114,	lng: -8.702411896270204};
  // BILBAO
  const eu2_center_postion : any = {lat: 43.26607222386634,	lng: -2.9354527783290774};
  const u_center_postion : any = {lat: 31.8613866353963,	lng: -116.623083001353};

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

  const init_center: any = {
    lat: 34.9328653,
    lng: 127.7361051,
  };

  const mapContainerStyle = {
    marginTop: "1em",
    height: "35em",
    width: "80vw",
  };
  
  const lineClickHandle = (e: google.maps.MapMouseEvent) => {
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
  const options : any= {
    zoomControlOptions: {
      position: 'center',
      // ...otherOptions
    }
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyC54rGP0q3aIP_wiWu9U8GJ8trQUbr7cqk">
      <GoogleMap
        id="marker-example"
        mapContainerStyle={mapContainerStyle}
        zoom={4}
        center={init_center}
        options= {
          options
        }
      >
        {/* Korea */}
        <Circle
            onLoad={circle_onLoad}
            onUnmount={circle_onUnmount}
            center={kp_center}
            options={k_options}
            onClick={lineClickHandle}
          />
        <Circle
          onLoad={circle_onLoad}
          onUnmount={circle_onUnmount}
          center={kp2_center}
          options={k_options}
          onClick={lineClickHandle}
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
        {/* ICHIKAWA */}
        <Circle
          onLoad={circle_onLoad}
          onUnmount={circle_onUnmount}
          center={jp2_center_position}
          options={jp_options}
          onClick={lineClickHandle}

        />
        <Polyline
          onLoad={onLoad}
          path={path[6]}
          options={jp_line_options}
          onClick={lineClickHandle}
        />
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
          onClick={lineClickHandle}
        />
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
          onClick={lineClickHandle}
        />
        {/* East Asia */}
        <Circle
          onLoad={circle_onLoad}
          onUnmount={circle_onUnmount}
          center={ea_center_postion}
          options={ea_options}
          onClick={lineClickHandle}
        />
        <Polyline
          onLoad={onLoad}
          path={path[3]}
          options={ea_line_options}
          onClick={lineClickHandle}
        />
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
          onClick={lineClickHandle}
        />
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
          onClick={lineClickHandle}
        />
        {/* // SAGUNTO */}
        <Circle
          onLoad={circle_onLoad}
          onUnmount={circle_onUnmount}
          center={eu_center_postion}
          options={eu_options}
        />
        <Polyline
          onLoad={onLoad}
          path={path[0]}
          options={eu_line_options}
          onClick={lineClickHandle}
        />
        
        {/* LEIXOES */}
        <Circle
          onLoad={circle_onLoad}
          onUnmount={circle_onUnmount}
          center={eu1_center_postion}
          options={eu_options}
        />
        <Polyline
          onLoad={onLoad}
          path={path[8]}
          options={eu_line_options}
          onClick={lineClickHandle}
        />
        {/* BILBAO */}
        <Circle
          onLoad={circle_onLoad}
          onUnmount={circle_onUnmount}
          center={eu2_center_postion}
          options={eu_options}
        />
        <Polyline
          onLoad={onLoad}
          path={path[9]}
          options={eu_line_options}
          onClick={lineClickHandle}
        />
        {/* ENSENADA */}
        <Circle
          onLoad={circle_onLoad}
          onUnmount={circle_onUnmount}
          center={u_center_postion}
          options={u_options}
        />
        <Polyline
          onLoad={onLoad}
          path={path[10]}
          options={u_line_options}
        />
        {infoBoxFlag ? (
          <><InfoWindow
            onLoad={windowOnLoadonLoad}
            position={jp_center_position}
          >
            <div style={divStyle}>
              <b>Osaka 단가</b>
              <p>99.2 USD</p>
            </div>
          </InfoWindow><InfoWindow
            onLoad={windowOnLoadonLoad}
            position={jp2_center_position}
          >
              <div style={divStyle}>
                <b>ICHIKAWA 단가</b>
                <p>97.2 USD</p>
              </div>
            </InfoWindow><InfoWindow
              onLoad={windowOnLoadonLoad}
              position={cn_center_postion}
            >
              <div style={divStyle}>
                <b>QINGDAO 단가</b>
                <p>88.7 USD</p>
              </div>
            </InfoWindow><InfoWindow
              onLoad={windowOnLoadonLoad}
              position={cn2_center_postion}
            >
              <div style={divStyle}>
                <b>XINGANG 단가</b>
                <p>76.7 USD</p>
              </div>
            </InfoWindow><InfoWindow
              onLoad={windowOnLoadonLoad}
              position={ea_center_postion}
            >
              <div style={divStyle}>
                <b>CHENNAI 단가</b>
                <p>196.7 USD</p>
              </div>
            </InfoWindow><InfoWindow
              onLoad={windowOnLoadonLoad}
              position={ea2_center_postion}
            >
              <div style={divStyle}>
                <b>JAKARTA 단가</b>
                <p>120.7 USD</p>
              </div>
            </InfoWindow><InfoWindow
              onLoad={windowOnLoadonLoad}
              position={ea3_center_postion}
            >
              <div style={divStyle}>
                <b>MANILA 단가</b>
                <p>110.7 USD</p>
              </div>
            </InfoWindow><InfoWindow
              onLoad={windowOnLoadonLoad}
              position={eu_center_postion}
            >
              <div style={divStyle}>
                <b>SAGUNTO 단가</b>
                <p>110.7 USD</p>
              </div>
            </InfoWindow><InfoWindow
              onLoad={windowOnLoadonLoad}
              position={eu1_center_postion}
            >
              <div style={divStyle}>
                <b>LEIXOES 단가</b>
                <p>227.7 USD</p>
              </div>
            </InfoWindow><InfoWindow
              onLoad={windowOnLoadonLoad}
              position={eu2_center_postion}
            >
              <div style={divStyle}>
                <b>BILBAO 단가</b>
                <p>230.7 USD</p>
              </div>
            </InfoWindow><InfoWindow
              onLoad={windowOnLoadonLoad}
              position={u_center_postion}
            >
              <div style={divStyle}>
                <b>ENSENADA 단가</b>
                <p>520.7 USD</p>
              </div>
            </InfoWindow></>
        )  : null}
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