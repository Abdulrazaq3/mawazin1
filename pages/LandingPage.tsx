import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ToastMessage } from '../types';
import LandingHeader from '../components/LandingHeader';
import { MawazinLogo, SpinnerIcon, StarIcon, ChevronDownIcon, ChartBarIcon, DocumentTextIcon, ReceiptRefundIcon, OfficeBuildingIcon, CurrencyDollarIcon, GlobeAltIcon, ProfitIcon, TwitterIcon, LinkedInIcon, GitHubIcon, QuestionMarkCircleIcon, TrendingUpIcon, ShieldCheckIcon, PhoneIcon, MailIcon } from '../components/icons';

interface LandingPageProps {
  onNavigateToAuth: () => void;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
}

const useIntersectionObserver = (options: IntersectionObserverInit): [(node: Element | null) => void, IntersectionObserverEntry | undefined] => {
    const [entry, setEntry] = useState<IntersectionObserverEntry>();
    const [node, setNode] = useState<Element | null>(null);

    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new window.IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                 setEntry(entry);
                 observer.current?.unobserve(entry.target);
            }
        }, options);

        const { current: currentObserver } = observer;
        if (node && currentObserver) {
            currentObserver.observe(node);
        }

        return () => {
            if (currentObserver) {
                currentObserver.disconnect();
            }
        };
    }, [node, options]);

    return [setNode, entry];
};

const AnimatedSection: React.FC<{ children: React.ReactNode, className?: string, id: string }> = ({ children, className = '', id }) => {
    const options = useMemo(() => ({ threshold: 0.1 }), []);
    const [setNode, entry] = useIntersectionObserver(options);
    const isVisible = !!entry?.isIntersecting;

    return (
        <section
            id={id}
            ref={setNode}
            className={`py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${className} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="max-w-7xl mx-auto">
                {isVisible && children}
            </div>
        </section>
    );
};


const SectionTitle: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-slate-900 dark:text-white mb-4 ${className}`}>
        {children}
    </h2>
);

const SectionSubtitle: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <p className={`text-lg text-center text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 ${className}`}>
        {children}
    </p>
);

const CtaButton: React.FC<{ children: React.ReactNode, onClick: () => void, primary?: boolean, className?: string, size?: 'lg' }> = ({ children, onClick, primary = true, className = '', size }) => (
    <button onClick={onClick} className={`btn-press inline-block text-center font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ${size === 'lg' ? 'py-4 px-10 text-lg' : 'py-3 px-8'} ${primary ? 'bg-teal-500 text-white hover:bg-teal-600' : 'bg-white text-teal-600 hover:bg-slate-50 dark:bg-slate-800 dark:text-teal-400 dark:hover:bg-slate-700'} ${className}`}>
        {children}
    </button>
);


const HeroSection: React.FC<{ onNavigateToAuth: () => void }> = ({ onNavigateToAuth }) => {
    return (
        <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
             <div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal-50/50 via-white to-cyan-50/50 dark:from-slate-900/70 dark:via-slate-900 dark:to-slate-900/70"></div>
             <div className="absolute top-0 right-0 -z-10 h-96 w-96 bg-teal-400/20 rounded-full blur-3xl opacity-50"></div>
             <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 bg-cyan-400/20 rounded-full blur-3xl opacity-50"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
                    رتّب حسابات إيجاراتك بسهولة
                    <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-cyan-500">مع منصة موازين</span>
                </h1>
                <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
                    منصة محاسبية تساعدك تعرف دخلك، مصاريفك، وصافي ربحك من كل عقار بدون صداع الإكسل.
                </p>
                <div className="flex justify-center items-center flex-wrap gap-4 animate-slide-in-up" style={{ animationDelay: '500ms' }}>
                    <CtaButton onClick={onNavigateToAuth} size="lg">جرّب موازين الآن</CtaButton>
                    <CtaButton onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} primary={false} size="lg">اكتشف المزايا</CtaButton>
                </div>
            </div>
        </section>
    );
};

