'use client';

import { useState, useEffect, useCallback } from 'react';
import mapConfig from "../lib/googleMapsConfig";
import { useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
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

// Color mapping for different categories
const categoryColors = {
  COMMUNITY_CENTER: '#34A853',
  PUBLIC_SAFETY: '#4285F4',
  LAW_ENFORCEMENT_PRESENCE: '#FBBC04',
  HOTSPOT: '#EA4335'
};

const MapComponent = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  console.log("✅ map.jsx is running!");
  const [alerts, setAlerts] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  
  const refreshAlerts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("🔄 Refreshing alerts...");
      
      const response = await fetch("/api/get-alerts");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("✅ Fresh alerts from DB:", data);
      
      const validAlerts = data.filter(alert => {
        return alert.latitude && 
               alert.longitude && 
               !isNaN(parseFloat(alert.latitude)) && 
               !isNaN(parseFloat(alert.longitude));
      });
      
      setAlerts(validAlerts);
      setLastUpdate(Date.now());
      
    } catch (err) {
      console.error("❌ Refresh error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    refreshAlerts();
  }, [refreshAlerts]);

  // Expose refresh function to window for form to use
  useEffect(() => {
    window.refreshMapAlerts = refreshAlerts;
    return () => {
      delete window.refreshMapAlerts;
    };
  }, [refreshAlerts]);

  const handleClick = (alert) => {
    setSelectedMarker(alert);
  }

  const handleLogout = async () => {
    await signOut();
    router.push('/sign-in');
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <button
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: 1,
          right: 22,
          backgroundColor: 'white',
          color: '#333',
          padding: '1px 5px',
          borderRadius: '3px',
          border: '1px solid #ccc',
          cursor: 'pointer',
          zIndex: 1000,
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        Logout
      </button>

      {error && (
        <div style={{
          position: 'absolute',
          top: 20,
          left: 20,
          backgroundColor: '#ff4444',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          zIndex: 1000
        }}>
          Error: {error}
        </div>
      )}
      
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 20,
          left: 20,
          backgroundColor: '#ffffff',
          padding: '10px',
          borderRadius: '5px',
          zIndex: 1000
        }}>
          Loading alerts...
        </div>
      )}
      
      <APIProvider apiKey={API_KEY}>
        <Map
          mapId="c2e97ad0432fad22"
          style={{width: '100vw', height: '100vh'}}
          defaultCenter={mapConfig.mapOptions.center}
          defaultZoom={mapConfig.mapOptions.zoom}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
        {Array.isArray(alerts) && alerts.map((alert) => {
          console.log("🎯 Rendering marker:", alert);
          return (           
            <AdvancedMarker
              key={alert.id}
              position={{ 
                lat: parseFloat(alert.latitude), 
                lng: parseFloat(alert.longitude)
              }}
              onClick={() => handleClick(alert)} 
            >
              <div style={{
                backgroundColor: categoryColors[alert.category] || '#FF5A5F',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>
                {alert.category?.replace(/_/g, ' ') || 'Unknown'}
              </div>
            </AdvancedMarker>
          );
        })}
        </Map>
      </APIProvider>

      {selectedMarker && (
        <div style={{
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
            borderLeft: `5px solid ${categoryColors[selectedMarker.category] || '#FF5A5F'}`,
        }}>
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
          <p><strong>🏷️ Category:</strong> {selectedMarker.category.replace(/_/g, ' ')}</p>
          <p><strong>📝 Description:</strong><br /> {selectedMarker.description}</p>
          <p><strong>📍 Address:</strong><br /> {selectedMarker.address}</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;