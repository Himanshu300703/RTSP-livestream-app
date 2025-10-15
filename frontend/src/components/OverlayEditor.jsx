import React, { useState, useEffect } from 'react';

const initialOverlay = { content: '', x: 0, y: 0, width: 0, height: 0, color: '#FFFFFF', fontSize: '18px' };

const OverlayEditor = ({ overlay, onSave, onDelete, onClose }) => {
  const [formData, setFormData] = useState(overlay || initialOverlay);

  useEffect(() => {
    setFormData(overlay || initialOverlay);
  }, [overlay]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!overlay) {
    return <p className="text-gray-500 italic text-center">Select an existing overlay on the video or create a new one to edit its settings.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-medium border-b pb-2 mb-4">
        {formData._id ? `Editing Overlay: ${formData._id.substring(0, 5)}...` : 'New Overlay Details'}
      </h3>
      
      {}
      <div>
        <label className="block text-sm font-medium text-gray-700">Content (Text/Logo Ref)</label>
        <input
          type="text"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      {}
      <div className="grid grid-cols-2 gap-4">
        <label className="block text-sm font-medium text-gray-700">X Position (px)</label>
        <input type="number" name="x" value={formData.x} onChange={handleChange} className="border p-2 rounded" />
        
        <label className="block text-sm font-medium text-gray-700">Y Position (px)</label>
        <input type="number" name="y" value={formData.y} onChange={handleChange} className="border p-2 rounded" />
        
        <label className="block text-sm font-medium text-gray-700">Width (px)</label>
        <input type="number" name="width" value={formData.width} onChange={handleChange} className="border p-2 rounded" />

        <label className="block text-sm font-medium text-gray-700">Height (px)</label>
        <input type="number" name="height" value={formData.height} onChange={handleChange} className="border p-2 rounded" />
      </div>

      {}
      <div className="grid grid-cols-2 gap-4">
        <label className="block text-sm font-medium text-gray-700">Text Color</label>
        <input type="color" name="color" value={formData.color} onChange={handleChange} className="h-10 border p-1 rounded" />
        
        <label className="block text-sm font-medium text-gray-700">Font Size (px)</label>
        <input type="number" name="fontSize" value={parseInt(formData.fontSize)} onChange={(e) => setFormData(prev => ({ ...prev, fontSize: `${e.target.value}px` }))} className="border p-2 rounded" />
      </div>

      {}
      <div className="flex justify-between pt-4 border-t">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {formData._id ? '💾 Update Overlay' : '✨ Save New Overlay'}
        </button>
        
        {formData._id && (
          <button
            type="button"
            onClick={() => onDelete(formData._id)}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            🗑️ Delete
          </button>
        )}
        
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default OverlayEditor;