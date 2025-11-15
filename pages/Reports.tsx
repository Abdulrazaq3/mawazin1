
import React from 'react';
import { reportData } from '../data/mockData';
import { DownloadIcon } from '../components/icons';
import TransactionTypePieChart from '../components/charts/TransactionTypePieChart';
import MonthlyNetProfitBarChart from '../components/charts/MonthlyNetProfitBarChart';
import CategoryBarChart from '../components/charts/CategoryBarChart';
import StatCard from '../components/StatCard';
import { RevenueIcon, ExpenseIcon, ProfitIcon, OccupancyIcon } from '../components/icons';

const Reports: React.FC = () => {
  const { kpis, transactionDistribution, monthlyNetProfit, categoryData } = reportData;
  const kpiCards = [
      { title: "إجمالي الإيرادات", value: kpis.totalRevenue, unit: "ر.س", icon: <RevenueIcon />, color: "cyan" },
      { title: "إجمالي المصروفات", value: kpis.totalExpenses, unit: "ر.س", icon: <ExpenseIcon />, color: "red" },
      { title: "صافي الربح", value: kpis.netProfit, unit: "ر.س", icon: <ProfitIcon />, color: "teal" },
      { title: "نسبة الإشغال", value: kpis.occupancyRate, unit: "%", icon: <OccupancyIcon />, color: "amber" }
  ];

  return (
    <div className="space-y-8">
       <div className="flex justify-between items-center flex-wrap gap-4 no-print">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">التقارير المالية</h2>
          <p className="text-slate-600 mt-1">نظرة شاملة على الأداء المالي لعقاراتك.</p>
        </div>
        <button onClick={() => window.print()} className="flex items-center bg-teal-500 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-teal-600 transition btn-press w-full sm:w-auto justify-center">
          <DownloadIcon />
          <span>تصدير PDF</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 print-container">
         {kpiCards.map((kpi, index) => (
            <div key={index} className="group opacity-0 animate-stagger-in" style={{ animationDelay: `${index * 100}ms` }}>
              <StatCard {...kpi} />
            </div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 print-container">
          <h3 className="text-lg font-bold text-slate-800 mb-4">توزيع المعاملات</h3>
          <TransactionTypePieChart data={transactionDistribution} />
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 print-container">
           <h3 className="text-lg font-bold text-slate-800 mb-4">صافي الربح الشهري</h3>
           <MonthlyNetProfitBarChart data={monthlyNetProfit} />
        </div>
      </div>

       <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 print-container">
           <h3 className="text-lg font-bold text-slate-800 mb-4">الإيرادات والمصروفات حسب الفئة</h3>
           <CategoryBarChart data={categoryData} />
        </div>

    </div>
  );
};

export default Reports;