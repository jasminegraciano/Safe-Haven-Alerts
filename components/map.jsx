'use client';
import { useState, useEffect, useCallback } from 'react';
import mapConfig from "../lib/googleMapsConfig";
import { useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';
import { Autocomplete } from '@vis.gl/react-google-maps';
import { useRef } from 'react';
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
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [searchInput, setSearchInput] = useState('');
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const autocompleteService = useRef(null);
  const geocoder = useRef(null);
  const [mapCenter, setMapCenter] = useState(mapConfig.mapOptions.center);
  const [mapZoom, setMapZoom] = useState(mapConfig.mapOptions.zoom);
  const [activeIndex, setActiveIndex] = useState(-1); // for keyboard scroll

  const searchBoxRef = useRef(null);

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
//Initialize Google services when map loads
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      if (!autocompleteService.current) {
        autocompleteService.current = new window.google.maps.places.AutocompleteService();
      }
      if (!geocoder.current) {
        geocoder.current = new window.google.maps.Geocoder();
      }
    } else {
      console.error("Google Maps Places library not loaded yet");
    }
  }, []);

  //handle input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    console.log('> New search: ', value);
    setSearchInput(value);
  
    if (autocompleteService.current && value.length > 2) {
      autocompleteService.current.getPlacePredictions({ input: value }, (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          setAutocompleteResults(predictions);
        } else {
          setAutocompleteResults([]);
        }
      });
    }
  };
  const handleKeyDown = (e) => {
    if (autocompleteResults.length === 0) return;
  
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev + 1) % autocompleteResults.length);
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev - 1 + autocompleteResults.length) % autocompleteResults.length);
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < autocompleteResults.length) {
        handleSelectPlace(autocompleteResults[activeIndex].place_id);
      }
    }
  };
  

//handle clicking a prediction
  const handleSelectPlace = (placeId) => {
    if (!geocoder.current) return;
  
    geocoder.current.geocode({ placeId }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        setSearchResult({
          title: results[0].formatted_address,
          address: results[0].formatted_address,
          latitude: location.lat(),
          longitude: location.lng()
        });
        setMapCenter({
          lat: location.lat(),
          lng: location.lng()
        });
        setMapZoom(15); 
        
        setSearchInput('');
        setAutocompleteResults([]);
      }
    });
  };
  

  const handleClick = (alert) => {
    setSelectedMarker(alert);
  }

  const handleLogout = async () => {
    await signOut();
    router.push('/sign-in');
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
    <div style={{ 
      position: 'absolute', 
      top: 10, 
      left: '50%', 
      transform: 'translateX(-50%)',
      zIndex: 999, 
      backgroundColor: 'white', 
      padding: '10px', 
      borderRadius: '8px' 
    }}>
      
      <input
        ref={searchBoxRef}
        type="text"
        value={searchInput}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        placeholder="Search a place..."
        style={{
          width: '300px',
          height: '35px',
          fontSize: '14px',
          paddingLeft: '8px',
          border: '1px solid #ccc',
          borderRadius: '6px'
        }}
      />
      <ul style={{
        listStyle: 'none',
        padding: 0,
        marginTop: '8px',
        backgroundColor: 'white',
        maxHeight: '200px',
        overflowY: 'auto',
        borderRadius: '4px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
      }}>
        {autocompleteResults.map((result, index) => (
          <li 
            key={result.place_id}
            onClick={() => handleSelectPlace(result.place_id)}
            style={{
              padding: '8px',
              borderBottom: '1px solid #eee',
              cursor: 'pointer',
              backgroundColor: activeIndex === index ? '#f1f1f1' : 'white'
            }}
          >
            {result.description}
          </li>
        ))}
      </ul>
  </div>


      <button
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: 1,
          right: 50,
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
      
      
      <Map
        mapId="c2e97ad0432fad22"
        style={{ width: '100vw', height: '100vh' }}
        center={mapCenter}
        zoom={mapZoom}
        gestureHandling={'greedy'}
        disableDefaultUI={false}
        options={{
          draggable: true,          
          scrollwheel: true,          
          streetViewControl: true,    
          mapTypeControl: false,      
          fullscreenControl: true,    
          zoomControl: true           
        }}
        onCenterChanged={(e) => {
          const center = e.detail.center;
          setMapCenter({ lat: center.lat, lng: center.lng });
        }}
        onZoomChanged={(e) => {
          const zoom = e.detail.zoom;
          setMapZoom(zoom);
        }}
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
              <Pin
                background={categoryColors[alert.category] || '#FF5A5F'}
                borderColor={categoryColors[alert.category] || '#FF5A5F'}
                glyphColor={"white"}
                scale={1.2}
              />
            </AdvancedMarker>
          );
        })}
        {searchResult && (
          <AdvancedMarker
            position={{
              lat: parseFloat(searchResult.latitude),
              lng: parseFloat(searchResult.longitude)
            }}
          >
            <Pin
              background={"#666666"}
              borderColor={"#444444"}
              glyphColor={"white"}
              scale={1.2}
            />
          </AdvancedMarker>
        )}
        {selectedMarker && (
          <AdvancedMarker
            position={{
              lat: parseFloat(selectedMarker.latitude),
              lng: parseFloat(selectedMarker.longitude)
            }}
          >
            <Pin
              background={categoryColors[selectedMarker.category] || '#FF5A5F'}
              borderColor={categoryColors[selectedMarker.category] || '#FF5A5F'}
              glyphColor={"white"}
              scale={1.2}
            />
          </AdvancedMarker>
        )}

        </Map>

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