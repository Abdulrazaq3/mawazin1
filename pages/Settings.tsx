import React, { useState } from 'react';
import { ToastMessage } from '../types';
import Modal from '../components/Modal';
import { SpinnerIcon } from '../components/icons';

// --- Reusable Components specific to this page ---

const Card: React.FC<{ title: string; children: React.ReactNode; borderColor?: string }> = ({ title, children, borderColor = 'border-slate-200/80' }) => (
  <div className={`bg-white p-4 sm:p-6 rounded-xl shadow-sm border ${borderColor} animate-fadeIn dark:bg-slate-800 dark:border-slate-700`}>
    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-4 mb-6 dark:text-slate-100 dark:border-slate-700">{title}</h3>
    <div className="space-y-4">
        {children}
    </div>
  </div>
);

const ToggleSwitch: React.FC<{ label: string; enabled: boolean; setEnabled: (enabled: boolean) => void; }> = ({ label, enabled, setEnabled }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
    <button
      onClick={() => setEnabled(!enabled)}
      className={`${
        enabled ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-600'
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2`}
    >
      <span
        className={`${
          enabled ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
  </div>
);

const SettingsButton: React.FC<{ onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; children: React.ReactNode; isLoading: boolean; className?: string; disabled?: boolean; }> = ({ onClick, children, isLoading, className, disabled }) => (
    <button
        type="button"
        onClick={onClick}
        disabled={isLoading || disabled}
        className={`inline-flex justify-center items-center w-32 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${className || 'bg-teal-600 hover:bg-teal-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-teal-400 disabled:cursor-not-allowed transition btn-press`}
    >
        {isLoading ? <SpinnerIcon /> : children}
    </button>
);


// --- Main Settings Page Component ---

const Settings: React.FC<{ addToast: (toast: Omit<ToastMessage, 'id'>) => void }> = ({ addToast }) => {
    const [isProfileSaving, setProfileSaving] = useState(false);
    const [isPasswordSaving, setPasswordSaving] = useState(false);
    
    // State for notification toggles
    const [remindersEnabled, setRemindersEnabled] = useState(true);
    const [maintenanceEnabled, setMaintenanceEnabled] = useState(false);
    const [reportsEnabled, setReportsEnabled] = useState(true);

    const [theme, setThemeState] = useState(() => localStorage.getItem('theme') || 'system');
    
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

    const setTheme = (newTheme: string) => {
        localStorage.setItem('theme', newTheme);
        setThemeState(newTheme);

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (newTheme === 'dark' || (newTheme === 'system' && mediaQuery.matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const handleSave = (setter: React.Dispatch<React.SetStateAction<boolean>>, message: string) => {
        setter(true);
        setTimeout(() => {
            setter(false);
            addToast({ message, type: 'success' });
        }, 1500);
    };
    
    const handleDeleteAccount = () => {
        if (deleteConfirmationText !== 'حذف حسابي') return;
        setIsDeleting(true);
         setTimeout(() => {
            setIsDeleting(false);
            setDeleteModalOpen(false);
            addToast({ message: 'تم حذف الحساب بنجاح', type: 'info' });
            // Here you would typically log the user out and redirect
        }, 2000);
    }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">الإعدادات</h2>
        <p className="text-slate-600 mt-1 dark:text-slate-400">إدارة ملفك الشخصي وتفضيلات حسابك.</p>
      </div>

      <Card title="معلومات الملف الشخصي">
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <div className="relative">
                <div className="w-20 h-20 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-4xl shadow-md dark:bg-teal-600">أ</div>
                <button className="absolute bottom-0 left-0 bg-white rounded-full p-1.5 shadow-md hover:bg-slate-100 transition dark:bg-slate-600 dark:hover:bg-slate-500">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600 dark:text-slate-300" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
                </button>
            </div>
            <div className="flex-grow">
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">الاسم</label>
                <input type="text" id="name" defaultValue="أحمد" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
            </div>
        </div>
        <div>
             <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">البريد الإلكتروني</label>
             <input type="email" id="email" value="ahmad@example.com" readOnly className="mt-1 block w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-md shadow-sm cursor-not-allowed dark:bg-slate-700/50 dark:border-slate-600 dark:text-slate-400" />
        </div>
        <div className="flex justify-end">
            <SettingsButton onClick={() => handleSave(setProfileSaving, 'تم تحديث الملف الشخصي بنجاح')} isLoading={isProfileSaving}>حفظ التغييرات</SettingsButton>
        </div>
      </Card>
      
      <Card title="تغيير كلمة المرور">
        <div>
            <label htmlFor="current-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">كلمة المرور الحالية</label>
            <input type="password" id="current-password" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
        </div>
        <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">كلمة المرور الجديدة</label>
            <input type="password" id="new-password" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
        </div>
        <div className="flex justify-end">
            <SettingsButton onClick={() => handleSave(setPasswordSaving, 'تم تغيير كلمة المرور بنجاح')} isLoading={isPasswordSaving}>تغيير كلمة المرور</SettingsButton>
        </div>
      </Card>
      
      <Card title="تفضيلات الإشعارات">
        <ToggleSwitch label="تذكيرات الدفع القادمة" enabled={remindersEnabled} setEnabled={setRemindersEnabled} />
        <ToggleSwitch label="تنبيهات الصيانة" enabled={maintenanceEnabled} setEnabled={setMaintenanceEnabled} />
        <ToggleSwitch label="إرسال التقارير الشهرية بالبريد" enabled={reportsEnabled} setEnabled={setReportsEnabled} />
      </Card>

      <Card title="المظهر">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[{id: 'light', name: 'فاتح'}, {id: 'dark', name: 'داكن'}, {id: 'system', name: 'النظام'}].map(item => (
                 <button key={item.id} onClick={() => setTheme(item.id)} className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${theme === item.id ? 'border-teal-500 ring-2 ring-teal-500/30' : 'border-slate-300 hover:border-teal-400 dark:border-slate-600 dark:hover:border-teal-500'}`}>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{item.name}</span>
                 </button>
            ))}
        </div>
      </Card>
      
      <Card title="منطقة الخطر" borderColor="border-red-300 dark:border-red-500/50">
        <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
                 <p className="font-semibold text-slate-800 dark:text-slate-200">حذف الحساب</p>
                 <p className="text-sm text-slate-500 dark:text-slate-400">سيتم حذف جميع بياناتك بشكل دائم. لا يمكن التراجع عن هذا الإجراء.</p>
            </div>
            <button onClick={() => setDeleteModalOpen(true)} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 rounded-lg shadow-sm transition btn-press">
                حذف حسابي
            </button>
        </div>
      </Card>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="تأكيد حذف الحساب">
        <div className="space-y-4">
            <p className="text-slate-600 dark:text-slate-300">هذا الإجراء لا يمكن التراجع عنه. سيؤدي هذا إلى حذف جميع بياناتك نهائيًا، بما في ذلك العقارات والمستأجرين والمعاملات.</p>
            <p className="text-slate-600 dark:text-slate-300">لتأكيد الحذف، يرجى كتابة <strong className="text-red-600 dark:text-red-500">"حذف حسابي"</strong> في المربع أدناه.</p>
            <div>
                 <label htmlFor="delete-confirm" className="sr-only">تأكيد الحذف</label>
                 <input 
                    type="text" 
                    id="delete-confirm" 
                    value={deleteConfirmationText}
                    onChange={(e) => setDeleteConfirmationText(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    placeholder='حذف حسابي'
                />
            </div>
            <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-4">
                <button type="button" onClick={() => setDeleteModalOpen(false)} className="bg-white py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-600">
                    إلغاء
                </button>
                <SettingsButton 
                    onClick={handleDeleteAccount} 
                    isLoading={isDeleting} 
                    className={`bg-red-600 hover:bg-red-700 focus:ring-red-500 disabled:!bg-slate-400 dark:disabled:!bg-slate-600 disabled:cursor-not-allowed`}
                    disabled={deleteConfirmationText !== 'حذف حسابي'}
                >
                    أنا أفهم، قم بالحذف
                </SettingsButton>
            </div>
        </div>
      </Modal>

    </div>
  );
};

export default Settings;