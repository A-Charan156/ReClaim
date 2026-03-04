# ReClaim - Campus Lost-and-Found App

## 📌 Project Overview
ReClaim is a centralized and user-friendly web application designed to improve how college campuses handle lost and found items. By leveraging a web frontend and a robust Node.js/Express backend, ReClaim provides a platform to streamline the recovery process of lost belongings.

---

## 🏗 Software Development Life Cycle (SDLC)

This project strictly adheres to the Agile Software Development Life Cycle to ensure iterative progress, continuous feedback, and high-quality deliverables.

### 1. Requirement Analysis
- **Problem Statement:** College campuses rely on fragmented, manual, and inefficient lost-and-found systems (scattered emails, physical offices) resulting in wasted time and low recovery rates.
- **Solution:** A centralized platform facilitating two-way posting (lost and found) to help users connect and recover items.

### 2. Design Phase
- **UI/UX Design:** Prioritized a mobile-first, responsive design using intuitive forms, seamless navigation, and accessibility standards.
- **Database Design (NoSQL):** Designed highly normalized MongoDB schemas for `Users` and `Items` with precise categorizations to facilitate indexing and fast querying.
- **System Architecture:** Adopted a **Client-Server Architecture** separating the frontend user interface from the backend RESTful API services.

### 3. Implementation (Development)
- **Frontend Development:** Built using Vanilla HTML, CSS, and JavaScript. Implemented service workers (`sw.js`) and a web app manifest (`manifest.json`) for PWA capabilities, ensuring offline resilience and installability.
- **Backend Development:** Developed a scalable RESTful API with Node.js and Express. Implemented standard middleware (CORS, body-parser) and a global error-handling mechanism.
- **Security:** Integrated JWT (JSON Web Tokens) for stateless authentication and `bcryptjs` for secure password hashing.

### 4. Deployment & Maintenance
- **Environment Configuration:** Utilization of `.env` for managing sensitive credentials (MongoDB URI, JWT secret keys) securely across environments.
- **Scalability Strategies:** The stateless API and isolated MongoDB Atlas cloud database setup ensure vertical and horizontal scalability.

---

## 🏛 Software Development Architecture

ReClaim employs a robust **Three-Tier Architecture** pattern.

### 1. Presentation Layer (Frontend)
- **Technologies:** HTML5, CSS3, Vanilla JavaScript.
- **PWA Integration:** Leverages `manifest.json` and a Service Worker (`sw.js`) for caching assets and offline availability.
- **Key Interactivity:** Fully dynamic DOM manipulation for handling authentication modals, tab switching (Login/Signup), and responsive navigation.

### 2. Application Layer (Backend API)
- **Framework:** Node.js with Express.js.
- **Routing:** Granular route handlers divided securely between open routes (`/api/auth`) and protected routes (`/api/items`).
- **Middleware:** 
  - `express.json()` for parsing incoming requests.
  - `cors` for handling Cross-Origin requests.
  - Custom JWT verification middleware for securing item-related transactions.

### 3. Data Layer (Database)
- **Database:** MongoDB (accessed via Mongoose ODM).
- **Core Entities:**
  - **User Schema:** Maintains `name`, `email` (unique), `password` (hashed), and `phone`. Implements pre-save hooks for automatic password salting and hashing.
  - **Item Schema:** Captures `type` (enum: lost/found), `title`, `category`, `location`, `date`, `description`, `image`, `status` (active/claimed/returned), and precise references to the `User` who posted or claimed the item (`postedBy`, `claimedBy`).

---

## 🚀 Setup and Installation Guide

### Prerequisites
- Node.js (v14.x or higher recommended)
- MongoDB Database (Local instance or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/A-Charan156/ReClaim.git
cd ReClaim
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory and define the following environment variables:
   ```env
   PORT=10000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open the project root directory.
2. The frontend is built using standard web technologies. You can serve it using any simple local server (e.g., Live Server extension in VS Code, or `python -m http.server`).
3. Ensure the frontend API calls are pointed to the running backend port defined in your `.env` (default: `http://localhost:10000`).

