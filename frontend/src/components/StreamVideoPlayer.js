// frontend/src/components/StreamVideoPlayer.js
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const StreamVideoPlayer = ({ hlsUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const video = videoRef.current;
      const hls = new Hls();
      
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play(); // Auto-play the stream
      });

      // Basic error handling for the stream
      hls.on(Hls.Events.ERROR, function (event, data) {
        if (data.fatal) {
          console.error(`HLS Fatal Error: ${data.details}`, data);
          // Optional: Re-create HLS instance on fatal error
        }
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      // Fallback for native HLS support (e.g., Safari)
      videoRef.current.src = hlsUrl;
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current.play();
      });
    }

    return () => {
      // Cleanup
      if (videoRef.current && videoRef.current.hls) {
        videoRef.current.hls.destroy();
      }
    };
  }, [hlsUrl]);

  return (
    <div className="relative w-full h-full bg-black">
      <video 
        ref={videoRef} 
        className="w-full h-full object-cover" 
        controls // Provides basic controls: play, pause, volume
        poster="placeholder.jpg"
      />
    </div>
  );
};

export default StreamVideoPlayer;