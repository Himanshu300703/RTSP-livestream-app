import React from "react";
import VideoPlayer from "./components/VideoPlayer";
import OverlayEditor from "./components/OverlayEditor";

const rtspUrl = "http://localhost:8554/stream.m3u8";


function App() {
  const rtspUrl = "http://localhost:8554/stream.m3u8"; // example stream
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        RTSP Livestream with Overlays
      </h1>

      <div className="bg-black rounded-2xl shadow-lg overflow-hidden w-full max-w-3xl mb-6">
        <VideoPlayer rtspUrl={rtspUrl} />
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl">
        <OverlayEditor />
      </div>
    </div>
  );
}

export default App;
