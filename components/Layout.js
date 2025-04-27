import { useState } from 'react';
import Sidebar from './Sidebar';
import styles from '../styles/Sidebar.module.css'; 

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar open by default

  return (
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />

      <main className="map-area" style={{ flexGrow: 1 }}>
        {children}
      </main>
    </div>
  );
}