const WhyMawazinSection: React.FC = () => {
    const problems = [
        { icon: <QuestionMarkCircleIcon />, text: 'تضيع بين الإكسلات والعقود؟' },
        { icon: <TrendingUpIcon />, text: 'ما تعرف أرباحك الحقيقية؟' },
        { icon: <CurrencyDollarIcon />, text: 'الدفعات كثيرة ومشتتة؟' },
    ];
    const solutions = [
        'يجمع لك الأرقام في مكان واحد',
        'يتابع دفعات الإيجار المتأخرة',
        'يطلع تقارير شهرية وسنوية واضحة',
    ];
    return (
        <AnimatedSection id="why-mawazin" className="bg-slate-50 dark:bg-slate-900">
            <SectionTitle>احسبها صح، وعيش مرتاح</SectionTitle>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
                    {problems.map((problem, index) => (
                        <div key={index} className="flex items-start p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                            <div className="text-red-500 shrink-0">{problem.icon}</div>
                            <p className="mr-4 text-lg font-semibold text-slate-700 dark:text-slate-200">{problem.text}</p>
                        </div>
                    ))}
                </div>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg animate-slide-in-up" style={{ animationDelay: '300ms' }}>
                     <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">موازين هو الحل الأمثل لك:</h3>
                     <ul className="space-y-4">
                        {solutions.map((solution, index) => (
                             <li key={index} className="flex items-center text-lg">
                                 <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mr-3 shrink-0">
                                    <span className="text-teal-500 font-bold">✓</span>
                                 </div>
                                <span className="text-slate-600 dark:text-slate-300">{solution}</span>
                            </li>
                        ))}
                     </ul>
                </div>
            </div>
        </AnimatedSection>
    )
};

const FeaturesSection: React.FC = () => {
    const features = [
        { icon: <ChartBarIcon />, title: 'تتبع الإيرادات', description: 'سجل كل الإيرادات والمصروفات بسهولة لتتبع الأداء المالي.' },
        { icon: <DocumentTextIcon />, title: 'تسجيل عقود الإيجار', description: 'أرشفة وإدارة عقود المستأجرين وتواريخ الاستحقاق.' },
        { icon: <ReceiptRefundIcon />, title: 'تقارير ربح وخسارة', description: 'احصل على تقارير مالية واضحة بضغطة زر.' },
        { icon: <OfficeBuildingIcon />, title: 'إدارة عدة عقارات', description: 'أدر كل عقاراتك من مكان واحد، مهما كان عددها.' },
        { icon: <ProfitIcon />, title: 'عرض صافي الربح', description: 'اعرف ربحك الحقيقي من كل عقار على حدة أو من محفظتك كاملة.' },
        { icon: <GlobeAltIcon />, title: 'يدعم تعدد العملات', description: 'أدر عقاراتك الدولية بكل سهولة مع دعم لمختلف العملات.' },
    ];
    return (
        <AnimatedSection id="features" className="bg-white dark:bg-slate-800/50">
            <SectionTitle>كل ما تحتاجه لإدارة عقاراتك</SectionTitle>
            <SectionSubtitle>نقدم لك مجموعة من الأدوات القوية التي تجعل عملية إدارة الممتلكات أبسط وأكثر كفاءة من أي وقت مضى.</SectionSubtitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className="inline-block p-4 bg-teal-100 dark:bg-teal-900/50 rounded-xl mb-4">
                            <div className="text-teal-500 dark:text-teal-400">{feature.icon}</div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{feature.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
                    </div>
                ))}
            </div>
        </AnimatedSection>
    );
};

const HowItWorksSection: React.FC<{ onNavigateToAuth: () => void }> = ({ onNavigateToAuth }) => {
    const steps = [
        { number: '1', title: 'أضف عقاراتك', description: 'ابدأ بإضافة بيانات عقاراتك ووحداتك السكنية أو التجارية بسهولة.' },
        { number: '2', title: 'سجل العقود والدفعات', description: 'أدخل معلومات المستأجرين، تفاصيل العقود، وسجل الدفعات والمصاريف.' },
        { number: '3', title: 'احصل على تقاريرك', description: 'يقوم موازين بحساب كل شيء تلقائيًا ويقدم لك تقارير واضحة وشاملة.' },
    ];
    return (
        <AnimatedSection id="how-it-works" className="bg-slate-50 dark:bg-slate-900">
            <SectionTitle>كيف يعمل موازين؟</SectionTitle>
            <SectionSubtitle>ابدأ في ثلاث خطوات بسيطة فقط. تم تصميم منصتنا لتكون سهلة الاستخدام ومباشرة.</SectionSubtitle>
            <div className="relative">
                 <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-700 hidden lg:block" aria-hidden="true"></div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center animate-slide-in-up" style={{ animationDelay: `${index * 100}ms`}}>
                             <div className="flex items-center justify-center mb-6">
                                <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center text-2xl font-bold text-teal-500 shadow-md">
                                    {step.number}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{step.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
                        </div>
                    ))}
                 </div>
            </div>
            <div className="text-center mt-12 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
                <CtaButton onClick={onNavigateToAuth}>ابدأ الآن</CtaButton>
            </div>
        </AnimatedSection>
    )
};

