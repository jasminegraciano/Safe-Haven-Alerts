import dynamic from "next/dynamic";
import Sidebar from '../components/Sidebar';
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useState } from 'react';



const MapComponent = dynamic(() => import("../components/map"), {
  ssr: false,
  loading: () => <div>Loading map...</div>,
});


export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <button className={`menu-btn ${sidebarOpen ? 'inside' : ''}`} onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰
      </button>


      <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      
      <main className="map-area">
        <SignedIn>
          <MapComponent />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </main>
    </div>
  );
}