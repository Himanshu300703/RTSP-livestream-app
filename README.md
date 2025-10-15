# 📹 Full Stack Livestream Overlay Application
This project implements a full-stack web application for viewing a live video stream and adding dynamic, configurable overlays (text, logos) on top of the stream.

# ✨ Features
- Livestream Playback: Displays a video stream, supporting RTSP by converting the feed to browser-compatible HLS (HTTP Live Streaming) using FFmpeg.

- Overlay Management: Users can add, position, and customize text or logo references as overlays directly on the video feed.

- CRUD API: A Python/Flask backend provides a RESTful API to manage (Create, Read, Update, Delete) the overlay configurations.

- Modern UI: The interface is built with React and styled using Tailwind CSS for a professional and responsive design.

- Basic Video Controls: The embedded video player offers standard controls like play, pause, and volume adjustment.

## 💻 Tech Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Backend** | Python (**Flask**), `flask-cors` | Provides the RESTful API for CRUD operations and database interaction. |
| **Database** | **MongoDB** | Persistent storage for all overlay configuration data. |
| **Frontend** | **React**, **Tailwind CSS**, `hls.js` | Renders the UI, video player, and dynamically positions the overlays. |
| **Streaming** | **FFmpeg** & Python HTTP Server | Converts local video/RTSP feed to browser-compatible HLS (`.m3u8`, `.ts`) files and hosts them via HTTP. |

# 🚀 Setup and Run Instructions

This guide provides the complete sequence to launch the **Full Stack Livestream Overlay Application**. The project requires **five concurrent services** across five terminals to stream a local video (simulating RTSP) and run the CRUD API.

### Prerequisites

Ensure the following are installed and accessible globally:

* **Node.js** & **npm/yarn**
* **Python 3.x**
* **MongoDB Server** (running locally, default port 27017)
* **FFmpeg** (installed and accessible via the terminal)
* A local video file (e.g., `C:\Users\john\Downloads\video.mp4`)

---

### - Start Core Services (Database & API)

#### Terminal 1: MongoDB Server 💾

Start the MongoDB daemon process (`mongod`) to listen for database connections.

```bash
mongod
```

#### Terminal 2: Flask Backend API
#### Navigate to the backend folder
```bash
cd backend
```

#### Activate your Python environment (if necessary)
```bash
source venv/bin/activate
```

#### Run the application
```bash
python app.py
```

#### Terminal 3: FFmpeg Stream Source 🎬
#### Create the necessary output directory
```bash
mkdir hls_output
```

#### Run the HLS conversion command (Replace the input file path)
#### This process must remain running!
```bash
ffmpeg -re -i path-to-mp4-from-your-local -codec:v libx264 -preset veryfast -b:v 300k -maxrate 300k -bufsize 600k -f hls -hls_time 2 -hls_list_size 3 -hls_flags delete_segments ./hls_output/live_stream.m3u8
```

#### Terminal 4: Local HTTP Server (Stream Host) 🌐
```bash
cd hls_output
python -m http.server 8080
```

#### Terminal 5: React UI ⚛️
```bash
cd frontend
```

#### Install Node dependencies (if not done)
```bash
npm install
```

#### Start the React app
```bash
npm start
```
The application will open in your browser on http://localhost:3000/.
