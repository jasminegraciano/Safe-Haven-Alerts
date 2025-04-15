'use client';

import { useState, useEffect } from 'react';
import mapConfig from "../lib/googleMapsConfig";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin
} from '@vis.gl/react-google-maps';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!API_KEY) {
  throw Error("GOOGLE MAPS API KEY not found.")
}

const locations = [
  {
    id: 1,
    category: "Community Center",
    position: { lat: alert.latitude, lng: alert.longitude },    
    title: "Community Support Center",
    description: "Spaces that offer shelter, resources, food, or emotional support.",
    color: '#34A853' // green
  },
  {
    id: 2,
    category: "Public Safety",
    position: { lat: alert.latitude, lng: alert.longitude },    
    title: "Health & Wellness Site",
    description: "Free clinics, mental health orgs, resource centers. Physical and mental safety.",
    color: '#4285F4' // blue
  },
  {
    id: 3,
    category: "Law Enforcement Presence",
    position: { lat: alert.latitude, lng: alert.longitude },    
    title: "Police Activity",
    description: "An active or recent police-related incident or patrol.",
    color: '#FBBC04' // yellow

  },
  {
    id: 4,
    category: "Hot Spot",
    position: { lat: alert.latitude, lng: alert.longitude },    
    title: "Caution Area",
    description: "General zones of heavy presence or ongoing concern.",
    color: '#EA4335' // red

  }
];

const MapComponent = () => {
  console.log("✅ map.jsx is running!");

  const [selectedMarker, setSelectedMarker] = useState(null);
  console.log("✅ Google Maps is loaded!");

  const handleClick = async (location) => {
    setSelectedMarker(location);
  }

  const [alerts, setAlerts] = useState([]);

useEffect(() => {
  async function fetchAlerts() {
    try {
      const res = await fetch('/api/get-alerts');
      const data = await res.json();
      setAlerts(data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  }

  fetchAlerts();
}, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <APIProvider apiKey={API_KEY}>
        <Map
          mapId="c2e97ad0432fad22"
          style={{width: '100vw', height: '100vh'}}
          defaultCenter={mapConfig.mapOptions.center}
          defaultZoom={mapConfig.mapOptions.zoom}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {alerts.map((alert, index) => (
            <AdvancedMarker
              key={index}
              position={{ lat: alert.latitude, lng: alert.longitude }}
            >
              <div style={{
                backgroundColor: '#FF5A5F',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {alert.category}
              </div>
            </AdvancedMarker>
          ))}

        </Map>
      </APIProvider>
      {/* 🟦 Floating info box */}
      {selectedMarker && (
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            backgroundColor: '#fff',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            maxWidth: '300px',
            fontFamily: 'Arial, sans-serif',
            color: '#333',
            lineHeight: '1.5',
            borderLeft: '5px solid #FF5A5F',
        }}
      >
        <button
          onClick={() => setSelectedMarker(null)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '15px',
            background: 'transparent',
            border: 'none',
            fontSize: '1.2rem',
            color: '#aaa',
            cursor: 'pointer',
          }}
          aria-label="Close"
      >
          ✕
      </button>

      <p><strong>📌 Title:</strong> {selectedMarker.title}</p>
      <p><strong>🏷️ Category:</strong> {selectedMarker.category}</p>
      <p><strong>📝 Description:</strong><br /> {selectedMarker.description}</p>
    </div>
)}

</div>
  );
};
export default MapComponent;