const PricingSection: React.FC<{ onNavigateToAuth: () => void }> = ({ onNavigateToAuth }) => {
    const plans = [
        { name: 'مبتدئ', price: '49', features: ['حتى 3 وحدات', 'تقارير شهرية', 'دعم عبر الإيميل'], primary: false },
        { name: 'محترف', price: '99', features: ['حتى 10 وحدات', 'تقارير شهرية وسنوية', 'تحليل أداء', 'دعم سريع'], primary: true, badge: 'الأكثر شيوعاً' },
        { name: 'شركة', price: 'تواصل معنا', features: ['وحدات غير محدودة', 'تقارير مخصصة', 'مدير حساب', 'ربط أنظمة'], primary: false },
    ];
    return (
        <AnimatedSection id="pricing" className="bg-white dark:bg-slate-800/50">
            <SectionTitle>باقات أسعار مرنة</SectionTitle>
            <SectionSubtitle>اختر الباقة التي تناسب حجم أعمالك واحتياجاتك. يمكنك الترقية أو الإلغاء في أي وقت.</SectionSubtitle>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
                {plans.map((plan, index) => (
                     <div key={index} className={`relative bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md border animate-slide-in-up transition-all duration-300 ${plan.primary ? 'border-teal-500 scale-105 shadow-2xl' : 'border-slate-200 dark:border-slate-700'}`} style={{ animationDelay: `${index * 100}ms`}}>
                        {plan.badge && <span className="absolute -top-4 right-1/2 translate-x-1/2 bg-teal-500 text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg">{plan.badge}</span>}
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{plan.name}</h3>
                            <div className="mb-6 h-20 flex items-center justify-center">
                                {plan.price.includes(' ') ?
                                    <span className="text-2xl font-semibold text-slate-700 dark:text-slate-300">{plan.price}</span> :
                                    <>
                                        <span className="text-5xl font-extrabold text-slate-900 dark:text-white">{plan.price}</span>
                                        <span className="text-slate-500 dark:text-slate-400 mt-2 mr-1">ر.س/شهرياً</span>
                                    </>
                                }
                            </div>
                        </div>
                        <ul className="space-y-4 mb-8 text-slate-600 dark:text-slate-300">
                            {plan.features.map(feature => <li key={feature} className="flex items-center"><span className="text-teal-500 ml-3 text-xl font-bold">✓</span><span>{feature}</span></li>)}
                        </ul>
                         {plan.name === 'شركة' ?
                             <CtaButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} primary={plan.primary} className="w-full">تواصل للمبيعات</CtaButton> :
                             <CtaButton onClick={onNavigateToAuth} primary={plan.primary} className="w-full">ابدأ بهذه الباقة</CtaButton>
                        }
                    </div>
                ))}
            </div>
        </AnimatedSection>
    );
};

