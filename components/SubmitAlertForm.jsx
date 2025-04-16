import { useState } from 'react';

const SubmitAlertForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'COMMUNITY_CENTER',
    description: '',
    address: '',
    latitude: '',
    longitude: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    
    try {
      console.log("📝 Starting form submission...");
      console.log("Form data:", formData);
      
      // Validate form data before sending
      if (!formData.title || !formData.category || !formData.description || !formData.address || !formData.latitude || !formData.longitude) {
        throw new Error("Please fill in all fields");
      }

      console.log("🔄 Sending request to /api/submit-report...");
      const response = await fetch('/api/submit-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      }).catch(error => {
        console.error("Network error:", error);
        throw new Error("Network error - please check your connection");
      });

      if (!response) {
        throw new Error("No response from server");
      }

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
        console.log("📦 Response data:", data);
      } else {
        console.error("Received non-JSON response:", await response.text());
        throw new Error("Server returned invalid response format");
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit alert');
      }

      console.log("✅ Alert submitted successfully:", data);
      setSuccess(true);
      alert("Alert submitted successfully!");

      // Clear form
      setFormData({
        title: '',
        category: 'COMMUNITY_CENTER',
        description: '',
        address: '',
        latitude: '',
        longitude: ''
      });

      // Refresh the map markers
      console.log("🔄 Refreshing map markers...");
      if (window.refreshMapAlerts) {
        await window.refreshMapAlerts();
      }

    } catch (error) {
      console.error("❌ Submit error:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack
      });
      setError(error.message);
      alert("Error submitting alert: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {error && (
        <div style={{ 
          color: 'red', 
          backgroundColor: '#fee', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '10px'
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{ 
          color: 'green', 
          backgroundColor: '#efe', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '10px'
        }}>
          Alert submitted successfully!
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="COMMUNITY_CENTER">Community Center</option>
          <option value="PUBLIC_SAFETY">Public Safety</option>
          <option value="LAW_ENFORCEMENT_PRESENCE">Law Enforcement Presence</option>
          <option value="HOTSPOT">Hotspot</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="3"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Latitude</label>
          <input
            type="number"
            step="any"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Longitude</label>
          <input
            type="number"
            step="any"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Alert'}
      </button>
    </form>
  );
};

export default SubmitAlertForm;
