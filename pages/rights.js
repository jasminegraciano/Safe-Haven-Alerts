import Sidebar from '../components/Sidebar';
import Head from 'next/head';

export default function KnowYourRights() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      </Head>
      
      <div style={{
  background: 'linear-gradient(to bottom right, #f1f5f9, #e0e7ff)',
  minHeight: '100vh',
  padding: '2rem',
  fontFamily: "'Poppins', sans-serif"
}}>
        <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', padding: '2rem' }}>
          <header style={{ backgroundColor: '#1e3a8a', padding: '1.5rem', color: 'white', borderRadius: '8px' }}>
            <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Know Your Rights</h1>
            <p style={{ marginTop: '0.5rem' }}>Empowering you with essential legal knowledge in your community.</p>
          </header>

          <section style={{ marginTop: '2rem', lineHeight: '1.8' }}>
            <div style={{ backgroundColor: '#f9f9f9', padding: '1rem', marginBottom: '1rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h2><span style={{ backgroundColor: '#e0f7fa', padding: '0.3rem 0.6rem', borderRadius: '50%', marginRight: '0.5rem' }}>🧠</span>Stay Informed</h2>
              <p>Everyone has rights when interacting with law enforcement or government officials. <mark>Understanding your rights</mark> helps protect yourself and others in your community.</p>
            </div>

            <div style={{ backgroundColor: '#f9f9f9', padding: '1rem', marginBottom: '1rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h2>🪪 Identification</h2>
              <p>You may be required to show ID in certain situations. Always ask if you are legally required to present it and if you are free to go.</p>
            </div>

            <div style={{ backgroundColor: '#f9f9f9', padding: '1rem', marginBottom: '1rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h2>🤐 <span style={{ color: '#0070f3', fontWeight: 'bold' }}>Right to Remain Silent</span></h2>
              <p>You are not required to answer all questions. You can say, “I choose to remain silent.”</p>
            </div>

            <div style={{ backgroundColor: '#f9f9f9', padding: '1rem', marginBottom: '1rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h2>🏡 At Your Home</h2>
              <p>Officers generally need a warrant to enter your home. You can ask to see the warrant before allowing entry.</p>
            </div>

            <div style={{ backgroundColor: '#f9f9f9', padding: '1rem', marginBottom: '1rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h2><span style={{ backgroundColor: '#e0f7fa', padding: '0.3rem 0.6rem', borderRadius: '50%', marginRight: '0.5rem' }}>🚓</span>During Stops or Interactions</h2>
              <p><mark>Stay calm and respectful</mark>. Ask if you are being detained or if you are free to leave. You have the right to record the interaction if it is legal in your state.</p>
            </div>

            <div style={{ backgroundColor: '#f9f9f9', padding: '1rem', marginBottom: '1rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h2>📞 Legal Help</h2>
              <p>You have the right to speak to a lawyer. Don’t sign anything or share documents you don’t understand without legal advice.</p>
            </div>

            <div style={{ backgroundColor: '#f9f9f9', padding: '1rem', marginBottom: '1rem', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h2>🤝 Community Support</h2>
              <p>Stay connected to trusted organizations, local sanctuaries, and community groups that can assist in difficult situations.</p>
            </div>
          </section>

          <div style={{ backgroundColor: '#fff3cd', borderLeft: '6px solid #ffc107', padding: '1rem', margin: '1rem 0' }}>
            <strong>⚠️ Tip:</strong> You have the right to remain silent. Say, "I choose to remain silent."
          </div>

          <div style={{
            backgroundColor: '#fff7e6',
            borderLeft: '5px solid #f59e0b',
            padding: '1rem 1.5rem',
            borderRadius: '6px',
            marginTop: '2rem',
            fontStyle: 'italic',
            fontSize: '1rem'
          }}>
            ✨ Knowledge is power. Share this information with your family and friends.
          </div>
        </div>
      </div>
    </>
  );
}
