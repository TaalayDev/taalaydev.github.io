import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });
  
  // Switch between light and dark themes
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
  
  // Apply theme class to document when theme changes
  useEffect(() => {
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${theme}-theme`);
    
    // Also set the data-theme attribute for tailwind dark mode
    document.documentElement.setAttribute('data-theme', theme);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:scale-110"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden transition-colors duration-500">
        <div 
          className={`absolute inset-0 flex ${
            theme === 'light' ? 'justify-start' : 'justify-end'
          } items-center px-1 transition-all duration-500`}
        >
          {theme === 'light' ? (
            <Sun className="w-4 h-4 text-yellow-500" />
          ) : (
            <Moon className="w-4 h-4 text-blue-400" />
          )}
        </div>
        <div 
          className={`absolute top-1 ${
            theme === 'light' ? 'left-1' : 'left-7'
          } w-4 h-4 bg-white dark:bg-blue-400 rounded-full transition-all duration-500`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;