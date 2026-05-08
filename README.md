# Multi-User Weather Dashboard 🌦️

Weather Desk is a full-stack weather dashboard application that supports multiple users with secure authentication, isolated city dashboards, persistent favorites, live weather updates, and an AI-powered planning assistant.

The application allows users to save cities, monitor weather conditions, manage favorites, and receive smart weather insights powered by AI.

---

# 🚀 Features

- 🔐 User Authentication (Register/Login/Logout)
- 👥 Multi-user Support with Isolated Dashboards
- 🌍 Real-time Weather Data
- 📍 Add Multiple Cities by Name
- ⭐ Persistent Favorite Cities
- 🌡️ Current Weather + Forecast
- 🤖 AI Weather Planning Assistant
- ☔ Weather Risk Planning
- 🔒 JWT-based Authorization
- 📱 Responsive UI with Tailwind CSS

---

# 🏗️ Project Structure

```bash
MULTI-USER-WEATHER-DASHBOARD/
│
├── backend/
│   │
│   ├── node_modules/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── frontend/
│   │
│   ├── .next/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── node_modules/
│   ├── .env.local
│   ├── next.config.mjs
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.mjs
│   └── tailwind.config.js
│
└── README.md


🛠️ Tech Stack
Frontend


Next.js


React.js


Tailwind CSS


Backend


Node.js


Express.js


Database


MongoDB with Mongoose


Authentication


JWT Bearer Tokens


bcrypt Password Hashing


Weather API


Open-Meteo Geocoding API


Open-Meteo Forecast API


AI Integration


LangChain


OpenAI API


Deterministic Fallback Insight Engine



✨ Core Functionalities
🔐 Authentication System


User Registration


User Login


Session Restoration


Secure Logout


Protected Routes using JWT


Passwords are securely hashed using bcrypt before storage.

🌍 Weather Dashboard
Users can:


Add multiple cities


View live weather data


Check short forecasts


Save favorite cities


Monitor weather conditions dynamically



🤖 AI Weather Planner
The AI planner analyzes saved weather data and provides:


Weather summaries


Travel/outdoor suggestions


Rain risk alerts


Warmest city recommendations


If OPENAI_API_KEY is unavailable, the system automatically switches to a fallback planner so the feature always works.

🔒 Authorization & Data Isolation
Every city query is scoped using:
req.user._id
This ensures users can only access their own weather dashboard data.
Even if a user guesses another city ID, they cannot access unauthorized records.

⚙️ Local Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/multi-user-weather-dashboard.git

2️⃣ Backend Setup
Navigate to backend:
cd backend
Install dependencies:
npm install
Create .env file:
PORT=5000MONGO_URI=your_mongodb_connection_stringJWT_SECRET=your_secret_keyOPENAI_API_KEY=your_openai_keyCLIENT_ORIGIN=http://localhost:3000
Run backend server:
npm run dev
Backend runs on:
http://localhost:5000

3️⃣ Frontend Setup
Navigate to frontend:
cd frontend
Install dependencies:
npm install
Create .env.local:
NEXT_PUBLIC_API_URL=http://localhost:5000/api
Run frontend:
npm run dev
Frontend runs on:
http://localhost:3000

🧠 Backend Architecture
The backend follows a modular architecture:
📂 routes/
Defines API endpoints and request routes.
📂 controllers/
Handles request logic and responses.
📂 models/
Defines MongoDB schemas and database models.
📂 middleware/
Contains JWT authentication middleware.
📂 services/
Handles weather API integration and AI planner logic.

📡 API & Services
Weather Service
Integrated with Open-Meteo APIs for:


City Geocoding


Current Weather


Forecast Data


AI Service
Uses:


LangChain


ChatOpenAI


Deterministic fallback planner


to generate weather-based recommendations.

🚀 Deployment
Recommended Deployment Stack
Frontend


Vercel


Backend


Render


Railway


Fly.io


Database


MongoDB Atlas



🔐 Environment Variables
Backend
PORT=MONGO_URI=JWT_SECRET=OPENAI_API_KEY=CLIENT_ORIGIN=
Frontend
NEXT_PUBLIC_API_URL=
Never commit environment variables to GitHub.

⚠️ Known Limitations


No automated tests yet


No caching layer for weather API requests


JWT stored in local storage


City search currently selects the first geocoding result only



📈 Future Improvements


🌙 Dark Mode


📊 Weather Analytics Charts


📅 Extended Forecasts


🔔 Weather Notifications


🗺️ Better City Selection UX


⚡ API Caching


🧪 Automated Testing


🍪 HttpOnly Cookie Authentication



🤝 Contributing
Contributions are welcome.
Create a feature branch
git checkout -b feature-name
Commit changes
git commit -m "Added new feature"
Push branch
git push origin feature-name
Then open a Pull Request.

📄 License
This project is licensed under the MIT License.

👨‍💻 Author
Ajeet Baghel


GitHub: https://github.com/your-username



