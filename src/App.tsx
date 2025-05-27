import { useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from '../src/components/CurrentWeather';
import ForecastWeather from './components/ForecastWeather';
import ErrorDisplay from './components/ErrorDisplay';
import { useWeather } from './contexts/WeatherContext';
import { getWeatherTheme } from './utils/api';


function App() {
  const { weatherData } = useWeather();
  
  // Update body class based on weather conditions
  useEffect(() => {
    if (weatherData?.weather?.[0]?.id) {
      const weatherTheme = getWeatherTheme(weatherData.weather[0].id);
      
      // Remove all theme classes first
      document.body.classList.remove('theme-clear', 'theme-clouds', 'theme-rain', 'theme-snow');
      
      // Add the appropriate theme class
      document.body.classList.add(`theme-${weatherTheme}`);
    }
  }, [weatherData]);
  
  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <main className="max-w-4xl mx-auto mt-8">
          <SearchBar />
          <CurrentWeather />
          <ForecastWeather />
        </main>
        
        
      </div>
      
      <ErrorDisplay />
    </div>
  );
}

export default App;