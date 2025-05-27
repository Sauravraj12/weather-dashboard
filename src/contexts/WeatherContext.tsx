import React, { createContext, useContext, useState, useEffect,type ReactNode } from 'react';
import type { WeatherData, ForecastData, WeatherContextType } from '../../src/type';
import { fetchWeatherData, fetchForecastData } from '../utils/api';

const WeatherContext = createContext<WeatherContextType>({
  weatherData: null,
  forecastData: null,
  isLoading: false,
  error: null,
  city: '',
  setCity: () => {},
  fetchWeather: async () => {},
  fetchForecast: async () => {},
  tempUnit: 'celsius',
  toggleTempUnit: () => {}
});

export const useWeather = () => useContext(WeatherContext);

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>(() => {
    // Get last searched city from localStorage
    return localStorage.getItem('lastCity') || 'London';
  });
  const [tempUnit, setTempUnit] = useState<'celsius' | 'fahrenheit'>(() => {
    return localStorage.getItem('tempUnit') as 'celsius' | 'fahrenheit' || 'celsius';
  });
  
  // Function to fetch weather data
  const fetchWeather = async (cityName: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherData(cityName);
      setWeatherData(data);
      localStorage.setItem('lastCity', cityName);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to fetch forecast data
  const fetchForecast = async (cityName: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchForecastData(cityName);
      setForecastData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Toggle temperature unit
  const toggleTempUnit = () => {
    setTempUnit(prev => {
      const newUnit = prev === 'celsius' ? 'fahrenheit' : 'celsius';
      localStorage.setItem('tempUnit', newUnit);
      return newUnit;
    });
  };
  
  // Fetch data for the initial city on mount
  useEffect(() => {
    if (city) {
      fetchWeather(city);
      fetchForecast(city);
    }
  }, []);
  
  // Set up polling for weather updates
  useEffect(() => {
    if (!city) return;
    
    // Refresh every 30 seconds
    const intervalId = setInterval(() => {
      fetchWeather(city);
      fetchForecast(city);
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [city]);
  
  return (
    <WeatherContext.Provider value={{
      weatherData,
      forecastData,
      isLoading,
      error,
      city,
      setCity,
      fetchWeather,
      fetchForecast,
      tempUnit,
      toggleTempUnit
    }}>
      {children}
    </WeatherContext.Provider>
  );
};