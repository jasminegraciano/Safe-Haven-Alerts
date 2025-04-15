console.log("✅ googleMapsConfig.js is running!");

const mapConfig = {
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  mapOptions: {
    center: { lat: 41.4201, lng: -72.7370 },
    zoom: 9
  }
};

export default mapConfig;
