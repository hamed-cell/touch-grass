import React, { useEffect, useState } from "react";
import { ToastContainer, toast,Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./GrassMap.css";

function GrassMap() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiaGFtZWQxMiIsImEiOiJjbHc5MGh3d2YyYTltMnFweXNhZHgwYWw2In0.AVp8L6FfnEg_r8aRl6Qffw";
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        id: 1,
        class: "user",
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [4.81117989, 45.77963006],
        },
        properties: {
          title: "Mapbox",
          description: "Washington, D.C.",
        },
      },
      {
        id: 2,
        class: "objectif",
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [4.92166672, 45.72939395],
        },
        properties: {
          title: "Mapbox",
          description: "San Francisco, California",
        },
      },
    ],
  };
  const [mapi, setMapi] = useState();

  useEffect(() => {
    // Créer la carte uniquement lorsque le composant est monté dans le DOM
    setMapi(
      new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/hamed12/clw8zr7c702to01qva71n24bd", // style URL
        center: [4.92166672, 45.72939395], // starting position [lng, lat]

        // Nettoye
        zoom: 11, // starting zoom
      })
    );
    if (mapi !== undefined) {
      return () => {
        mapi.remove();
      };
    }
  }, []); // Le tableau vide en tant que deuxième argument signifie que cet effet s'exécutera uniquement après le premier rendu
  {
    mapi !== undefined &&
      geojson.features.map((feature) =>
        new mapboxgl.Marker(feature)
          .setLngLat(feature.geometry.coordinates)
          .addTo(mapi)
          .getElement()
          .classList.add(feature.class)
      );
  }
  const [count, setCount] = useState(0);
  const encouragement = [
    "Tu peux le faire",
    "Je crois en toi",
    "La nature te fera du bien",
    "Tu n'es pas encore arrivé ? tu me déçois !",
    "Grosse larve",
    "Tu me dégoute",
    "Gros caca",
    "Tu es une honte",
  ];
  function notify() {
    toast(encouragement[count], {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
      });
  }
  useEffect(() => {
    const interval = setInterval(() => {
      notify();
      setCount(count + 1);
      if (count === encouragement.length - 1) {
        setCount(0);
      }
    }, 3700);

    return () => clearInterval(interval);
  }, [count]);
  return (
    <>
      <div id="map" style={{ width: "75vw", height: "75vh" }} />;
      <ToastContainer />
    </>
  );
}

export default GrassMap;