const TestimonialsSection: React.FC = () => {
    const testimonials = [
        { name: 'خالد', role: 'مالك عقارات', quote: 'غيّر طريقة إدارتي للعقارات. صار كل شي أسهل وأوضح بكثير، والتقارير دقيقة وتساعدني أتخذ قرارات أفضل.' },
        { name: 'سارة', role: 'مديرة أملاك', quote: 'كنت أضيع وقت طويل في حساب الإيرادات والمصاريف يدويًا. الآن بضغطة زر أعرف كل شي. شكرًا موازين!' },
        { name: 'محمد', role: 'مستثمر عقاري', quote: 'أفضل استثمار سويته لعملي العقاري. الدعم الفني سريع ومتعاون، والمنصة سهلة الاستخدام جدًا.' },
    ];
    return (
        <AnimatedSection id="testimonials" className="bg-slate-50 dark:bg-slate-900">
            <SectionTitle>يثق بنا أصحاب العقارات</SectionTitle>
            <SectionSubtitle>لا تأخذ كلامنا فقط. استمع لما يقوله عملاؤنا عن تجربتهم مع منصة موازين.</SectionSubtitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm flex flex-col animate-slide-in-up" style={{ animationDelay: `${index * 100}ms`}}>
                        <div className="flex mb-4">
                            {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                        </div>
                        <blockquote className="text-slate-700 dark:text-slate-300 mb-6 flex-grow text-lg">"{testimonial.quote}"</blockquote>
                        <div className="flex items-center mt-auto">
                            <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-teal-500 mr-4 rtl:mr-0 rtl:ml-4 text-xl shrink-0">
                                {testimonial.name.charAt(0)}
                            </div>
                            <div>
                                <p className="font-bold text-slate-800 dark:text-slate-100">{testimonial.name}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </AnimatedSection>
    );
};

const FaqItem: React.FC<{ q: string; a: string; isOpen: boolean; onClick: () => void }> = ({ q, a, isOpen, onClick }) => (
    <div className="border-b border-slate-200 dark:border-slate-700 py-4">
        <button onClick={onClick} className="w-full flex justify-between items-center text-right group">
            <span className="text-lg font-semibold text-slate-800 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{q}</span>
            <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <ChevronDownIcon />
            </div>
        </button>
        <div className={`grid overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'}`}>
            <div className="min-h-0">
                 <p className="text-slate-600 dark:text-slate-300">
                    {a}
                </p>
            </div>
        </div>
    </div>
);
const FaqSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const faqs = [
        { q: 'هل أحتاج إلى خبرة محاسبية لاستخدام موازين؟', a: 'لا، على الإطلاق. تم تصميم موازين ليكون سهل الاستخدام لأصحاب العقارات، وليس للمحاسبين. الواجهة بسيطة ومباشرة.' },
        { q: 'هل يناسب البرنامج شخص يملك عقارًا واحدًا فقط؟', a: 'بالتأكيد. موازين مفيد لأي شخص يملك عقارًا، سواء كان واحدًا أو مئة. باقة "مبتدئ" مصممة خصيصًا للملاك الصغار.' },
        { q: 'كيف يمكنني إصدار تقرير شهري؟', a: 'بسهولة. من قسم "التقارير"، يمكنك تحديد الفترة الزمنية التي تريدها (شهر، ربع سنة، سنة) وتصدير التقرير مباشرة كملف PDF.' },
        { q: 'هل يدعم البرنامج وجود أكثر من مالك للعقار؟', a: 'حاليًا، الحساب مصمم لمالك واحد، ولكن يمكنك تصدير التقارير ومشاركتها مع الشركاء بسهولة. نعمل على تطوير ميزات الشركاء في المستقبل.' },
        { q: 'كيف يتم حفظ بياناتي؟ هل هي آمنة؟', a: 'نعم، أمان بياناتك هو أولويتنا القصوى. نستخدم تشفيرًا قويًا وخوادم آمنة لحماية جميع معلوماتك.' },
        { q: 'هل يمكنني إلغاء اشتراكي في أي وقت؟', a: 'نعم، يمكنك إلغاء اشتراكك في أي وقت بدون أي التزامات. ستظل بياناتك متاحة حتى نهاية فترة الفوترة الحالية.' },
    ];

    return (
        <AnimatedSection id="faq" className="bg-white dark:bg-slate-800/50">
            <SectionTitle>الأسئلة الشائعة</SectionTitle>
            <SectionSubtitle>لديك أسئلة؟ لدينا إجابات. إذا لم تجد ما تبحث عنه، فلا تتردد في التواصل معنا.</SectionSubtitle>
            <div className="max-w-3xl mx-auto animate-slide-in-up">
                {faqs.map((faq, index) => (
                    <FaqItem key={index} {...faq} isOpen={openIndex === index} onClick={() => setOpenIndex(openIndex === index ? null : index)} />
                ))}
            </div>
        </AnimatedSection>
    );
};

