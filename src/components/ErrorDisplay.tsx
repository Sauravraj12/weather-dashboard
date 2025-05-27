import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';

const ErrorDisplay: React.FC = () => {
  const { error } = useWeather();
  
  if (!error) return null;
  
  return (
    <div className="fixed bottom-4 right-4 max-w-xs bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 shadow-lg animate-fade-in-up">
      <div className="flex items-start">
        <AlertTriangle className="text-red-600 dark:text-red-400 flex-shrink-0 mr-3" size={20} />
        <div>
          <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Error</h3>
          <p className="mt-1 text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;