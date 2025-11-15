import React from 'react';
import { Page } from '../types';
import { DashboardIcon, PropertiesIcon, TenantsIcon, TransactionsIcon, ReportsIcon, RemindersIcon, SettingsIcon, ProfileIcon, MawazinLogo, NotesIcon } from './icons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
  pageName: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}> = ({ pageName, currentPage, setCurrentPage, icon, label, onClick }) => {
  const isActive = currentPage === pageName;
  return (
    <li>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage(pageName);
          onClick();
        }}
        className={`relative flex items-center p-3 my-1 rounded-lg transition-all duration-200 group ${
          isActive
            ? 'bg-black/20 text-white'
            : 'text-cyan-200 hover:bg-black/10 hover:text-white hover:-translate-x-1'
        }`}
      >
        {isActive && <div className="absolute right-0 top-0 bottom-0 w-1 bg-teal-400 rounded-r-full"></div>}
        {icon}
        <span className="mr-4 font-semibold text-sm">{label}</span>
      </a>
    </li>
  );
};


const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isOpen, setIsOpen }) => {
  const navItems: { page: Page; label: string; icon: React.ReactNode }[] = [
    { page: 'لوحة التحكم', label: 'لوحة التحكم', icon: <DashboardIcon /> },
    { page: 'العقارات', label: 'العقارات', icon: <PropertiesIcon /> },
    { page: 'المستأجرون', label: 'المستأجرون', icon: <TenantsIcon /> },
    { page: 'المعاملات', label: 'المعاملات', icon: <TransactionsIcon /> },
    { page: 'التقارير', label: 'التقارير', icon: <ReportsIcon /> },
    { page: 'التذكيرات', label: 'التذكيرات', icon: <RemindersIcon /> },
    { page: 'الملاحظات', label: 'الملاحظات', icon: <NotesIcon /> },
  ];
  
  const bottomNavItems: { page: Page; label: string; icon: React.ReactNode }[] = [
      { page: 'الملف الشخصي', label: 'الملف الشخصي', icon: <ProfileIcon /> },
      { page: 'الإعدادات', label: 'الإعدادات', icon: <SettingsIcon /> },
  ];

  const handleNavItemClick = () => {
    if (window.innerWidth < 768) { // md breakpoint
      setIsOpen(false);
    }
  }

  return (
    <aside style={{backgroundColor: '#023337'}} className={`fixed top-0 bottom-0 right-0 w-64 flex-shrink-0 shadow-lg z-40 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="h-28 flex items-center justify-center border-b px-4" style={{borderColor: 'rgba(255, 255, 255, 0.1)'}}>
          <MawazinLogo className="h-20 w-auto" />
        </div>
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          <ul>
            {navItems.map((item) => (
              <NavItem
                key={item.page}
                pageName={item.page}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                icon={item.icon}
                label={item.label}
                onClick={handleNavItemClick}
              />
            ))}
          </ul>
        </nav>
        <div className="px-4 py-4 border-t" style={{borderColor: 'rgba(255, 255, 255, 0.1)'}}>
             <ul>
                 {bottomNavItems.map((item) => (
                  <NavItem
                    key={item.page}
                    pageName={item.page}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    icon={item.icon}
                    label={item.label}
                    onClick={handleNavItemClick}
                  />
                ))}
             </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;