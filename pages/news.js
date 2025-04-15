import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import styles from '@/styles/Sidebar.module.css';

export default function News() {
  const [news, setNews] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://gnews.io/api/v4/search?q=immigration%20OR%20ICE%20OR%20police%20OR%20new%20haven&lang=en&country=us&max=10&apikey=${process.env.NEXT_PUBLIC_GNEWS_API_KEY}`
        );
        const data = await res.json();
        setNews(data.articles || []);
      } catch (err) {
        console.error('Error fetching news:', err);
      }
    };

    fetchNews();
  }, []);

  return (
    <div
      className="app-container"
      style={{ backgroundColor: 'linear-gradient(to bottom right, #f1f5f9, #e0e7ff)', color: 'black', minHeight: '100vh' }}
    >
      <button
        className={`menu-btn ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>
  
      <Sidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
  
      <main
        className="map-area"
        style={{
          padding: '2rem',
          overflowY: 'auto',
          height: '100vh',
        }}
      >
        <h1 style={{ background: 'linear-gradient(to bottom right, #f1f5f9, #e0e7ff)',fontSize: '2.9rem', marginBottom: '1.5rem' }}>
          Live News – Immigration & Safety in New Haven
        </h1>
  
        {news.length === 0 ? (
          <p>Loading news...</p>
        ) : (
          news.map((article, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#f2f2f2',
                borderRadius: '10px',
                padding: '1rem',
                marginBottom: '1.5rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              <p style={{ fontSize: '0.85rem', color: '#333' }}>
                {new Date(article.publishedAt).toLocaleString()}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '1.2rem', color: '#0070f3', fontWeight: 'bold' }}
              >
                {article.title}
              </a>
              <p style={{ marginTop: '0.5rem', color: '#111' }}>{article.description}</p>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: '#555' }}>
                Source: {article.source.name}
              </p>
              {article.image && (
                <img
                  src={article.image}
                  alt="Article"
                  style={{
                    width: '100%',
                    maxHeight: '300px',
                    objectFit: 'cover',
                    marginTop: '1rem',
                    borderRadius: '8px',
                  }}
                />
              )}
            </div>
          ))
        )}
      </main>
    </div>
  );
  
}
