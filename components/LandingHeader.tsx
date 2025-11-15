import React, { useState, useEffect } from 'react';
import { MawazinLogo, MenuIcon, CloseIcon } from './icons';

const CtaButton: React.FC<{ children: React.ReactNode, onClick: () => void, primary?: boolean, className?: string }> = ({ children, onClick, primary = true, className = '' }) => (
    <button onClick={onClick} className={`btn-press inline-block text-center font-semibold py-2 px-5 rounded-lg transition-all duration-300 shadow-sm text-sm ${primary ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-white text-teal-500 border border-teal-500 hover:bg-teal-50'} ${className}`}>
        {children}
    </button>
);

const NavLink: React.FC<{ href: string; children: React.ReactNode; active: boolean; onClick?: () => void; }> = ({ href, children, active, onClick }) => (
    <a
        href={href}
        onClick={onClick}
        className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
            active ? 'text-teal-500 dark:text-teal-400 font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-teal-500 dark:hover:text-teal-400'
        }`}
    >
        {children}
    </a>
);

const navItems = [
    { id: 'hero', name: 'الرئيسية' },
    { id: 'why-mawazin', name: 'لماذا موازين؟' },
    { id: 'features', name: 'المزايا' },
    { id: 'how-it-works', name: 'كيف يعمل؟' },
    { id: 'pricing', name: 'الباقات' },
    { id: 'testimonials', name: 'آراء العملاء' },
    { id: 'faq', name: 'الأسئلة الشائعة' },
    { id: 'contact', name: 'تواصل معنا' },
];

interface LandingHeaderProps {
  onNavigateToAuth: () => void;
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ onNavigateToAuth }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Active section highlighting logic
            let currentSectionId = '';
            const sectionElements = navItems.map(item => document.getElementById(item.id));
            
            for (const section of sectionElements) {
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
                        currentSectionId = section.id;
                    }
                }
            }
             if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
                currentSectionId = navItems[navItems.length - 1].id;
            }

            setActiveSection(currentSectionId || 'hero');
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); 

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                       <a href="#hero"><MawazinLogo className="h-16 w-auto" /></a>
                    </div>
                    <div className="hidden md:flex items-baseline space-x-1 rtl:space-x-reverse">
                        {navItems.map(item => (
                            <NavLink key={item.id} href={`#${item.id}`} active={activeSection === item.id}>
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                     <div className="hidden md:flex items-center">
                        <CtaButton onClick={onNavigateToAuth} primary={false}>تسجيل الدخول</CtaButton>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-teal-500 focus:outline-none" aria-label="Open menu">
                            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && <div className="fixed inset-0 bg-black/30 z-40 md:hidden animate-fadeInFast" onClick={closeMenu}></div>}

            {/* Mobile Menu Panel */}
            <div className={`md:hidden fixed top-0 bottom-0 right-0 w-4/5 max-w-sm bg-white dark:bg-slate-900 z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
                 <div className="flex justify-between items-center h-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-700">
                     <a href="#hero" onClick={closeMenu}><MawazinLogo className="h-16 w-auto" /></a>
                     <button onClick={closeMenu} className="p-2 rounded-md text-slate-600 dark:text-slate-300">
                         <CloseIcon />
                     </button>
                 </div>
                 <div className="pt-8 flex flex-col items-center space-y-6">
                     {navItems.map(item => (
                        <NavLink key={item.id} href={`#${item.id}`} active={activeSection === item.id} onClick={closeMenu}>
                            {item.name}
                        </NavLink>
                     ))}
                     <CtaButton onClick={() => { onNavigateToAuth(); closeMenu(); }} primary={false} className="mt-4">تسجيل الدخول</CtaButton>
                 </div>
            </div>
        </header>
    );
};

export default LandingHeader;