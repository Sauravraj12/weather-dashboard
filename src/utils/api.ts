import axios from 'axios';
import type { WeatherData, ForecastData } from '../../src/type';

// OpenWeatherMap API key
// In a real app, this would be stored in a .env file
const API_KEY = '502201d69ad099a8cac619a56cf36561'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetches current weather data for a given city
 */
export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
    }
    throw new Error('Failed to fetch weather data. Please try again later.');
  }
};

/**
 * Fetches 5-day forecast data for a given city
 */
export const fetchForecastData = async (city: string): Promise<ForecastData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
    }
    throw new Error('Failed to fetch forecast data. Please try again later.');
  }
};

/**
 * Converts temperature from Celsius to Fahrenheit
 */
export const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9/5) + 32;
};

/**
 * Gets the appropriate weather theme based on weather condition
 */
export const getWeatherTheme = (weatherId: number): string => {
  // Weather condition codes: https://openweathermap.org/weather-conditions
  if (weatherId >= 200 && weatherId < 600) {
    return 'rain'; // Thunderstorm, Drizzle, Rain
  } else if (weatherId >= 600 && weatherId < 700) {
    return 'snow'; // Snow
  } else if (weatherId >= 700 && weatherId < 800) {
    return 'clouds'; // Atmosphere (fog, mist, etc)
  } else if (weatherId === 800) {
    return 'clear'; // Clear sky
  } else if (weatherId > 800) {
    return 'clouds'; // Clouds
  }
  return 'clear'; // Default
};