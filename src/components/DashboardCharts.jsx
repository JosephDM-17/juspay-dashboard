import React from 'react';
import { Card, Typography, Row, Col, Table } from 'antd';
import { FlagOutlined } from '@ant-design/icons';
import ProjectionsVsActuals from './projectionVsActual';
import KPICards from './KPICards';
import RevenueLineChart from './revenueLineChart';
import SalesDonutChart from './donutChart';
import { useTheme } from '../contexts/ThemeContext';
const { Title, Text } = Typography;

const DashboardCharts = ({ projectionsData, revenueTrend, revenueByLocation, topSellingProducts, totalSales, kpiData, showOnlyProjections = false, onNavigateToOrders }) => {
  const { colors } = useTheme();



  const DonutChart = () => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      height: '200px',
      position: 'relative'
    }}>
      <div style={{
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        background: 'conic-gradient(from 0deg, #000 0deg 162deg, #722ed1 162deg 270deg, #52c41a 270deg 324deg, #1890ff 324deg 360deg)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70px',
          height: '70px',
          background: colors.cardBackgroundSecondary,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        </div>
        {/* Percentage label on the green segment */}
        <div style={{
          position: 'absolute',
          top: '45%',
          left: '55%',
          transform: 'translate(-50%, -50%)',
          background: '#6B7280',
          color: 'white',
          padding: '2px 6px',
          borderRadius: '8px',
          fontSize: '10px',
          fontWeight: '600',
          whiteSpace: 'nowrap'
        }}>
          38.6%
        </div>
      </div>
    </div>
  );

  const topProductsColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      className: 'bg-transparent',
      render: (text) => <span style={{ color: colors.text, fontSize: '12px', fontWeight: 'normal' }}>{text}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      className: 'bg-transparent',
      render: (text) => <span style={{ color: colors.text, fontSize: '12px', fontWeight: 'normal' }}>{text}</span>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      className: 'bg-transparent',
      render: (text) => <span style={{ color: colors.text, fontSize: '12px', fontWeight: 'normal' }}>{text}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      className: 'bg-transparent',
      render: (text) => <span style={{ color: colors.text, fontSize: '12px', fontWeight: 'normal' }}>{text}</span>,
    },
  ];


  return (
    <div className="space-y-7">
      {/* Row 1: KPI Cards and Projections vs Actual */}
      <Row gutter={[28, 28]}>
        <Col xs={24} lg={12}>
          <KPICards data={kpiData} onNavigateToOrders={onNavigateToOrders} />
        </Col>
        <Col xs={24} lg={12}>
          <ProjectionsVsActuals />
        </Col>
      </Row>

      {/* Row 2: Revenue Chart and Revenue by Location */}
      <Row gutter={[28, 28]}>
        <Col xs={24} lg={18}>
          <RevenueLineChart />
        </Col>
        <Col xs={24} lg={6}>
          <div className="rounded-xl shadow-card p-6 min-w-[200px]" style={{ backgroundColor: colors.cardBackgroundSecondary }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: colors.text }}>Revenue by Location</h3>
            
            {/* World Map */}
            <div className="mb-6 relative">
              <img 
                src="/src/assets/Map.png" 
                alt="World Map" 
                className="w-full h-32 object-contain"
              />
            </div>
            
            {/* Location List with Progress Bars */}
            <div className="space-y-3">
              {revenueByLocation.locations.map((location, index) => {
                const maxRevenue = 100;
                const currentRevenue = parseInt(location.revenue.replace('K', ''));
                const percentage = (currentRevenue / maxRevenue) * 100;
                
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-normal" style={{ color: colors.text }}>{location.name}</span>
                      <span className="text-sm font-normal" style={{ color: colors.text }}>{location.revenue}</span>
                    </div>
                    <div className="w-full bg-[#A8C5DA66] rounded-full h-1">
                      <div 
                        className="bg-[#A8C5DA] h-1 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>

      {/* Row 3: Top Selling Products and Total Sales */}
      <Row gutter={[28, 28]} style={{ alignItems: 'stretch' }}>
        <Col xs={24} lg={18}>
          <div className="rounded-xl shadow-card p-6 h-full" style={{ backgroundColor: colors.cardBackgroundSecondary }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: colors.text }}>Top Selling Products</h3>
            <Table
              columns={topProductsColumns}
              dataSource={topSellingProducts}
              pagination={false}
              size="small"
              className="border-none"
              style={{
                backgroundColor: colors.cardBackgroundSecondary
              }}
              components={{
                header: {
                  cell: (props) => (
                    <th {...props} style={{ 
                      backgroundColor: colors.cardBackgroundSecondary, 
                      border: 'none',
                      borderBottom: `1px solid ${colors.borderSecondary}`,
                      color: colors.textTertiary,
                      fontSize: '12px',
                      fontWeight: 'normal',
                      padding: '8px 12px'
                    }} />
                  ),
                },
                body: {
                  cell: (props) => (
                    <td {...props} style={{ 
                      backgroundColor: colors.cardBackgroundSecondary, 
                      border: 'none',
                      padding: '8px 12px'
                    }} />
                  ),
                },
              }}
            />
          </div>
        </Col>
        <Col xs={24} lg={6}>
          <div className="h-full">
            <SalesDonutChart />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardCharts;
