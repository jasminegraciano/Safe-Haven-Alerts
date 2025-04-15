import { useState } from 'react';
import Sidebar from './Sidebar';
import styles from '../styles/Sidebar.module.css'; 

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <button
        className={`menu-btn ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>
      <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      <main className="map-area">
        {children}
      </main>
    </div>
  );
}

