import React, { useRef } from "react";

const VideoPlayer = ({ rtspUrl }) => {
  const videoRef = useRef(null);

  return (
    <div className="relative">
      <video
        ref={videoRef}
        controls
        autoPlay
        style={{ width: "100%" }}
        className="rounded-2xl"
      >
        <source src={rtspUrl} type="application/x-mpegURL" />
        Your browser does not support video playback.
      </video>

      <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-lg text-sm">
        Live Stream
      </div>
    </div>
  );
};

export default VideoPlayer;
