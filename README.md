# Talknet - Modern MERN Stack Chat Application

Talknet is a real-time, high-performance chat platform built using the **MERN** stack (MongoDB, Express, React, and Node.js). It provides a seamless communication experience with secure authentication and real-time data flow.

## 🚀 Features

- **💬 Real-time Messaging**: Instant communication powered by asynchronous handling.
- **🔐 Secure Authentication**: User login and signup with **JWT** (JSON Web Tokens) and **bcrypt** for password hashing.
- **📁 Structured Data**: Organized chat and message history using MongoDB and Mongoose.
- **📱 Responsive Interface**: A modern, clean UI built with React and Vite.
- **🛠️ Scalable Architecture**: Separate frontend and backend directories for better manageability.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, React Router, Context API.
- **Backend**: Node.js, Express.
- **Database**: MongoDB with Mongoose.
- **Security**: JWT for session management, bcryptjs for password security.

## 📂 Project Structure

- **`/backend`**: Node.js/Express server logic, database models, controllers, and routes.
- **`/frontend`**: React/Vite user interface components and pages.

## 📖 Getting Started

### 1. Backend Setup
1. Navigate to the root folder.
2. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   MONGO_URI="your_mongodb_connection_string"
   JWT_SECRET="your_secure_secret_key"
   ```
3. Install dependencies and start:
   ```bash
   npm install
   npm start
   ```

### 2. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

---
*Developed by Himanshu.*
