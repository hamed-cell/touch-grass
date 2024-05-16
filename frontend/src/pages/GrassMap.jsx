import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function GrassMap() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiaGFtZWQxMiIsImEiOiJjbHc5MGh3d2YyYTltMnFweXNhZHgwYWw2In0.AVp8L6FfnEg_r8aRl6Qffw";

  useEffect(() => {
    // Créer la carte uniquement lorsque le composant est monté dans le DOM
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    // Nettoyer la carte lorsque le composant est démonté
    return () => {
      map.remove();
    };
  }, []); // Le tableau vide en tant que deuxième argument signifie que cet effet s'exécutera uniquement après le premier rendu

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
}

export default GrassMap;
