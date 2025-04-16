import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Sidebar.module.css';
import SubmitAlertForm from './SubmitAlertForm';

export default function Sidebar({ isOpen, closeSidebar }) {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.logo}>Safe Haven</h2>
        <button 
          onClick={closeSidebar}
          className={styles.closeButton}
          aria-label="Close sidebar"
        >
          ✕
        </button>

      </div>
      <ul>
        <li><Link href="/" onClick={closeSidebar}>Home</Link></li>
        <li><Link href="/about" onClick={closeSidebar}>About Us</Link></li>
        <li><Link href="/news" onClick={closeSidebar}>News</Link></li>
        <li><Link href="/rights" onClick={closeSidebar}>My Rights</Link></li>
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
  );
}

