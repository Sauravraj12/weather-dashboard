import React from 'react';
import { Sun, Moon, CloudSun, Droplet as DropletHalf } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useWeather } from '../contexts/WeatherContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { tempUnit, toggleTempUnit } = useWeather();
  
  return (
    <header className="py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <CloudSun className="text-blue-500 mr-2" size={28} />
        <h1 className="text-xl font-bold">Weather Dashboard</h1>
      </div>
      
      <div className="flex space-x-2">
        <button
          onClick={toggleTempUnit}
          className="btn-secondary flex items-center"
          aria-label={`Switch to ${tempUnit === 'celsius' ? 'Fahrenheit' : 'Celsius'}`}
        >
          <DropletHalf size={18} className="mr-1" />
          {tempUnit === 'celsius' ? 'C°' : 'F°'}
        </button>
        
        <button
          onClick={toggleTheme}
          className="btn-secondary"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
};

export default Header;