import React from 'react';
import {
  GoogleMap,
  Marker, withGoogleMap, withScriptjs
} from "react-google-maps";


const GoogleMapsContainer = () => {
  const state={
    address:'',
    city:'',
    area:'',
    zoom:14,
    mapPosition:{
      lat:0,
      lng:0,
    },
    markerPosition:{
      lat:0,
      lng:0,
    }
  }


  const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      <Marker
        draggable={true}
        position={{ lat: -34.397, lng: 150.644 }}
      />
    </GoogleMap>
  ));

  return (
    <MapWithAMarker
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCRTl9WPbGC7TAYb1sdnnmArpO1J_74QKY&v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />
  );
};

export default GoogleMapsContainer;