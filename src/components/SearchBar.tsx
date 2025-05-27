import React, { useState, type FormEvent } from 'react';
import { Search } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';

const SearchBar: React.FC = () => {
  const { city, setCity, fetchWeather, fetchForecast } = useWeather();
  const [searchInput, setSearchInput] = useState(city);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!searchInput.trim()) return;
    
    setIsSearching(true);
    
    try {
      setCity(searchInput);
      await fetchWeather(searchInput);
      await fetchForecast(searchInput);
    } finally {
      setIsSearching(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-6">
      <div className="relative">
        <input
          type="text"
          className="input pr-12"
          placeholder="Search for a city..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          disabled={isSearching}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50"
          disabled={isSearching}
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;