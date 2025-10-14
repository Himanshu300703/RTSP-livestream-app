import React, { useState, useEffect } from 'react';
import StreamVideoPlayer from './components/StreamVideoPlayer'; 
import OverlayEditor from './components/OverlayEditor';
// Assuming your Flask API is running on 5000
const API_BASE_URL = 'http://localhost:5000/api/overlays';
const HLS_STREAM_URL = 'http://localhost:8080/live/stream.m3u8'; // MUST BE CONVERTED STREAM

function App() {
  const [overlays, setOverlays] = useState([]);
  const [selectedOverlay, setSelectedOverlay] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data (CRUD - Read)
  const fetchOverlays = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setOverlays(data);
    } catch (error) {
      console.error("Error fetching overlays:", error);
    }
    setLoading(false);
  };

  // Simplified CRUD handlers (to be passed to OverlayEditor)
  const handleSave = async (overlayData) => {
    const method = overlayData._id ? 'PUT' : 'POST';
    const url = overlayData._id ? `${API_BASE_URL}/${overlayData._id}` : API_BASE_URL;
    
    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(overlayData),
      });
      fetchOverlays(); 
      setSelectedOverlay(null); 
    } catch (error) {
      console.error("Error saving overlay:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
      fetchOverlays();
      setSelectedOverlay(null); 
    } catch (error) {
      console.error("Error deleting overlay:", error);
    }
  };

  const handleNewOverlay = () => {
      setSelectedOverlay({ 
          content: 'NEW LOGO/TEXT', 
          x: 50, y: 50, width: 200, height: 40, 
          color: '#FFFFFF', fontSize: '24px'
      });
  };

  useEffect(() => {
    fetchOverlays();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">📹 RTSP Overlay Dashboard</h1>
        <p className="text-sm text-gray-500">Video source: {HLS_STREAM_URL}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Stream Area (2/3 width) */}
        <div className="lg:col-span-2 relative aspect-video shadow-xl rounded-lg overflow-hidden bg-gray-900">
          <StreamVideoPlayer hlsUrl={HLS_STREAM_URL} />
          
          {/* Overlays Layer */}
          {overlays.map((overlay) => (
            <div
              key={overlay._id}
              className={`absolute p-1 border-2 border-yellow-400 bg-opacity-70 bg-black text-white hover:border-blue-500 transition duration-150 ease-in-out ${selectedOverlay?._id === overlay._id ? 'ring-4 ring-blue-500' : ''}`}
              style={{
                left: `${overlay.x}px`,
                top: `${overlay.y}px`,
                width: `${overlay.width}px`,
                height: `${overlay.height}px`,
                color: overlay.color || '#FFFFFF',
                fontSize: overlay.fontSize || '18px',
                lineHeight: 1, // Better for text alignment
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedOverlay(overlay)}
            >
              {overlay.content}
            </div>
          ))}
        </div>

        {/* Overlay Editor/CRUD Panel (1/3 width) */}
        <div className="lg:col-span-1 bg-white p-6 shadow-xl rounded-lg border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Overlay Management (CRUD)</h2>
          <button 
            onClick={handleNewOverlay}
            className="w-full mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            ➕ Create New Overlay
          </button>
          
          <div className="border-t pt-4">
            <OverlayEditor 
              overlay={selectedOverlay}
              onSave={handleSave}
              onDelete={handleDelete}
              onClose={() => setSelectedOverlay(null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;