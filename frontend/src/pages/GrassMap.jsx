import React, { useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./GrassMap.css";

export default function GrassMap() {
  //* ***********  countdown *********
  const [count, setCount] = useState("3");
  const [classMap, setClassMap] = useState("hidden");
  const [classP, setClassP] = useState("visible");

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => parseInt(prevCount, 10) - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (count === 0) {
    setCount("");
    setClassMap("mapboxg1-map");
    setClassP("hidden2");
  }

  //* ***********  map *********
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

  // eslint-disable-next-line consistent-return
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
  }, []);

  geojson.features.map((feature) =>
    new mapboxgl.Marker(feature)
      .setLngLat(feature.geometry.coordinates)
      .addTo(mapi)
      .getElement()
      .classList.add(feature.class)
  );

  //* ***********  boutonBravo *********
  const message = "Well Played!";
  const handleClick = () => {
    setClassMap("hidden");
    setClassP("visible");
    setTimeout(() => {
      window.location = "/";
    }, "1000");
  };

  //* ***********  toast *********
  const [count1, setCount1] = useState(0);
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
      setCount1(count1 + 1);
      if (count1 === encouragement.length - 1) {
        setCount1(0);
      }
    }, 3700);

    return () => clearInterval(interval);
  }, [count1]);

  return (
    <>
      <ToastContainer />
      <div className="overlay">
        <p className={classP}>{Number.isNaN(count) ? message : count}</p>
      </div>
      <div className={classMap}>
        <div id="map" />
      </div>
      <button type="button" className={classMap} onClick={handleClick}>
        I'm here!
      </button>
    </>
  );
}
