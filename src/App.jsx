import React from 'react';
import { ConfigProvider } from 'antd';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890ff',
          },
        }}
      >
        <Dashboard />
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App
