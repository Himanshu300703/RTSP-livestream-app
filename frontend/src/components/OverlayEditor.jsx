import React, { useState, useEffect } from "react";
import axios from "../api/overlayAPI";

const OverlayEditor = () => {
  const [overlays, setOverlays] = useState([]);
  const [text, setText] = useState("");

  const fetchOverlays = async () => {
    const res = await axios.get("/");
    setOverlays(res.data);
  };

  useEffect(() => {
    fetchOverlays();
  }, []);

  const createOverlay = async () => {
    if (!text.trim()) return;
    await axios.post("/", { text });
    setText("");
    fetchOverlays();
  };

  const deleteOverlay = async (id) => {
    await axios.delete(`/${id}`);
    fetchOverlays();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Overlay Manager</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter overlay text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border rounded-lg p-2 w-full focus:outline-blue-500"
        />
        <button
          onClick={createOverlay}
          className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {overlays.map((o) => (
          <li
            key={o._id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
          >
            <span>{o.text}</span>
            <button
              onClick={() => deleteOverlay(o._id)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OverlayEditor;
