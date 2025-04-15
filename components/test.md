```
import { useLoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import mapConfig from "../lib/googleMapsConfig";

const locations = [
  {
    id: 1,
    category: "Community Center",
    position: { lat: 41.331331, lng: -72.948578},
    title: "Community Support Center",
    description: "Spaces that offer shelter, resources, food, or emotional support.",
    icon: "/icons/church.png"

  },
  {
    id: 2,
    category: "Public Safety",
    position: { lat: 41.4150, lng: -72.7280 },
    title: "Health & Wellness Site",
    description: "Free clinics, mental health orgs, resource centers. Physical and mental safety.",
    icon: "/icons/ice.png"
  },
  {
    id: 3,
    category: "Law Enforcement Presence",
    position: { lat: 41.4180, lng: -72.7400 },
    title: "Police Activity",
    description: "An active or recent police-related incident or patrol.",
    icon: "/icons/police.png"

  },
  {
    id: 4,
    category: "Hot Spot",
    position: { lat: 41.4160, lng: -72.7320 },
    title: "Caution Area",
    description: "General zones of heavy presence or ongoing concern.",
    icon: "/icons/hotspot.png"

  }
];

const MapComponent = () => {
  console.log("✅ map.jsx is running!");

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: mapConfig.googleMapsApiKey,
    libraries: ["places"]
  });

  const [selectedMarker, setSelectedMarker] = useState(null);

  if (loadError) return <div>❌ Error loading map</div>;
  if (!isLoaded) {
    console.log("⏳ Google Maps is still loading...");
    return <div>Loading map...</div>;
  }

  console.log("✅ Google Maps is loaded!");

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100vh"
        }}
        center={mapConfig.mapOptions.center}
        zoom={mapConfig.mapOptions.zoom}
      >
        <Marker
            key={1}
            position={{ lat: 41.331331, lng: -72.948578 }}
            onClick={() => setSelectedMarker({
              id: 1,
              position: { lat: 41.331331, lng: -72.948578 },
              category: "Community Center",
              title: "Community Support Center",
              description: "Spaces that offer shelter, resources, food, or emotional support."
           })}
        />
        <Marker
            key={2}
            position={{ lat: 41.308274, lng: -72.927883}}
            onClick={() => setSelectedMarker({
              id: 2,
              position: { lat: 41.308274, lng: -72.927883},
              category: "Public Safety",
              title: "Health & Wellness Site",
              description: "Free clinics, mental health orgs, resource centers. Physical and mental safety."
            })}
        />
        <Marker
            key={3}
            position={{ lat: 41.315678, lng: -72.911234}}
            onClick={() => setSelectedMarker({
              id: 3,
              position: { lat: 41.315678, lng: -72.911234},
              category: "Law Enforcement Presence",
              title: "Police Activity",
              description: "An active or recent police-related incident or patrol."
            })}
        />
        <Marker
            key={4}
            position={{ lat: 41.323456, lng: -72.935678}}
            onClick={() => setSelectedMarker({
              id: 4,
              position: { lat: 41.323456, lng: -72.935678},
              category: "Hotspot",
              title: "Caution Area",
              description: "General zones of heavy presence or ongoing concern."
            })}
        />
      </GoogleMap>

      {/* 🟦 Floating info box */}
      {selectedMarker && (
        <div style={{
          position: "absolute",
          top: 20,
          right: 20,
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          padding: "16px",
          zIndex: 1000,
          maxWidth: "250px"
        }}>
          <h3>{selectedMarker.title}</h3>
          <p><strong>Category:</strong> {selectedMarker.category}</p>
          <p>{selectedMarker.description}</p>
          <button onClick={() => setSelectedMarker(null)}>Close</button>
        </div>
      )}
      
    </div>
  );
};
export default MapComponent;
```