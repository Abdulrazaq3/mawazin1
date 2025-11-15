
import React from 'react';
import { Reminder } from '../types';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';
import { RemindersIcon } from '../components/icons';

const RemindersTable: React.FC<{ reminders: Reminder[], handleMarkReminderAsPaid: (id: number) => void, isLoading: boolean }> = ({ reminders, handleMarkReminderAsPaid, isLoading }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200/80">
      <div className="overflow-x-auto">
        <table className="w-full text-right min-w-[768px]">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider">المستأجر</th>
              <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider">الوحدة</th>
              <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider">العقار</th>
              <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider">مبلغ الإيجار</th>
              <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider">تاريخ الاستحقاق</th>
              <th className="p-4 text-sm font-semibold text-slate-500 text-center uppercase tracking-wider">إجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
             {isLoading ? <SkeletonLoader rows={5} cols={6} /> : reminders.length > 0 ? reminders.map((reminder, index) => (
              <tr key={reminder.id} className="odd:bg-white even:bg-slate-50/50 hover:bg-teal-50/50 transition-colors duration-200 opacity-0 animate-stagger-in" style={{ animationDelay: `${index * 50}ms` }}>
                <td className="p-4 whitespace-nowrap font-semibold text-slate-800">{reminder.tenantName}</td>
                <td className="p-4 whitespace-nowrap text-slate-600">{reminder.unitName}</td>
                <td className="p-4 whitespace-nowrap text-slate-600">{reminder.propertyName}</td>
                <td className="p-4 whitespace-nowrap font-medium text-slate-700">{reminder.rentAmount.toLocaleString()} ر.س</td>
                <td className="p-4 whitespace-nowrap text-slate-600">{new Date(reminder.dueDate).toLocaleDateString('ar-SA')}</td>
                <td className="p-4 whitespace-nowrap text-center">
                   <button onClick={() => handleMarkReminderAsPaid(reminder.id)} className="bg-teal-100 text-teal-800 text-xs font-bold py-2 px-4 rounded-full hover:bg-teal-200 transition btn-press">
                    تحديد كمدفوع
                  </button>
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
         {!isLoading && reminders.length === 0 && (
            <EmptyState
                icon={<RemindersIcon />}
                title="لا توجد تذكيرات مستحقة"
                message="كل شيء على ما يرام! لا توجد دفعات إيجار قادمة في الوقت الحالي."
            />
        )}
      </div>
    </div>
  );
};


const Reminders: React.FC<{ reminders: Reminder[], handleMarkReminderAsPaid: (id: number) => void, isLoading: boolean }> = ({ reminders, handleMarkReminderAsPaid, isLoading }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">تذكيرات الدفع</h2>
          <p className="text-slate-600 mt-1">تابع جميع دفعات الإيجار القادمة والمستحقة.</p>
        </div>
      </div>
      <RemindersTable reminders={reminders} handleMarkReminderAsPaid={handleMarkReminderAsPaid} isLoading={isLoading} />
    </div>
  );
};

export default Reminders;