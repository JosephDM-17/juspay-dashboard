import React, { useState } from 'react';
import { Menu, Typography, Tabs } from 'antd';
import { LuUser, LuUsers, LuShield } from 'react-icons/lu';
import { PiChartPieSlice, PiShoppingBagOpen } from 'react-icons/pi';
import { FiBookOpen } from 'react-icons/fi';
import { BsFolder } from 'react-icons/bs';
import { FileTextOutlined, MessageOutlined, RightOutlined, DownOutlined } from '@ant-design/icons';
import { useTheme } from '../hooks/useTheme';

const { Text } = Typography;

const Sidebar = ({ 
  collapsed, 
  selectedDashboardItem, 
  setSelectedDashboardItem, 
  expandedDashboardItems, 
  setExpandedDashboardItems,
  setCurrentView,
  setShowOrderList,
  selectedPageItem,
  setSelectedPageItem,
  expandedKeys,
  setExpandedKeys,
  setRightCollapsed
}) => {
  const { colors, isDarkMode } = useTheme();
  const [activeTab] = useState('favorites');

  const favoritesItems = [
    { key: 'overview', label: 'Overview' },
    { key: 'projects', label: 'Projects' }
  ];

  const recentlyItems = [
    { key: 'recent-overview', label: 'Overview' },
    { key: 'recent-projects', label: 'Projects' }
  ];

  const dashboardItems = [
    {
      key: 'default-dashboard',
      icon: <PiChartPieSlice style={{ fontSize: '16px', color: colors.sidebarText }} />,
      label: 'Default',
      // No children - not collapsible
    },
    {
      key: 'ecommerce',
      icon: <PiShoppingBagOpen style={{ fontSize: '16px', color: colors.sidebarText }} />,
      label: 'eCommerce',
      children: [
        { key: 'ecommerce-dashboard', label: 'Dashboard' },
        { key: 'ecommerce-orders', label: 'Orders' },
        { key: 'ecommerce-products', label: 'Products' },
      ]
    },
    {
      key: 'projects-dashboard',
      icon: <BsFolder style={{ fontSize: '16px', color: colors.sidebarText }} />,
      label: 'Projects',
      children: [
        { key: 'projects-list', label: 'All Projects' },
        { key: 'projects-active', label: 'Active' },
        { key: 'projects-completed', label: 'Completed' },
      ]
    },
    {
      key: 'courses',
      icon: <FiBookOpen style={{ fontSize: '16px', color: colors.sidebarText }} />,
      label: 'Online Courses',
      children: [
        { key: 'courses-list', label: 'All Courses' },
        { key: 'courses-my', label: 'My Courses' },
        { key: 'courses-certificates', label: 'Certificates' },
      ]
    },
  ];

  const pagesItems = [
    {
      key: 'user-profile',
      icon: <LuUser style={{ fontSize: '16px', color: colors.sidebarText }} />,
      label: 'User Profile',
      children: [
        { key: 'pages-overview', label: 'Overview' },
        { key: 'pages-projects', label: 'Projects' },
        { key: 'campaigns', label: 'Campaigns' },
        { key: 'documents', label: 'Documents' },
        { key: 'followers', label: 'Followers' },
      ],
    },
    {
      key: 'account',
      icon: <LuShield style={{ fontSize: '16px', color: colors.sidebarText }} />,
      label: 'Account',
    },
    {
      key: 'corporate',
      icon: <LuUsers style={{ fontSize: '16px', color: colors.sidebarText }} />,
      label: 'Corporate',
    },
    {
      key: 'blog',
      icon: <FileTextOutlined style={{ fontSize: '16px', color: colors.sidebarText }} />,
      label: 'Blog',
    },
    {
      key: 'social',
      icon: <MessageOutlined style={{ fontSize: '16px', color: colors.sidebarText }} />,
      label: 'Social',
    },
  ];

  return (
    <div 
      className={`fixed left-0 top-0 bottom-0 z-50 transition-all duration-200 ${
        collapsed ? 'w-0 overflow-hidden' : 'w-70'
      } ${collapsed ? 'hidden' : 'block'} sm:block`}
      style={{ 
        backgroundColor: colors.sidebarBackground,
        borderRight: `1px solid ${colors.border}`
      }}
    >
      {/* Logo Section */}
      <div className="p-5">
        <div className="flex items-center gap-3">
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ 
              backgroundColor: isDarkMode ? '#ffffff' : '#f3f4f6',
              border: `1px solid ${isDarkMode ? '#e5e7eb' : '#d1d5db'}`
            }}
          >
            <img 
              src="/src/assets/ByeWind.png" 
              alt="ByeWind" 
              className="h-5 w-auto"
              style={{ 
                filter: 'none'
              }} 
            />
          </div>

          <Text 
            strong 
            className="text-lg"
            style={{ color: colors.sidebarText }}
          >
            ByeWind
          </Text>
        </div>
      </div>

      <div className="py-5">
        {/* Favorites/Recently Tabs */}
        <div className="px-5 mb-5">
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
            <div
              className={`px-0 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'favorites'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-500 dark:text-gray-400'
              }`}
            >
              Favorites
            </div>
            <div
              className={`px-0 py-2 text-sm font-medium border-b-2 transition-colors ml-6 ${
                activeTab === 'recently'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-500 dark:text-gray-400'
              }`}
            >
              Recently
            </div>
          </div>
          
          <div className="pl-2">
            {(activeTab === 'favorites' ? favoritesItems : recentlyItems).map(item => (
              <div 
                key={item.key} 
                className="px-3 py-1 my-1 rounded-md cursor-pointer hover:bg-opacity-10 hover:bg-white transition-colors flex items-center"
                style={{ color: colors.sidebarText }}
              >
                <div 
                  className="w-1.5 h-1.5 rounded-full mr-3"
                  style={{ backgroundColor: colors.sidebarTextSecondary }}
                />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Dashboards Section */}
        <div className="px-5 mb-5">
          <Text 
            className="block text-xs font-medium uppercase tracking-wider mb-3"
            style={{ color: colors.sidebarTextSecondary }}
          >
            Dashboards
          </Text>
          
          <Menu
            mode="inline"
            items={dashboardItems}
            selectedKeys={[selectedDashboardItem]}
            expandedKeys={expandedDashboardItems}
            onSelect={({ key }) => {
              setSelectedDashboardItem(key);
              if (key === 'default-dashboard') {
                setCurrentView('default-dashboard');
                setRightCollapsed(false); // Show right sidebar for Default
              } else {
                setCurrentView('default-dashboard'); // Always navigate to dashboard
              }
              setShowOrderList(false);
            }}
            onOpenChange={(keys) => setExpandedDashboardItems(keys)}
            className="border-none bg-transparent text-sm"
            style={{
              color: colors.sidebarText,
              backgroundColor: 'transparent',
            }}
            theme={isDarkMode ? 'dark' : 'light'}
          />
          
          <style>{`
            .ant-menu-item-selected {
              background-color: ${isDarkMode ? '#374151' : '#f3f4f6'} !important;
              border-left: 3px solid ${isDarkMode ? '#C6C7F8' : '#000000'} !important;
            }
            .ant-menu-item-selected .ant-menu-title-content {
              color: ${colors.sidebarText} !important;
            }
            .ant-menu-submenu-selected > .ant-menu-submenu-title {
              background-color: ${isDarkMode ? '#374151' : '#f3f4f6'} !important;
            }
            .ant-menu-submenu-selected > .ant-menu-submenu-title .ant-menu-title-content {
              color: ${colors.sidebarText} !important;
            }
            .ant-menu-submenu-open > .ant-menu-submenu-title {
              background-color: transparent !important;
            }
            .ant-menu-submenu-open > .ant-menu-submenu-title .ant-menu-title-content {
              color: ${colors.sidebarText} !important;
            }
            .ant-menu-submenu .ant-menu-item {
              background-color: transparent !important;
            }
            .ant-menu-submenu .ant-menu-item:hover {
              background-color: ${isDarkMode ? '#374151' : '#f3f4f6'} !important;
            }
            .ant-menu-submenu .ant-menu-item-selected {
              background-color: ${isDarkMode ? '#374151' : '#f3f4f6'} !important;
              border-left: 3px solid ${isDarkMode ? '#C6C7F8' : '#000000'} !important;
            }
          `}</style>
        </div>

        {/* Pages Section */}
        <div className="px-5">
          <Text 
            className="block text-xs font-medium uppercase tracking-wider mb-3"
            style={{ color: colors.sidebarTextSecondary }}
          >
            Pages
          </Text>
          
          <Menu
            mode="inline"
            items={pagesItems}
            selectedKeys={[selectedPageItem]}
            expandedKeys={expandedKeys}
            onSelect={({ key }) => {
              setSelectedPageItem(key);
              setCurrentView('default-dashboard'); // Always navigate to dashboard
            }}
            onOpenChange={setExpandedKeys}
            className="border-none bg-transparent text-sm"
            style={{
              color: colors.sidebarText,
              backgroundColor: 'transparent',
            }}
            theme={isDarkMode ? 'dark' : 'light'}
          />
          
          <style>{`
            .ant-menu-item-selected {
              background-color: ${isDarkMode ? '#374151' : '#f3f4f6'} !important;
              border-left: 3px solid ${isDarkMode ? '#C6C7F8' : '#000000'} !important;
            }
            .ant-menu-item-selected .ant-menu-title-content {
              color: ${colors.sidebarText} !important;
            }
            .ant-menu-submenu-selected > .ant-menu-submenu-title {
              background-color: ${isDarkMode ? '#374151' : '#f3f4f6'} !important;
            }
            .ant-menu-submenu-selected > .ant-menu-submenu-title .ant-menu-title-content {
              color: ${colors.sidebarText} !important;
            }
            .ant-menu-submenu-open > .ant-menu-submenu-title {
              background-color: transparent !important;
            }
            .ant-menu-submenu-open > .ant-menu-submenu-title .ant-menu-title-content {
              color: ${colors.sidebarText} !important;
            }
            /* Hide right arrows and style left arrows */
            .ant-menu-submenu .ant-menu-submenu-arrow {
              color: ${colors.sidebarTextSecondary} !important;
              transition: transform 0.3s ease !important;
              position: absolute !important;
              left: 16px !important;
              right: auto !important;
            }
            .ant-menu-submenu-open .ant-menu-submenu-arrow {
              transform: rotate(90deg) !important;
            }
            /* Hide any right-side arrows */
            .ant-menu-submenu-title .ant-menu-submenu-arrow:last-child {
              display: none !important;
            }
          `}</style>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
