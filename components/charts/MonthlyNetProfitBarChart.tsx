
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
  name: string;
  profit: number;
}

const MonthlyNetProfitBarChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 40,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--recharts-grid-color)" />
          <XAxis dataKey="name" tick={{fill: 'var(--recharts-text-color)', fontSize: 12}} angle={-45} textAnchor="end" interval={0} dy={10} />
          <YAxis 
            tickFormatter={(value) => `${(value as number) / 1000} ألف`} 
            tick={{fill: 'var(--recharts-text-color)', fontSize: 12}}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            formatter={(value: number) => [`${value.toLocaleString()} ر.س`, 'صافي الربح']} 
            cursor={{ fill: 'rgba(20, 184, 166, 0.1)' }}
            contentStyle={{
                backgroundColor: 'var(--recharts-tooltip-bg)',
                borderColor: 'var(--recharts-tooltip-border)',
                borderRadius: '0.5rem'
            }}
          />
          <Legend wrapperStyle={{ fontSize: '14px', direction: 'rtl' }} />
          <Bar dataKey="profit" fill="#14b8a6" name="صافي الربح" animationDuration={800} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyNetProfitBarChart;