import { useState } from 'react';
import Sidebar from './Sidebar';
import styles from '../styles/Sidebar.module.css'; 
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin
} from '@vis.gl/react-google-maps';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar open by default

  return (
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />

      <main className="map-area" style={{ flexGrow: 1 }}>
        <APIProvider apiKey={API_KEY} libraries={['places']}>
          {children}
        </APIProvider>
      </main>
    </div>
  );
}
