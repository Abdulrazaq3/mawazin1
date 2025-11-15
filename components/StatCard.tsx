
import React, { useEffect, useState, useRef } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

// Generate some random data for the sparkline
const generateSparklineData = () => {
    return Array.from({ length: 10 }, () => ({
        value: Math.floor(Math.random() * (100 - 20 + 1) + 20)
    }));
};

const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(displayValue);
  
  useEffect(() => {
    let start = ref.current;
    const end = value;
    if (start === end) return;

    const duration = 1200; // ms
    const range = end - start;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const current = Math.floor(progress * range + start);
        setDisplayValue(current);
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            ref.current = end;
        }
    };
    
    requestAnimationFrame(step);

  }, [value]);

  return <>{displayValue.toLocaleString()}</>;
};


interface StatCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, unit }) => {
    const [sparklineData] = useState(generateSparklineData());

    const colorClasses: { [key: string]: string } = {
        cyan: 'text-cyan-700 dark:text-cyan-400',
        red: 'text-red-500 dark:text-red-400',
        teal: 'text-teal-500 dark:text-teal-400',
        amber: 'text-amber-500 dark:text-amber-400',
    };
    const strokeColors: { [key: string]: string } = {
        cyan: '#0891b2', // cyan-600
        red: '#f87171', // red-400
        teal: '#2dd4bf', // teal-400
        amber: '#facc15', // amber-400
    };

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80 flex flex-col justify-between h-full transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 group-hover:scale-[1.02] dark:bg-slate-800 dark:border-slate-700">
      <div className="flex items-center justify-between">
         <div className={colorClasses[color] || 'text-slate-500'}>{icon}</div>
         <div className="w-16 h-8">
            <ResponsiveContainer>
                <LineChart data={sparklineData}>
                    <Line type="monotone" dataKey="value" stroke={strokeColors[color] || '#64748b'} strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
         </div>
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium dark:text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          <AnimatedNumber value={value} /> {unit}
        </p>
      </div>
    </div>
  );
};

export default StatCard;