import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

const COLORS = ['#14b8a6', '#EF4444']; // teal-500 for Revenue, Red-500 for Expense

const TransactionTypePieChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            animationDuration={800}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `${value.toLocaleString()} ر.س`}
            contentStyle={{
                backgroundColor: 'var(--recharts-tooltip-bg)',
                borderColor: 'var(--recharts-tooltip-border)',
                color: 'var(--recharts-text-color)',
                borderRadius: '0.5rem'
            }}
          />
          <Legend wrapperStyle={{ fontSize: '14px', color: 'var(--recharts-text-color)' }}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionTypePieChart;