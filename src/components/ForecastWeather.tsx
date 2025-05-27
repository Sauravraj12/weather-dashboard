import React from 'react';
import { format } from 'date-fns';
import { 
  Cloud,
  CloudRain,
  CloudSnow,
  CloudFog,
  Sun
} from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';
import type { ForecastItem } from '../../src/type';
import { celsiusToFahrenheit } from '../utils/api';

const ForecastIcon: React.FC<{ iconCode: string }> = ({ iconCode }) => {
  // Simplified icon mapping for forecast
  const getIcon = () => {
    if (iconCode.includes('01')) return <Sun size={24} className="text-yellow-500" />;
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) 
      return <Cloud size={24} className="text-gray-500" />;
    if (iconCode.includes('09') || iconCode.includes('10') || iconCode.includes('11')) 
      return <CloudRain size={24} className="text-blue-500" />;
    if (iconCode.includes('13')) return <CloudSnow size={24} className="text-blue-200" />;
    if (iconCode.includes('50')) return <CloudFog size={24} className="text-gray-400" />;
    
    return <Cloud size={24} className="text-gray-500" />;
  };
  
  return getIcon();
};

const ForecastWeather: React.FC = () => {
  const { forecastData, isLoading, error, tempUnit } = useWeather();
  
  if (isLoading || !forecastData) {
    return (
      <div className="card mt-6 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-5 gap-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return null; // Error is already shown in CurrentWeather
  }
  
  // Process forecast data - get one forecast per day (excluding today)
  const dailyForecasts: ForecastItem[] = [];
  const today = new Date().setHours(0, 0, 0, 0);
  const processedDates = new Set<string>();
  
  forecastData.list.forEach(item => {
    const forecastDate = new Date(item.dt * 1000);
    const dateString = format(forecastDate, 'yyyy-MM-dd');
    
    // Skip forecasts for today
    if (forecastDate.setHours(0, 0, 0, 0) === today) return;
    
    // Add one forecast per day (at noon if possible)
    if (!processedDates.has(dateString)) {
      // Try to find a forecast around noon
      const noonForecast = forecastData.list.find(f => {
        const fDate = new Date(f.dt * 1000);
        return format(fDate, 'yyyy-MM-dd') === dateString && 
               fDate.getHours() >= 11 && 
               fDate.getHours() <= 14;
      });
      
      dailyForecasts.push(noonForecast || item);
      processedDates.add(dateString);
    }
    
    // Limit to 5 days
    if (dailyForecasts.length >= 5) return;
  });
  
  // Format temperature based on selected unit
  const formatTemp = (temp: number) => {
    const value = tempUnit === 'celsius' ? temp : celsiusToFahrenheit(temp);
    return `${Math.round(value)}°`;
  };
  
  return (
    <div className="card mt-6">
      <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {dailyForecasts.map((forecast, index) => {
          const date = new Date(forecast.dt * 1000);
          
          return (
            <div key={index} className="glass p-3 rounded-lg text-center">
              <div className="font-medium">{format(date, 'EEE')}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{format(date, 'MMM d')}</div>
              <div className="my-2 flex justify-center">
                <ForecastIcon iconCode={forecast.weather[0].icon} />
              </div>
              <div className="font-semibold">{formatTemp(forecast.main.temp)}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{forecast.weather[0].description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastWeather;