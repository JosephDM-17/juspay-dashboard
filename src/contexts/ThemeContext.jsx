import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Default to dark mode as per the uploaded images
    return true;
  });

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Apply theme to document body
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      // Dark theme colors (matching the uploaded images)
      background: isDarkMode ? '#1a1a1a' : '#ffffff',
      surface: isDarkMode ? '#2a2a2a' : '#ffffff',
      surfaceSecondary: isDarkMode ? '#1e1e1e' : '#f7f9fb',
      text: isDarkMode ? '#ffffff' : '#1c1c1c',
      textSecondary: isDarkMode ? '#cccccc' : '#666666',
      textTertiary: isDarkMode ? '#999999' : '#999999',
      border: isDarkMode ? '#404040' : '#f0f0f0',
      borderSecondary: isDarkMode ? '#333333' : '#e5e5e5',
      primary: isDarkMode ? '#1890ff' : '#1890ff',
      success: isDarkMode ? '#52c41a' : '#52c41a',
      warning: isDarkMode ? '#faad14' : '#faad14',
      error: isDarkMode ? '#ff4d4f' : '#ff4d4f',
      info: isDarkMode ? '#13c2c2' : '#13c2c2',
      // Card backgrounds with 10% opacity
      cardBackground: isDarkMode ? 'rgba(42, 42, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      cardBackgroundSecondary: isDarkMode ? 'rgba(30, 30, 30, 0.9)' : 'rgba(247, 249, 251, 0.9)',
      // KPI card specific colors - mixed theme approach
      kpiCustomer: isDarkMode ? '#E3F5FF' : '#E3F5FF', // Light theme colors for Customer
      kpiOrders: isDarkMode ? '#1e1e1e' : '#F7F9FB', // Dark theme colors for Orders
      kpiRevenue: isDarkMode ? '#1e1e1e' : '#F7F9FB', // Dark theme colors for Revenue
      kpiGrowth: isDarkMode ? '#E5ECF6' : '#E5ECF6', // Light theme colors for Growth
      // Text colors for KPI cards
      kpiTextLight: isDarkMode ? '#000000' : '#1C1C1C', // Dark text for light background cards
      kpiTextDark: isDarkMode ? '#ffffff' : '#1C1C1C', // White text for dark background cards
      // Table colors
      tableHeader: isDarkMode ? '#1e1e1e' : '#F7F9FB',
      tableRow: isDarkMode ? '#2a2a2a' : '#F7F9FB',
      tableRowHover: isDarkMode ? '#333333' : '#f5f5f5',
      tableRowSelected: isDarkMode ? '#1a2332' : '#e6f7ff',
      // Sidebar colors
      sidebarBackground: isDarkMode ? '#1e1e1e' : '#ffffff',
      sidebarText: isDarkMode ? '#ffffff' : '#000000',
      sidebarTextSecondary: isDarkMode ? '#cccccc' : '#666666',
      sidebarActive: isDarkMode ? '#2a2a2a' : '#f5f5f5',
      // Header colors
      headerBackground: isDarkMode ? '#1e1e1e' : '#ffffff',
      headerText: isDarkMode ? '#ffffff' : '#000000',
      headerTextSecondary: isDarkMode ? '#cccccc' : '#999999',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
