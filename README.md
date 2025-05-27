# Weather Dashboard 
A modern weather dashboard built using React, TypeScript, and Vite. This app fetches real-time weather data using the OpenWeatherMap API. It demonstrates skills in API integration, component structure, polling, error handling, and state management using Context API.

# Project Structure
weather-dashboard/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.js
├── vite.config.ts
├── package.json
└── README.md

 #Technologies Used
 
 React + TypeScript – Frontend framework
 Tailwind CSS – Styling
 Axios – API calls
 date-fns – Date formatting
 lucide-react – Icons
 OpenWeatherMap API – Weather data
 LocalStorage – Store last searched city
 Context API – Global state management

Installation & Setup
# 1. Clone the repo
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
✅ Features
 Search weather by city name

 Show temperature, humidity, wind speed, and conditions

 Weather icons from OpenWeatherMap

 Auto-refresh every 30 seconds

 Error handling (invalid city, network issues)

 Last city saved to LocalStorage

 Responsive layout

 (Bonus) Unit toggle: Celsius ↔ Fahrenheit

 (Bonus) 5-day forecast with date-fns formatting

## My Approach
I structured the app by splitting functionality into small reusable components like SearchBar, WeatherCard, ErrorBanner, and used Context API for state sharing. I used Axios for robust API communication, added polling with setInterval in useEffect, and implemented local storage to preserve the last searched city. Tailwind made styling rapid and responsive.

For bonus points, I also integrated:

Temperature unit switching

A 5-day forecast

date-fns for formatting

lucide-react for minimal icons

 ## Screenshots

![capture1](https://github.com/user-attachments/assets/f128484a-d7a6-4124-9f36-2830e543695f)
![Capture2](https://github.com/user-attachments/assets/8db32234-9701-4eea-afc9-03c160ed7f77)
![Capture4](https://github.com/user-attachments/assets/3f360eca-c38f-4a60-92ed-b965fadf2063)
![Capture5](https://github.com/user-attachments/assets/54183d13-5f04-44e4-8d62-adbea669323a)



# Author
saurav raj
