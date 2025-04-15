export default function AboutPage() {
  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: '#F0EAD6',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        color: '#222',
        lineHeight: '1.8',
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          backgroundColor: '#fff9ec',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          boxShadow: '0 0 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>
          Welcome to <span style={{ color: '#b94e48' }}>Safe Haven Alerts</span>
        </h1>
        <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: '#666' }}>
          Stay Informed. Stay Safe.
        </p>
      </div>

      {/* Mission Statement */}
      <p style={{ fontSize: '1.05rem', marginBottom: '1.5rem' }}>
        Safe Haven Alerts is a community-driven platform designed to empower and protect immigrants and local residents. We provide real-time alerts about:
      </p>

      {/* Alert Categories */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e0d6c3',
          borderRadius: '10px',
          padding: '1rem',
          marginBottom: '2rem',
        }}
      >
        <ul style={{ paddingLeft: '1.2rem', fontSize: '1rem' }}>
          <li>🚨 <strong>Hot Spot:</strong> Caution Area</li>
          <li>🚓 <strong>Law Enforcement Presence</strong></li>
          <li>📣 <strong>Community Support Center</strong></li>
          <li>🏥 <strong>Health & Wellness Site</strong></li>
        </ul>
      </div>

      <p
        style={{
          backgroundColor: '#fef6f2',
          padding: '1rem',
          borderLeft: '4px solid #e87c5c',
          borderRadius: '6px',
          fontSize: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        📍 <strong>Built by the Community, for the Community</strong>
      </p>

      <p style={{ fontSize: '1.05rem', marginBottom: '2rem' }}>
        Safe Haven Alerts was created to help vulnerable communities stay safe, connected, and informed. Our goal is to ensure that everyone — regardless of immigration status — can navigate their neighborhoods with peace of mind.
      </p>

      {/* Contact Info */}
      <div
        style={{
          backgroundColor: '#f4f4f4',
          padding: '1rem',
          marginTop: '2rem',
          borderRadius: '10px',
        }}
      >
        <p style={{ marginBottom: '0.5rem' }}>📞 <strong>Contact Us</strong></p>
        <p>
          Immigration Support Hotline:{' '}
          <strong style={{ color: '#b94e48' }}>555-123-6543</strong>
        </p>
        <p>
          Email:{' '}
          <a
            href="mailto:info@irisct.org "
            style={{ color: '#3333cc', fontWeight: 'bold' }}
          >
            info@irisct.org 
          </a>
        </p>
      </div>
    </div>
  );
}
