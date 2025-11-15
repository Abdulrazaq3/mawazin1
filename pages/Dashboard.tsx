
import React from 'react';
import StatCard from '../components/StatCard';
import { Reminder, Page } from '../types';
import { RevenueIcon, ExpenseIcon, ProfitIcon, OccupancyIcon, PlusIcon } from '../components/icons';
import SkeletonLoader from '../components/SkeletonLoader';

const QuickActions: React.FC<{ setCurrentPage: (page: Page) => void }> = ({ setCurrentPage }) => (
  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 sm:rtl:space-x-reverse">
    <button onClick={() => setCurrentPage('العقارات')} className="flex items-center justify-center bg-teal-500 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-teal-600 transition btn-press">
      <PlusIcon />
      <span>إضافة عقار</span>
    </button>
    <button onClick={() => setCurrentPage('المعاملات')} className="flex items-center justify-center bg-white text-slate-700 font-semibold py-2 px-5 rounded-lg border border-slate-300 hover:bg-slate-50 transition btn-press dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-600">
      <PlusIcon />
      <span>إضافة معاملة</span>
    </button>
  </div>
);

const UpcomingRemindersTable: React.FC<{ reminders: Reminder[], handleMarkReminderAsPaid: (id: number) => void, isLoading: boolean }> = ({ reminders, handleMarkReminderAsPaid, isLoading }) => (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200/80 dark:bg-slate-800 dark:border-slate-700">
      <h3 className="text-lg font-bold text-slate-800 mb-4 dark:text-slate-100">التذكيرات القادمة</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-right min-w-[640px]">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider dark:text-slate-400">المستأجر</th>
              <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider dark:text-slate-400">العقار</th>
              <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider dark:text-slate-400">المبلغ</th>
              <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider dark:text-slate-400">الاستحقاق</th>
              <th className="p-4 text-sm font-semibold text-slate-500 text-center uppercase tracking-wider dark:text-slate-400">إجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
             {isLoading ? <SkeletonLoader rows={3} cols={5} /> : reminders.length > 0 ? reminders.map((reminder, index) => (
              <tr key={reminder.id} className="odd:bg-white even:bg-slate-50/50 hover:bg-teal-50/50 transition-colors duration-200 opacity-0 animate-stagger-in dark:odd:bg-slate-800 dark:even:bg-slate-800/50 dark:hover:bg-teal-500/10" style={{ animationDelay: `${index * 50}ms` }}>
                <td className="p-4 whitespace-nowrap font-semibold text-slate-700 dark:text-slate-200">{reminder.tenantName}</td>
                <td className="p-4 whitespace-nowrap text-slate-600 dark:text-slate-300">{reminder.propertyName}</td>
                <td className="p-4 whitespace-nowrap font-medium text-slate-700 dark:text-slate-200">{reminder.rentAmount.toLocaleString()} ر.س</td>
                <td className="p-4 whitespace-nowrap text-slate-600 dark:text-slate-300">{new Date(reminder.dueDate).toLocaleDateString('ar-SA')}</td>
                <td className="p-4 whitespace-nowrap text-center">
                  <button onClick={() => handleMarkReminderAsPaid(reminder.id)} className="bg-teal-100 text-teal-800 text-xs font-bold py-2 px-4 rounded-full hover:bg-teal-200 transition btn-press dark:bg-teal-500/20 dark:text-teal-300 dark:hover:bg-teal-500/30">
                    تحديد كمدفوع
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="text-center py-10 text-slate-500 dark:text-slate-400">
                  لا توجد تذكيرات قادمة.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
);


const Dashboard: React.FC<{ reminders: Reminder[], handleMarkReminderAsPaid: (id: number) => void, setCurrentPage: (page: Page) => void, isLoading: boolean }> = ({ reminders, handleMarkReminderAsPaid, setCurrentPage, isLoading }) => {
  const kpis = [
      { title: "إجمالي الإيرادات", value: 850000, unit: "ر.س", icon: <RevenueIcon />, color: "cyan" },
      { title: "إجمالي المصروفات", value: 250000, unit: "ر.س", icon: <ExpenseIcon />, color: "red" },
      { title: "صافي الربح", value: 600000, unit: "ر.س", icon: <ProfitIcon />, color: "teal" },
      { title: "نسبة الإشغال", value: 92, unit: "%", icon: <OccupancyIcon />, color: "amber" }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">أهلاً بعودتك!</h2>
          <p className="text-slate-600 mt-1 dark:text-slate-400">إليك نظرة عامة على أعمالك اليوم.</p>
        </div>
        <QuickActions setCurrentPage={setCurrentPage} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
             <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200/80 h-[130px] animate-pulse dark:bg-slate-800 dark:border-slate-700">
                <div className="h-8 w-8 bg-slate-200 rounded-md mb-4 dark:bg-slate-700"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4 dark:bg-slate-700"></div>
                    <div className="h-6 bg-slate-200 rounded w-1/2 dark:bg-slate-700"></div>
                </div>
            </div>
          ))
        ) : (
          kpis.map((kpi, index) => (
            <div key={index} className="group opacity-0 animate-stagger-in" style={{ animationDelay: `${index * 100}ms` }}>
              <StatCard {...kpi} />
            </div>
          ))
        )}
      </div>
      
      <UpcomingRemindersTable reminders={reminders} handleMarkReminderAsPaid={handleMarkReminderAsPaid} isLoading={isLoading} />

    </div>
  );
};

export default Dashboard;