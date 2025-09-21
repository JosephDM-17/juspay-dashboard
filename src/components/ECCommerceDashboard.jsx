import React, { useState, useEffect } from 'react';
import { Card, Typography, Spin } from 'antd';
import { fetchDashboardData } from '../api/dashboardData';
import KPICards from './KPICards';
import DashboardCharts from './DashboardCharts';
import { useTheme } from '../hooks/useTheme';

const { Title } = Typography;

const ECCommerceDashboard = ({ onNavigateToOrders }) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!dashboardData) {
    return <div>Error loading dashboard data</div>;
  }

  return (
    <div className="p-6 bg-white" style={{ backgroundColor: colors.background }}>
      <div className="mb-6">
        <h3 className="text-sm font-semibold" style={{ color: colors.text }}>
          eCommerce
        </h3>
      </div>

      {/* Full Dashboard Charts */}
      <DashboardCharts
        projectionsData={dashboardData.projectionsData}
        revenueTrend={dashboardData.revenueTrend}
        revenueByLocation={dashboardData.revenueByLocation}
        topSellingProducts={dashboardData.topSellingProducts}
        totalSales={dashboardData.totalSales}
        kpiData={dashboardData.kpis}
        showOnlyProjections={false}
        onNavigateToOrders={onNavigateToOrders}
      />
    </div>
  );
};

export default ECCommerceDashboard;
