import React from 'react';
import {
  GoogleMap,
  Marker, withGoogleMap, withScriptjs
} from "react-google-maps";


const GoogleMapsContainer = () => {
  const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: 22.375440, lng: 91.848526 }}
    >
      <Marker
        draggable={true}
        position={{ lat: 22.375440, lng: 91.848526 }}
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