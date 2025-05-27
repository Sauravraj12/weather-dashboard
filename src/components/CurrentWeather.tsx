import React from 'react';
import { format } from 'date-fns';
import { 
  Thermometer,
  Droplets,
  Wind,
  Sunrise,
  Sunset,
  CloudRain,
  Cloud,
  Sun,
  CloudSnow,
  CloudFog
} from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';
import { celsiusToFahrenheit } from '../utils/api';

const WeatherIcon: React.FC<{ iconCode: string; description: string }> = ({ iconCode, description }) => {
  // Map OpenWeatherMap icon codes to Lucide icons
  const getIcon = () => {
    const iconMap: Record<string, JSX.Element> = {
      '01d': <Sun className="weather-icon text-yellow-500" />,
      '01n': <Sun className="weather-icon text-yellow-300" />,
      '02d': <Cloud className="weather-icon text-gray-500" />,
      '02n': <Cloud className="weather-icon text-gray-400" />,
      '03d': <Cloud className="weather-icon text-gray-500" />,
      '03n': <Cloud className="weather-icon text-gray-400" />,
      '04d': <Cloud className="weather-icon text-gray-600" />,
      '04n': <Cloud className="weather-icon text-gray-500" />,
      '09d': <CloudRain className="weather-icon text-blue-500" />,
      '09n': <CloudRain className="weather-icon text-blue-400" />,
      '10d': <CloudRain className="weather-icon text-blue-500" />,
      '10n': <CloudRain className="weather-icon text-blue-400" />,
      '11d': <CloudRain className="weather-icon text-purple-500" />,
      '11n': <CloudRain className="weather-icon text-purple-400" />,
      '13d': <CloudSnow className="weather-icon text-blue-200" />,
      '13n': <CloudSnow className="weather-icon text-blue-100" />,
      '50d': <CloudFog className="weather-icon text-gray-400" />,
      '50n': <CloudFog className="weather-icon text-gray-300" />
    };
    
    return iconMap[iconCode] || <Cloud className="weather-icon text-gray-500" />;
  };
  
  return (
    <div className="flex flex-col items-center">
      {getIcon()}
      <span className="mt-2 text-sm capitalize text-center">{description}</span>
    </div>
  );
};

const CurrentWeather: React.FC = () => {
  const { weatherData, isLoading, error, tempUnit } = useWeather();
  
  if (isLoading) {
    return (
      <div className="card animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="card bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }
  
  if (!weatherData) {
    return (
      <div className="card">
        <p className="text-gray-500 dark:text-gray-400">Search for a city to see weather information</p>
      </div>
    );
  }
  
  const { main, weather, wind, sys, dt, name } = weatherData;
  const date = new Date(dt * 1000);
  const sunrise = new Date(sys.sunrise * 1000);
  const sunset = new Date(sys.sunset * 1000);
  
  // Format temperature based on selected unit
  const formatTemp = (temp: number) => {
    const value = tempUnit === 'celsius' ? temp : celsiusToFahrenheit(temp);
    return `${Math.round(value)}°${tempUnit === 'celsius' ? 'C' : 'F'}`;
  };
  
  return (
    <div className="card">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">{name}, {sys.country}</h2>
          <p className="text-gray-600 dark:text-gray-400">{format(date, 'EEEE, MMMM d, yyyy h:mm a')}</p>
        </div>
        <WeatherIcon iconCode={weather[0].icon} description={weather[0].description} />
      </div>
      
      <div className="text-center my-6">
        <div className="text-5xl md:text-6xl font-bold">{formatTemp(main.temp)}</div>
        <div className="text-gray-600 dark:text-gray-400 mt-1">Feels like {formatTemp(main.feels_like)}</div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center">
          <Thermometer className="mr-2 text-blue-500" size={20} />
          <div>
            <div className="text-gray-600 dark:text-gray-400">Min/Max</div>
            <div>{formatTemp(main.temp_min)} / {formatTemp(main.temp_max)}</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <Droplets className="mr-2 text-blue-500" size={20} />
          <div>
            <div className="text-gray-600 dark:text-gray-400">Humidity</div>
            <div>{main.humidity}%</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <Wind className="mr-2 text-blue-500" size={20} />
          <div>
            <div className="text-gray-600 dark:text-gray-400">Wind</div>
            <div>{Math.round(wind.speed * 3.6)} km/h</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-2 flex">
            <Sunrise className="text-yellow-500" size={20} />
            <Sunset className="text-orange-500 ml-1" size={20} />
          </div>
          <div>
            <div className="text-gray-600 dark:text-gray-400">Sun</div>
            <div>{format(sunrise, 'h:mm a')} / {format(sunset, 'h:mm a')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;