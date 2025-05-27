import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { WeatherProvider } from '../src/contexts/WeatherContext';
import { ThemeProvider } from '../src/contexts/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </ThemeProvider>
  </StrictMode>
);