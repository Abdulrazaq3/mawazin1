import React, { useState } from 'react';
import { MawazinLogo, AtSymbolIcon, LockClosedIcon, SpinnerIcon, ArrowRightIcon } from '../components/icons';

interface LoginProps {
  onLogin: (email: string, pass: string) => Promise<void>;
  onNavigateToRegister: () => void;
  onNavigateToLanding: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigateToRegister, onNavigateToLanding }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onLogin(email, password);
      // If login is successful, App component will handle the re-render.
    } catch (error) {
      // If login fails, stop loading.
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 flex flex-col md:flex-row">
      <div style={{backgroundColor: '#023337'}} className="w-full md:w-1/2 text-white flex flex-col justify-center items-center p-8 md:p-12 order-2 md:order-1 animate-fadeIn">
        <MawazinLogo className="h-24 w-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
          إدارة عقاراتك بذكاء وسهولة
        </h1>
        <p className="text-lg text-cyan-200 text-center max-w-md">
          منصة "موازين" تمنحك التحكم الكامل لإدارة الممتلكات والمستأجرين والمعاملات المالية بكفاءة عالية.
        </p>
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center p-8 order-1 md:order-2">
        <div className="w-full max-w-md">
           <button onClick={onNavigateToLanding} className="flex items-center text-sm text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group mb-6">
            <ArrowRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            <span>العودة إلى الرئيسية</span>
          </button>
          <div className="w-full space-y-8 animate-scaleIn">
              <div>
                <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-slate-100">
                  تسجيل الدخول إلى حسابك
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
                  أهلاً بك مجدداً! يرجى إدخال بياناتك.
                </p>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                     <label htmlFor="email-address" className="sr-only">البريد الإلكتروني</label>
                     <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <AtSymbolIcon />
                        </div>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none rounded-t-md relative block w-full pr-10 pl-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
                            placeholder="البريد الإلكتروني"
                        />
                     </div>
                  </div>
                  <div>
                     <label htmlFor="password" className="sr-only">كلمة المرور</label>
                     <div className="relative">
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <LockClosedIcon />
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none rounded-b-md relative block w-full pr-10 pl-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
                            placeholder="كلمة المرور"
                        />
                     </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                    />
                    <label htmlFor="remember-me" className="mr-2 block text-sm text-slate-900 dark:text-slate-200">
                      تذكرني
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
                      هل نسيت كلمة المرور؟
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-teal-400 disabled:cursor-not-allowed transition-colors duration-300 btn-press"
                  >
                    {isLoading ? <SpinnerIcon /> : 'تسجيل الدخول'}
                  </button>
                </div>
              </form>
               <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
                ليس لديك حساب؟{' '}
                <button onClick={onNavigateToRegister} className="font-medium text-teal-600 hover:text-teal-500 focus:outline-none">
                  سجل الآن
                </button>
              </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;