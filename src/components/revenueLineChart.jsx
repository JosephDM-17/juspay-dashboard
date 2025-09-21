import React from 'react';
import { Card, Typography } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { useTheme } from '../contexts/ThemeContext';

const { Title, Text } = Typography;

const data = [
  { name: "Jan", current: 12, previous: 7, currentSolid: 12, currentDashed: null },
  { name: "Feb", current: 7, previous: 17, currentSolid: 7, currentDashed: null },
  { name: "Mar", current: 7, previous: 10, currentSolid: 7, currentDashed: null },
  { name: "Apr", current: 13, previous: 10, currentSolid: 13, currentDashed: 13 },
  { name: "May", current: 20, previous: 18, currentSolid: null, currentDashed: 20 },
  { name: "Jun", current: 19, previous: 23, currentSolid: null, currentDashed: 19 },
];

export default function RevenueLineChart() {
  const { colors, isDarkMode } = useTheme();
  
  return (
    <div className="rounded-xl shadow-card p-6" style={{ backgroundColor: colors.cardBackgroundSecondary }}>
      <div className="flex items-center mb-6">
        <h3 className="text-sm font-semibold" style={{ color: colors.text }}>Revenue  <span className="text-sm px-4" style={{ color: colors.textTertiary }}>|</span></h3>
        <div className="flex items-center gap-6 ml-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isDarkMode ? '#C6C7F8' : colors.text }}></div>
            <span className="text-xs font-normal" style={{ color: colors.text }}>Current Week <span className='text-xs font-semibold'>$58,211</span></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#A8C5DA]"></div>
            <span className="text-sm" style={{ color: colors.text }}>Previous Week  <span className='text-xs font-semibold'>$68,768</span></span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={294}>
        <LineChart data={data} margin={{ top: 10, right: 30, left: -20, bottom: 10 }}>
          <CartesianGrid horizontal={true} vertical={false} stroke={colors.border} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 12, fill: colors.textSecondary }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tickFormatter={(v) => `${v}M`}
            tick={{ fontSize: 10, fill: colors.textSecondary }}
            domain={[0, 30]}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: colors.cardBackground,
              border: `1px solid ${colors.border}`,
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              color: colors.text
            }}
          />
          
          {/* Current Week - Solid part (Jan to Apr) */}
          <Line
            type="monotone"
            dataKey="currentSolid"
            stroke={isDarkMode ? '#C6C7F8' : colors.text}
            strokeWidth={3}
            dot={false}
            connectNulls={false}
          />

          {/* Current Week - Dashed part (Apr to Jun) */}
          <Line
            type="monotone"
            dataKey="currentDashed"
            stroke={isDarkMode ? '#C6C7F8' : colors.text}
            strokeWidth={3}
            dot={false}
            strokeDasharray="5 5"
            connectNulls={false}
          />

          {/* Previous Week (light blue line) */}
          <Line
            type="monotone"
            dataKey="previous"
            stroke="#A8C5DA"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
