import Link from 'next/link';
import styles from '../styles/Sidebar.module.css';

export default function Sidebar({ isOpen, closeSidebar }) {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <h2 className={styles.logo}>Safe Haven</h2>
      <ul>
        <li><Link href="/" onClick={closeSidebar}>Home</Link></li>
        <li><Link href="/about" onClick={closeSidebar}>About Us</Link></li>
        <li><Link href="/news" onClick={closeSidebar}>News</Link></li>
        <li><Link href="/rights" onClick={closeSidebar}>My Rights</Link></li>
      </ul>
    </div>
  );
}

