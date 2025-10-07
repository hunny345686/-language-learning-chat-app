# 💬 Fullstack Chat & Video Calling App

A **real-time chat and video calling platform** designed for seamless communication and collaboration.  
This project supports **1-on-1 and group chats**, **video calls with screen sharing**, and **language exchange** with **beautiful themes** — all built using **modern, scalable technologies**.

---

## 🌟 Features

### 💬 Messaging
- Real-time chat using WebSockets / Stream API  
- Typing indicators & message reactions  
- Read receipts & message status  
- Group and private conversations  
- Smart notifications & error handling  

### 📹 Video & Audio Calling
- 1-on-1 and group video calls  
- Screen sharing support  
- Call recording functionality  
- Mute/unmute & camera controls  

### 🌐 Language Exchange
- Connect with users globally  
- Choose from **32 unique UI themes**  
- Multilingual support for better user experience  

### 🔐 Authentication & Security
- JWT-based Authentication (Login / Register)  
- Protected routes (frontend & backend)  
- Role-based access & user session management  

### ⚙️ Tech Stack
- **Frontend:** React + TailwindCSS + Zustand + TanStack Query  
- **Backend:** Express.js + Node.js + MongoDB  
- **Real-time:** Stream API / WebSocket  
- **Auth:** JWT + bcrypt  
- **Deployment:** Free & scalable (Vercel + Render)  

### ⚡ Other Highlights
- Robust **error handling** (frontend + backend)  
- Optimized API calls with **TanStack Query**  
- **Global state management** with Zustand  
- **Responsive** and **themeable** UI  
- Built with **scalability** in mind  

---

## 🧠 Architecture Overview
Frontend: React + Zustand + TanStack Query
Backend: Node.js + Express
Database: MongoDB (Mongoose)
Real-time: Stream / Socket.io
Auth: JWT


**Flow:**
1. User signs up / logs in → JWT issued  
2. Frontend stores token → authenticates protected routes  
3. Real-time chat and call data handled by Stream / WebSocket  
4. Zustand manages global app state  
5. TanStack Query optimizes data fetching and caching  

---

## 🚀 Live Demo

🔗 **[View Live App](https://language-learning-chat-app.onrender.com/chat/68e08da0013929ec2f4bdbd3)** 

---

## 🧰 Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/hunny345686/-language-learning-chat-app
cd (folder name)
# frontend
cd client
npm install

# backend
cd ../server
npm install
===== For server ENV ==========
PORT=5000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret
STREAM_API_KEY=your_stream_key
STREAM_API_SECRET=your_stream_secret

===== For client ENV ==========

VITE_API_BASE_URL=http://localhost:5000


# Run backend
cd server
npm run dev

# Run frontend
cd ../client
npm run dev

Frontend → http://localhost:5173
Backend → http://localhost:5000
