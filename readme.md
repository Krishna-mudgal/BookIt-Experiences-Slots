# BookIt Experiences - Full Stack Web Application

## Overview
BookIt Experiences is a booking platform where users can browse experiences, select dates and times, apply promo codes, and confirm bookings. The project consists of a React frontend and a Node.js/Express backend with MongoDB Atlas as the database.

---

## Project Structure
- **backend/**  
  Contains the Express.js backend API, controllers, models, and routes:
  - Controllers handle business logic for bookings, promos, and experiences.
  - Models define schemas for MongoDB collections.
  - Routes expose endpoints like `/experiences`, `/bookings`, and `/promos`.
- **frontend/**  
  React app built with Vite, includes pages for browsing experiences, checkout, and booking confirmation.
- Other files and config such as `.env` for environment variables, and package.json files for both backend and frontend.

---

## Features
- Browse experience details with available dates and times.
- Responsive UI built with Tailwind CSS.
- Apply promo codes with validation including minimum amount logic.
- Booking submission with form validation and summary.
- Booking confirmation page with reference ID.
- Backend API integrated with MongoDB Atlas, deployed on Render.
- Frontend hosted as static site on Render, communicating securely with backend.

---

## Installation and Setup

### Backend
1. Navigate to `backend/`
2. Run `npm install`
3. Create `.env` file with MongoDB URI etc.
4. Run server locally `node index.js` or `npm start`

### Frontend
1. Navigate to `frontend/`
2. Run `npm install`
3. Add `.env` with `REACT_APP_BACKEND_URL` pointing to deployed backend.
4. Run locally with `npm run dev`

---

## Environment Variables
- Backend `.env`:
MONGO_URI=your_mongodb_connection_string

text
- Frontend `.env`:
VITE_BACKEND_URL=https://your-backend-url

text

---

## Deployment
- Backend and frontend deployed separately on Render.
- Ensure MongoDB Atlas allows Render's outbound IPs.
- Frontend fetch URLs should use environment variable for backend URL.

---

## Technologies
- React 18 with Vite
- Tailwind CSS
- Node.js with Express
- MongoDB Atlas
- Render.com for hosting

---

## How to Use
- Browse experiences on homepage.
- Select experience to see details and available slots.
- Select date, time, quantity, and apply promo if any.
- Confirm booking and view confirmation page with reference.

---

## Contact / Support
For questions or contributions, please contact krishnamudgal44@gmail.com or open an issue on the repo.