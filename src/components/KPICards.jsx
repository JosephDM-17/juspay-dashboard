import React, { memo, useCallback } from 'react';
import { Card, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';
import { useTheme } from '../hooks/useTheme';

const { Text } = Typography;

// KPI cards component with trend indicators and clickable Orders card
const KPICards = ({ data = [], onNavigateToOrders }) => {
  const { colors } = useTheme();
  
  const colorMap = React.useMemo(() => ({
    background: [colors.kpiCustomer, colors.kpiOrders, colors.kpiRevenue, colors.kpiGrowth],
    text: [colors.kpiTextLight, colors.kpiTextDark, colors.kpiTextDark, colors.kpiTextLight]
  }), [colors]);

  const getCardClassName = useCallback(() => {
    return 'kpi-card';
  }, []);

  const getCardBackgroundColor = useCallback((index) => {
    return colorMap.background[index] || colors.kpiOrders;
  }, [colorMap.background, colors.kpiOrders]);

  const getCardTextColor = useCallback((index) => {
    return colorMap.text[index] || colors.kpiTextDark;
  }, [colorMap.text, colors.kpiTextDark]);

  const getTrendIcon = useCallback((trendType, cardIndex) => {
    const IconComponent = trendType === 'up' ? FaArrowTrendUp : FaArrowTrendDown;
    const iconColor = getCardTextColor(cardIndex);
    
    return (
      <span 
        className="trend-icon-wrapper"
        style={{ 
          display: 'inline-block !important',
          color: iconColor + ' !important',
          fontSize: '14px !important',
          fontWeight: 'bold !important',
          lineHeight: 1,
          verticalAlign: 'middle',
          visibility: 'visible !important',
          opacity: '1 !important'
        }}
        role="img"
        aria-label={`${trendType} trend`}
      >
        <IconComponent 
          className="trend-icon"
          style={{ 
            color: iconColor + ' !important',
            fontSize: '14px !important',
            display: 'inline-block !important',
            verticalAlign: 'middle',
            visibility: 'visible !important',
            opacity: '1 !important',
            fill: iconColor + ' !important'
          }}
        />
      </span>
    );
  }, [getCardTextColor]);


  const handleCardClick = useCallback((index) => {
    if (index === 1 && onNavigateToOrders) { // Orders card
      onNavigateToOrders();
    }
  }, [onNavigateToOrders]);

  if (!data || data.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-4" role="status" aria-live="polite">
        No KPI data available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="region" aria-label="Key Performance Indicators">
      {data.map((kpi, index) => (
        <Card
          key={kpi.id}
          className={`${getCardClassName(kpi.color, index)} card-shadow group`}
          style={{
            backgroundColor: getCardBackgroundColor(index),
            cursor: index === 1 ? 'pointer' : 'default', // Orders card is clickable
            border: 'none'
          }}
          bodyStyle={{ 
            padding: '12px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          hoverable={index !== 1} // Disable hover for Orders card
          onClick={() => handleCardClick(index)}
          role={index === 1 ? "button" : "article"}
          tabIndex={index === 1 ? 0 : -1}
          aria-label={index === 1 ? "Navigate to Orders" : `${kpi.title} KPI card`}
          onKeyDown={(e) => {
            if (index === 1 && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              handleCardClick(index);
            }
          }}
        >
          <div className="flex flex-col flex-1">
            <Text className="text-xs font-medium uppercase tracking-wider block mb-1" style={{ color: getCardTextColor(index) }}>
              {kpi.title}
            </Text>
            <div className="flex justify-between items-center group-hover:flex-row-reverse transition-all duration-300">
              <Text className="text-2xl font-bold leading-tight" style={{ color: getCardTextColor(index) }}>
                {kpi.value}
              </Text>
              <div className="flex items-center gap-1" style={{ backgroundColor: 'transparent' }}>
                {getTrendIcon(kpi.trendType, index)}
                <Text className={`text-xs font-semibold`} style={{ backgroundColor: 'transparent', color: getCardTextColor(index) }}>
                  {kpi.trend}
                </Text>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default memo(KPICards);
