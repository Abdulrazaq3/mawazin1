
import React from 'react';
import { Page } from '../types';
import { SearchIcon, BellIcon, MenuIcon } from './icons';

interface HeaderProps {
  currentPage: Page;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onMenuClick }) => {
  return (
    <header className="h-20 flex-shrink-0 flex items-center justify-between px-4 sm:px-6 bg-white border-b border-slate-200 dark:bg-slate-800 dark:border-slate-700">
      <div className="flex items-center">
        <button className="p-2 mr-2 -ml-2 rounded-full text-slate-500 hover:bg-slate-100 md:hidden dark:text-slate-400 dark:hover:bg-slate-700" onClick={onMenuClick} aria-label="فتح القائمة">
            <MenuIcon />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">{currentPage}</h1>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4 rtl:space-x-reverse">
        <div className="relative hidden sm:block group">
           <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="بحث..."
            className="pr-10 pl-4 py-2 w-48 border border-slate-300 rounded-full bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:bg-white focus:w-64 transition-all duration-300 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:bg-slate-600"
          />
        </div>
        <button className="group p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition dark:text-slate-400 dark:hover:bg-slate-700">
          <BellIcon className="h-6 w-6 animate-shake-on-hover" />
        </button>
        <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-inner shrink-0 dark:bg-teal-600">
          أ
        </div>
      </div>
    </header>
  );
};

export default Header;