const ContactSection: React.FC<{ addToast: (toast: Omit<ToastMessage, 'id'>) => void; }> = ({ addToast }) => {
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            addToast({ message: 'تم إرسال رسالتك بنجاح!', type: 'success' });
            (e.target as HTMLFormElement).reset();
        }, 1500);
    };

    return (
        <AnimatedSection id="contact" className="bg-slate-50 dark:bg-slate-900">
            <SectionTitle>هل لديك استفسار؟</SectionTitle>
            <SectionSubtitle>نحن هنا للمساعدة. تواصل معنا عبر النموذج أدناه أو باستخدام معلومات الاتصال المباشرة.</SectionSubtitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg animate-slide-in-up" style={{ animationDelay: '100ms' }}>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">أرسل لنا رسالة</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Form fields */}
                         <div>
                            <label htmlFor="contact-name" className="sr-only">الاسم</label>
                            <input type="text" id="contact-name" placeholder="الاسم الكامل" required className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                        </div>
                         <div>
                            <label htmlFor="contact-email" className="sr-only">البريد الإلكتروني</label>
                            <input type="email" id="contact-email" placeholder="البريد الإلكتروني" required className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                        </div>
                         <div>
                            <label htmlFor="contact-phone" className="sr-only">رقم الجوال</label>
                            <input type="tel" id="contact-phone" placeholder="رقم الجوال (اختياري)" className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                        </div>
                        <div>
                            <label htmlFor="contact-message" className="sr-only">رسالتك</label>
                            <textarea id="contact-message" placeholder="اكتب رسالتك هنا..." rows={5} required className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"></textarea>
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full btn-press inline-flex justify-center items-center text-center font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 py-3 px-8 bg-teal-500 text-white hover:bg-teal-600 disabled:bg-teal-400 disabled:cursor-wait">
                           {isLoading ? <SpinnerIcon/> : 'أرسل رسالتك'}
                        </button>
                    </form>
                </div>
                 <div className="space-y-8 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">معلومات التواصل</h3>
                        <div className="space-y-4 text-slate-600 dark:text-slate-300">
                             <a href="mailto:hello@mawazin.sa" className="flex items-center group">
                                <MailIcon />
                                <span className="mr-3 group-hover:text-teal-500 transition-colors">hello@mawazin.sa</span>
                            </a>
                            <a href="tel:+966500000000" className="flex items-center group">
                                <PhoneIcon />
                                <span className="mr-3 group-hover:text-teal-500 transition-colors">+966 50 000 0000</span>
                            </a>
                        </div>
                    </div>
                 </div>
            </div>
        </AnimatedSection>
    );
};


const CtaSection: React.FC<{ onNavigateToAuth: () => void }> = ({ onNavigateToAuth }) => (
    <section id="cta" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-teal-500 to-cyan-500 p-12 rounded-2xl shadow-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">جاهز لتبسيط إدارة عقاراتك؟</h2>
            <p className="text-teal-100 text-lg mb-8 max-w-2xl mx-auto">انضم إلى مئات الملاك والمستثمرين الذين يعتمدون على موازين لتنظيم أعمالهم وزيادة أرباحهم.</p>
            <CtaButton onClick={onNavigateToAuth} primary={false} size="lg">ابدأ الآن مجاناً</CtaButton>
        </div>
    </section>
);


const Footer: React.FC = () => (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex justify-center md:order-1">
                    <MawazinLogo className="h-20" />
                </div>
                <div className="mt-8 md:mt-0 md:order-2 flex justify-center space-x-6 rtl:space-x-reverse">
                     <a href="#" className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"><span className="sr-only">Twitter</span><TwitterIcon /></a>
                     <a href="#" className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"><span className="sr-only">LinkedIn</span><LinkedInIcon /></a>
                     <a href="#" className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"><span className="sr-only">GitHub</span><GitHubIcon /></a>
                </div>
                <div className="mt-8 md:mt-0 md:order-1">
                    <p className="text-center text-base text-slate-500 dark:text-slate-400">&copy; {new Date().getFullYear()} موازين. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </div>
    </footer>
);


const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToAuth, addToast }) => {
  return (
    <div className="bg-white text-slate-800 dark:bg-slate-900/95 dark:text-slate-300 antialiased">
       <LandingHeader onNavigateToAuth={onNavigateToAuth} />

      <main>
        <HeroSection onNavigateToAuth={onNavigateToAuth} />
        <WhyMawazinSection />
        <FeaturesSection />
        <HowItWorksSection onNavigateToAuth={onNavigateToAuth} />
        <PricingSection onNavigateToAuth={onNavigateToAuth} />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection addToast={addToast} />
        <CtaSection onNavigateToAuth={onNavigateToAuth} />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;