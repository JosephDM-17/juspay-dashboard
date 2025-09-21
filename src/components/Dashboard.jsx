import React, { useState, useCallback, memo } from 'react';
import { Layout, Input, Button, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FiSun, FiBell, FiLayout, FiStar } from 'react-icons/fi';
import { MdHistory } from 'react-icons/md';
import OrderList from './OrderList';
import RightSidebar from './RightSidebar';
import ECCommerceDashboard from './ECCommerceDashboard';
import Sidebar from './Sidebar';
import { useTheme } from '../hooks/useTheme';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

// Main dashboard layout with sidebar navigation and responsive design
const Dashboard = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [selectedDashboard, setSelectedDashboard] = useState('default');

  const [expandedKeys, setExpandedKeys] = useState(['user-profile']);
  const [selectedPageItem, setSelectedPageItem] = useState('user-profile');
  const [selectedDashboardItem, setSelectedDashboardItem] = useState('ecommerce');
  const [expandedDashboardItems, setExpandedDashboardItems] = useState(['ecommerce']);
  const [currentView, setCurrentView] = useState('ecommerce');
  const [showOrderList, setShowOrderList] = useState(false);

  const handleToggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  const handleToggleRightCollapsed = useCallback(() => {
    setRightCollapsed(!rightCollapsed);
  }, [rightCollapsed]);

  const handleToggleNotifications = useCallback(() => {
    if (rightCollapsed) {
      setRightCollapsed(false);
      setShowNotifications(true);
    } else if (showNotifications) {
      setRightCollapsed(true);
      setShowNotifications(false);
    } else {
      setShowNotifications(true);
    }
  }, [rightCollapsed, showNotifications]);

  const handleNavigateToOrders = useCallback(() => {
    setShowOrderList(true);
    setRightCollapsed(true);
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setShowOrderList(false);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar
        collapsed={collapsed}
        selectedDashboardItem={selectedDashboardItem}
        setSelectedDashboardItem={setSelectedDashboardItem}
        expandedDashboardItems={expandedDashboardItems}
        setExpandedDashboardItems={setExpandedDashboardItems}
        currentView={currentView}
        setCurrentView={setCurrentView}
        setShowOrderList={setShowOrderList}
        selectedPageItem={selectedPageItem}
        setSelectedPageItem={setSelectedPageItem}
        expandedKeys={expandedKeys}
        setExpandedKeys={setExpandedKeys}
        setRightCollapsed={setRightCollapsed}
      />

      <Layout 
        className={`transition-all duration-200 ${
          collapsed ? 'ml-0' : 'ml-0 sm:ml-70'
        } ${rightCollapsed ? 'mr-0' : 'mr-0 sm:mr-70'}`}
      >
        <Header 
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between sticky top-0 z-50 px-4 sm:px-6 py-4 sm:py-0"
          style={{ 
            background: colors.headerBackground, 
            borderBottom: `1px solid ${colors.border}`
          }}
        >
        <div className="flex items-center gap-2 sm:gap-6 mb-4 sm:mb-0">
          <Button 
            type="text" 
            icon={<FiLayout style={{ fontSize: '16px' }} />}
            title="Collapse Left Sidebar"
            onClick={handleToggleCollapsed}
            className="transition-all duration-200 rounded-md"
            style={{ color: colors.headerText }}
          />
          
          <div className="flex items-center gap-2">
            <Button 
              type="text" 
              icon={<FiStar style={{ fontSize: '16px' }} />} 
              className="transition-all duration-200 rounded-md"
              style={{ color: colors.headerText }}
            />
            
            <div className="flex items-center gap-1 ml-2">
              <Text 
                className="text-sm cursor-pointer transition-colors duration-200"
                style={{ color: colors.headerTextSecondary }}
                onClick={() => setSelectedDashboard('dashboards')}
              >
                Dashboards
              </Text>
              <Text className="text-sm" style={{ color: colors.headerTextSecondary }}>/</Text>
              <Text 
                className={`text-sm cursor-pointer transition-all duration-200 ${
                  selectedDashboard === 'default' ? 'font-medium' : 'font-normal'
                }`}
                style={{ 
                  color: selectedDashboard === 'default' ? colors.headerText : colors.headerTextSecondary
                }}
                onClick={() => setSelectedDashboard('default')}
              >
                Default
              </Text>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            suffix={<span className="hidden sm:inline text-xs" style={{ color: colors.textTertiary }}>⌘ /</span>}
            className="w-full sm:w-48"
          />
          <Button 
            type="text" 
            icon={<FiSun style={{ fontSize: '16px' }} />}
            title={isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
            onClick={toggleTheme}
            className="transition-all duration-200"
            style={{ color: colors.headerText }}
          />
          <Button 
            type="text" 
            icon={<MdHistory style={{ fontSize: '16px' }} />}
            title="History"
            className="transition-all duration-200"
            style={{ color: colors.headerText }}
          />
          <Button 
            type="text" 
            icon={<FiBell style={{ fontSize: '16px' }} />}
            title="Notifications"
            onClick={handleToggleNotifications}
            className="transition-all duration-200"
            style={{ color: colors.headerText }}
          />
          <Button 
            type="text" 
            icon={<FiLayout style={{ fontSize: '16px' }} />}
            title="Collapse Right Sidebar"
            onClick={handleToggleRightCollapsed}
            className="transition-all duration-200"
            style={{ color: colors.headerText }}
          />
        </div>
        </Header>

        <Content 
          className="p-0"
          style={{ background: colors.background }}
        >
          {showOrderList ? (
            <OrderList onBackToDashboard={handleBackToDashboard} />
          ) : (
            <>
              {currentView === 'ecommerce' && <ECCommerceDashboard onNavigateToOrders={handleNavigateToOrders} />}
              {currentView === 'orders' && <OrderList onBackToDashboard={handleBackToDashboard} />}
              {currentView === 'default-dashboard' && <ECCommerceDashboard onNavigateToOrders={handleNavigateToOrders} />}
            </>
          )}
        </Content>
      </Layout>

      <RightSidebar 
        collapsed={rightCollapsed} 
        showNotifications={showNotifications}
        onToggleNotifications={() => setShowNotifications(!showNotifications)}
      />
    </Layout>
  );
};

export default memo(Dashboard);
