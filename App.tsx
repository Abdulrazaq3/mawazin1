import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Tenants from './pages/Tenants';
import Transactions from './pages/Transactions';
import Reports from './pages/Reports';
import Reminders from './pages/Reminders';
import Notes from './pages/Notes';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import LandingPage from './pages/LandingPage';
import Toast from './components/Toast';
import { Page, Property, Tenant, Transaction, Reminder, ToastMessage, Note } from './types';
import { properties as mockProperties, tenants as mockTenants, transactions as mockTransactions, reminders as mockReminders, mockNotes } from './data/mockData';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authScreen, setAuthScreen] = useState<'login' | 'register'>('login');
  const [currentPage, setCurrentPage] = useState<Page>('لوحة التحكم');
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [view, setView] = useState<'landing' | 'auth'>('landing');

  const [properties, setProperties] = useState<Property[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setProperties(mockProperties);
      setTenants(mockTenants);
      setTransactions(mockTransactions);
      setReminders(mockReminders);
      setNotes(mockNotes);
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const theme = localStorage.getItem('theme') || 'system';
      if (theme === 'dark' || (theme === 'system' && mediaQuery.matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    applyTheme();
    
    mediaQuery.addEventListener('change', applyTheme);

    return () => {
      mediaQuery.removeEventListener('change', applyTheme);
    };
  }, []);


  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    setToasts(prev => [...prev, { ...toast, id: Date.now() }]);
  };
  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }

  // Auth Handler
  const handleLogin = (email: string, pass: string) => {
    addToast({ message: 'جارِ التحقق من البيانات...', type: 'info' });
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simple validation for demo purposes
        if (email && pass) {
          setIsLoggedIn(true);
          addToast({ message: 'تم تسجيل الدخول بنجاح!', type: 'success' });
          resolve();
        } else {
          addToast({ message: 'الرجاء إدخال البريد الإلكتروني وكلمة المرور', type: 'error' });
          reject(new Error('Invalid credentials'));
        }
      }, 1500);
    });
  };
  
  // Register Handler
  const handleRegister = (name: string, email: string, pass: string, confirmPass: string) => {
     addToast({ message: 'جارِ إنشاء الحساب...', type: 'info' });
     return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (!name || !email || !pass || !confirmPass) {
          addToast({ message: 'الرجاء ملء جميع الحقول', type: 'error' });
          reject(new Error('All fields are required'));
          return;
        }
        if (pass !== confirmPass) {
          addToast({ message: 'كلمتا المرور غير متطابقتين', type: 'error' });
          reject(new Error('Passwords do not match'));
          return;
        }
        
        // Simulate successful registration
        addToast({ message: 'تم التسجيل بنجاح. الرجاء تسجيل الدخول.', type: 'success' });
        setAuthScreen('login');
        resolve();
      }, 1500);
    });
  };

  // Property Handlers
  const handleAddProperty = (property: Omit<Property, 'id'>) => {
    setProperties(prev => [...prev, { ...property, id: Date.now() }]);
    addToast({ message: 'تمت إضافة العقار بنجاح', type: 'success' });
  };
  const handleUpdateProperty = (updatedProperty: Property) => {
    setProperties(prev => prev.map(p => p.id === updatedProperty.id ? updatedProperty : p));
    addToast({ message: 'تم تحديث العقار بنجاح', type: 'success' });
  };
  const handleDeleteProperty = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العقار؟')) {
      setProperties(prev => prev.filter(p => p.id !== id));
      addToast({ message: 'تم حذف العقار بنجاح', type: 'info' });
    }
  };

  // Tenant Handlers
  const handleAddTenant = (tenant: Omit<Tenant, 'id'>) => {
    setTenants(prev => [...prev, { ...tenant, id: Date.now() }]);
     addToast({ message: 'تمت إضافة المستأجر بنجاح', type: 'success' });
  };
  const handleUpdateTenant = (updatedTenant: Tenant) => {
    setTenants(prev => prev.map(t => t.id === updatedTenant.id ? updatedTenant : t));
    addToast({ message: 'تم تحديث المستأجر بنجاح', type: 'success' });
  };
  const handleDeleteTenant = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المستأجر؟')) {
      setTenants(prev => prev.filter(t => t.id !== id));
      addToast({ message: 'تم حذف المستأجر بنجاح', type: 'info' });
    }
  };

  // Transaction Handlers
  const handleAddTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [{ ...transaction, id: Date.now() }, ...prev]);
    addToast({ message: 'تمت إضافة المعاملة بنجاح', type: 'success' });
  };
  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    setTransactions(prev => prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
    addToast({ message: 'تم تحديث المعاملة بنجاح', type: 'success' });
  };
  const handleDeleteTransaction = (id: number) => {
     if (window.confirm('هل أنت متأكد من حذف هذه المعاملة؟')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
      addToast({ message: 'تم حذف المعاملة بنجاح', type: 'info' });
    }
  };
  
  // Reminder Handler
  const handleMarkReminderAsPaid = (id: number) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    addToast({ message: 'تم تحديد الفاتورة كمدفوعة', type: 'success' });
  };

  // Note Handlers
  const handleAddNote = (note: Omit<Note, 'id'>) => {
    setNotes(prev => [...prev, { ...note, id: Date.now() }]);
    addToast({ message: 'تمت إضافة الملاحظة بنجاح', type: 'success' });
  };
  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(prev => prev.map(n => n.id === updatedNote.id ? updatedNote : n));
    addToast({ message: 'تم تحديث الملاحظة بنجاح', type: 'success' });
  };
  const handleDeleteNote = (id: number) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    addToast({ message: 'تم حذف الملاحظة', type: 'info' });
  };


  const renderPage = () => {
    switch (currentPage) {
      case 'لوحة التحكم':
        return <Dashboard reminders={reminders} handleMarkReminderAsPaid={handleMarkReminderAsPaid} setCurrentPage={setCurrentPage} isLoading={isLoading} />;
      case 'العقارات':
        return <Properties properties={properties} addProperty={handleAddProperty} updateProperty={handleUpdateProperty} deleteProperty={handleDeleteProperty} isLoading={isLoading} />;
      case 'المستأجرون':
        return <Tenants tenants={tenants} addTenant={handleAddTenant} updateTenant={handleUpdateTenant} deleteTenant={handleDeleteTenant} isLoading={isLoading} />;
      case 'المعاملات':
        return <Transactions transactions={transactions} addTransaction={handleAddTransaction} updateTransaction={handleUpdateTransaction} deleteTransaction={handleDeleteTransaction} isLoading={isLoading} />;
      case 'التقارير':
        return <Reports />;
      case 'التذكيرات':
        return <Reminders reminders={reminders} handleMarkReminderAsPaid={handleMarkReminderAsPaid} isLoading={isLoading} />;
      case 'الملاحظات':
        return <Notes notes={notes} addNote={handleAddNote} updateNote={handleUpdateNote} deleteNote={handleDeleteNote} isLoading={isLoading} />;
      case 'الملف الشخصي':
        return <Profile addToast={addToast} />;
      case 'الإعدادات':
        return <Settings addToast={addToast} />;
      default:
        return <Dashboard reminders={reminders} handleMarkReminderAsPaid={handleMarkReminderAsPaid} setCurrentPage={setCurrentPage} isLoading={isLoading} />;
    }
  };
  
  return (
    <>
      <div className="fixed top-4 right-4 z-[100] space-y-2">
          {toasts.map(toast => (
              <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
          ))}
      </div>
      {!isLoggedIn ? (
        view === 'landing' ? (
          <LandingPage onNavigateToAuth={() => setView('auth')} addToast={addToast} />
        ) : authScreen === 'login' ? (
          <Login onLogin={handleLogin} onNavigateToRegister={() => setAuthScreen('register')} onNavigateToLanding={() => setView('landing')} />
        ) : (
          <Register onRegister={handleRegister} onNavigateToLogin={() => setAuthScreen('login')} onNavigateToLanding={() => setView('landing')} />
        )
      ) : (
        <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
          {renderPage()}
        </Layout>
      )}
    </>
  );
};

export default App;