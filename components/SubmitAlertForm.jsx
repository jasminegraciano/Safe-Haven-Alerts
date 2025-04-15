import { useState } from 'react';

const SubmitAlertForm = () => {
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    address: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch('/api/submit-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert('✅ Alert submitted!');
        setForm({
          title: '',
          category: '',
          description: '',
          address: ''
        });
      } else {
        alert(data.message || 'Failed to submit alert');
      }
    } catch (error) {
      console.error('Error submitting alert:', error);
      alert('Something went wrong.');
    }
  };
  

  return (
    <div style={styles.wrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>📍 Submit a New Alert</h2>

        <input
          name="title"
          placeholder="Alert Title"
          value={form.title}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          name="category"
          placeholder="Category (e.g., Hot Spot, Police)"
          value={form.category}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <textarea
          name="description"
          placeholder="Brief Description"
          value={form.description}
          onChange={handleChange}
          style={styles.textarea}
          required
        />

        <input
          name="address"
          placeholder="Location Address"
          value={form.address}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>🚨 Submit Alert</button>
      </form>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#fef9f4',
    padding: '2rem'
  },
  form: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 0 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1rem',
    fontSize: '1.5rem',
    color: '#222'
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  textarea: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    minHeight: '100px'
  },
  button: {
    padding: '0.9rem',
    fontSize: '1rem',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.3s'
  }
};

export default SubmitAlertForm;
