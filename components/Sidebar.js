import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Sidebar.module.css';
import SubmitAlertForm from './SubmitAlertForm';

export default function Sidebar() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // 👇 Fix: when the page (pathname) changes
    if (router.pathname === '/'|| router.pathname === '/news') {
      setIsSidebarOpen(true); // Home: keep sidebar open
    } else {
      setIsSidebarOpen(false); // Other pages: start closed
    }
  }, [router.pathname]); // 👈 listen to page changes!

  return (
    <>
      {/* Show toggle button ONLY if not on Home */}
      {router.pathname !== '/' && (
        <button 
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            background: 'white',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '24px',
            zIndex: 1000
          }}
        >
          {isSidebarOpen ? '✕' : '☰'}
        </button>
      )}

      {isSidebarOpen && (
        <div className={styles.sidebar}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '10px 20px',
            borderBottom: '1px solid #ccc'
          }}>
            <h2 className={styles.logo}>Safe Haven</h2>
            {router.pathname !== '/' && (
              <button 
                onClick={toggleSidebar}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            )}
          </div>

          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/news">News</Link></li>
            <li><Link href="/rights">My Rights</Link></li>
            <li>
              <button 
                onClick={toggleForm}
                className={styles.submitButton}
              >
                {showForm ? '✕ Close Form' : '+ Submit Alert'}
              </button>
            </li>
          </ul>

          {showForm && (
            <div className={styles.formContainer}>
              <SubmitAlertForm />
            </div>
          )}
        </div>
      )}
    </>
  );
}
