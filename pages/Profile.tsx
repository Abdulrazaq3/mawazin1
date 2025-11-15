import React, { useState } from 'react';
import { ToastMessage } from '../types';
import { SpinnerIcon } from '../components/icons';

const mockUser = {
  id: 1,
  name: "أحمد القحطاني",
  email: "ahmad@example.com",
  email_verified_at: "2025-11-14T16:00:00.000000Z",
  created_at: "2025-11-14T16:00:00.000000Z",
  updated_at: "2025-11-14T16:00:00.000000Z"
};

const Card: React.FC<{ title: string; children: React.ReactNode; footer?: React.ReactNode }> = ({ title, children, footer }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 animate-fadeIn">
    <h3 className="text-lg font-bold text-slate-800 p-4 sm:p-6 border-b border-slate-200">{title}</h3>
    <div className="p-4 sm:p-6 space-y-4">
        {children}
    </div>
    {footer && (
        <div className="bg-slate-50/70 p-4 sm:p-6 border-t border-slate-200 rounded-b-xl flex justify-end">
            {footer}
        </div>
    )}
  </div>
);

const ToggleSwitch: React.FC<{ enabled: boolean; setEnabled: (enabled: boolean) => void; }> = ({ enabled, setEnabled }) => (
  <button
    type="button"
    onClick={() => setEnabled(!enabled)}
    className={`${
      enabled ? 'bg-teal-500' : 'bg-slate-300'
    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2`}
  >
    <span
      className={`${
        enabled ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
    />
  </button>
);


const Profile: React.FC<{ addToast: (toast: Omit<ToastMessage, 'id'>) => void }> = ({ addToast }) => {
    const [user, setUser] = useState(mockUser);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name);
    const [isProfileSaving, setIsProfileSaving] = useState(false);
    const [isPasswordSaving, setIsPasswordSaving] = useState(false);
    const [isTfaEnabled, setIsTfaEnabled] = useState(false);
    
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirmation: ''
    });

    const handleProfileSave = () => {
        setIsProfileSaving(true);
        setTimeout(() => {
            setUser(prev => ({ ...prev, name }));
            setIsEditing(false);
            setIsProfileSaving(false);
            addToast({ message: 'تم تحديث الملف الشخصي بنجاح', type: 'success' });
        }, 1500);
    };
    
    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirmation) {
            addToast({ message: 'كلمتا المرور الجديدتان غير متطابقتين', type: 'error' });
            return;
        }
        setIsPasswordSaving(true);
        setTimeout(() => {
            setIsPasswordSaving(false);
            setPasswords({ current: '', new: '', confirmation: '' });
            addToast({ message: 'تم تغيير كلمة المرور بنجاح', type: 'success' });
        }, 1500);
    };

    const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswords(prev => ({...prev, [name]: value }));
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
             <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">الملف الشخصي</h2>
                <p className="text-slate-600 mt-1">عرض وتحديث معلومات حسابك الشخصي.</p>
            </div>

            <Card 
                title="المعلومات الشخصية" 
                footer={isEditing && (
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <button onClick={() => { setIsEditing(false); setName(user.name); }} className="bg-white py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50">إلغاء</button>
                        <button onClick={handleProfileSave} disabled={isProfileSaving} className="inline-flex justify-center items-center w-24 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400">
                           {isProfileSaving ? <SpinnerIcon /> : 'حفظ'}
                        </button>
                    </div>
                )}
            >
                 <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-3xl shadow-inner shrink-0">
                        {user.name.charAt(0)}
                    </div>
                    <div className="flex-grow">
                        {isEditing ? (
                             <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700">الاسم</label>
                                <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                            </div>
                        ) : (
                            <div>
                                <h4 className="text-xl font-bold text-slate-800">{user.name}</h4>
                                <p className="text-sm text-slate-500">{user.email}</p>
                            </div>
                        )}
                    </div>
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)} className="text-sm font-semibold text-teal-600 hover:text-teal-500">تعديل</button>
                    )}
                </div>
                 <dl className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-slate-500">تاريخ الإنشاء</dt>
                        <dd className="mt-1 text-sm text-slate-900">{new Date(user.created_at).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}</dd>
                    </div>
                    <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-slate-500">آخر تحديث</dt>
                        <dd className="mt-1 text-sm text-slate-900">{new Date(user.updated_at).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}</dd>
                    </div>
                </dl>
            </Card>

             <form onSubmit={handlePasswordChange}>
                <Card 
                    title="تغيير كلمة المرور"
                    footer={
                        <button type="submit" disabled={isPasswordSaving} className="inline-flex justify-center items-center w-40 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400">
                           {isPasswordSaving ? <SpinnerIcon /> : 'تحديث كلمة المرور'}
                        </button>
                    }
                >
                    <div>
                        <label htmlFor="current" className="block text-sm font-medium text-slate-700">كلمة المرور الحالية</label>
                        <input type="password" name="current" id="current" value={passwords.current} onChange={handlePasswordInputChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                    </div>
                    <div>
                        <label htmlFor="new" className="block text-sm font-medium text-slate-700">كلمة المرور الجديدة</label>
                        <input type="password" name="new" id="new" value={passwords.new} onChange={handlePasswordInputChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                    </div>
                     <div>
                        <label htmlFor="confirmation" className="block text-sm font-medium text-slate-700">تأكيد كلمة المرور الجديدة</label>
                        <input type="password" name="confirmation" id="confirmation" value={passwords.confirmation} onChange={handlePasswordInputChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                    </div>
                </Card>
            </form>

            <Card title="المصادقة الثنائية (2FA)">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium text-slate-800">تمكين المصادقة الثنائية</p>
                        <p className="text-sm text-slate-500">أضف طبقة إضافية من الأمان إلى حسابك.</p>
                    </div>
                    <ToggleSwitch enabled={isTfaEnabled} setEnabled={setIsTfaEnabled} />
                </div>
                {isTfaEnabled && (
                    <div className="mt-4 pt-4 border-t border-slate-200 space-y-4 animate-fadeInFast">
                        <p className="text-sm text-slate-600">
                            1. امسح رمز الاستجابة السريعة هذا باستخدام تطبيق المصادقة الخاص بك.
                        </p>
                        <div className="flex justify-center p-4 bg-white border rounded-lg">
                            <div className="w-40 h-40 bg-slate-200 flex items-center justify-center">
                                <p className="text-slate-500 text-sm">QR Code Placeholder</p>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="tfa-code" className="block text-sm font-medium text-slate-700">2. أدخل رمز التحقق</label>
                            <input type="text" id="tfa-code" placeholder="أدخل الرمز المكون من 6 أرقام" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
                        </div>
                        <div className="flex justify-end">
                            <button
                                 onClick={() => addToast({ message: 'تم تفعيل المصادقة الثنائية!', type: 'success' })}
                                 className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 btn-press"
                             >
                                تفعيل
                            </button>
                        </div>
                    </div>
                )}
            </Card>

            <Card title="نشاط الحساب">
                <ul className="divide-y divide-slate-200">
                    <li className="py-3 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-800">Chrome on Windows</p>
                            <p className="text-sm text-slate-500">الرياض، المملكة العربية السعودية</p>
                        </div>
                        <p className="text-sm text-slate-500">قبل 5 دقائق</p>
                    </li>
                     <li className="py-3 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-800">Safari on iPhone</p>
                            <p className="text-sm text-slate-500">جدة، المملكة العربية السعودية</p>
                        </div>
                        <p className="text-sm text-slate-500">أمس</p>
                    </li>
                </ul>
            </Card>

        </div>
    );
};

export default Profile;