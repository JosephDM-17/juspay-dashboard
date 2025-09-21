import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { useTheme } from '../hooks/useTheme';

const data = [
  { name: "Jan", actual: 17, projected: 20 },
  { name: "Feb", actual: 20, projected: 23 },
  { name: "Mar", actual: 18, projected: 21 },
  { name: "Apr", actual: 22, projected: 26 },
  { name: "May", actual: 14, projected: 17 },
  { name: "Jun", actual: 19, projected: 24 },
];

export default function ProjectionsVsActuals() {
  const { colors } = useTheme();
  
  return (
    <div className="p-6 rounded-xl w-full gap-4" style={{ height: '250px', backgroundColor: colors.cardBackgroundSecondary }}>
      <h3 className="text-sm font-semibold" style={{ color: colors.text }}>Projections vs Actuals</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barSize={25} margin={{ top: 20, right: 30, left: -30, bottom: 5 }}>
          <CartesianGrid vertical={false} stroke={colors.border} />
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
          
          {/* Actuals (bottom, darker blue) */}
          <Bar dataKey="actual" stackId="a" fill="#A8C5DA" radius={[0, 0, 2, 2]} maxBarSize={90} />

          {/* Projections (top, lighter blue) */}
          <Bar dataKey="projected" stackId="a" fill="#A8C5DA66" radius={[2, 2, 0, 0]} maxBarSize={90} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
