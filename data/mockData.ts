import { Property, Tenant, Transaction, Reminder, Unit, Note } from '../types';

export const mockNotes: Note[] = [
  { id: 1, title: 'تجديد عقد', content: 'تجديد عقد أحمد القحطاني لوحدة 101 قبل نهاية الشهر.', color: 'yellow', createdAt: '2023-11-10' },
  { id: 2, title: 'صيانة المصعد', content: 'الاتصال بشركة الصيانة لفحص المصعد في برج النخيل.', color: 'blue', createdAt: '2023-11-08' },
  { id: 3, title: 'فواتير الكهرباء', content: 'متابعة سداد فواتير الكهرباء لجميع العقارات.', color: 'green', createdAt: '2023-11-05' },
  { id: 4, title: 'شقة شاغرة', content: 'الإعلان عن شقة 301 الشاغرة في مركز الدمام للأعمال.', color: 'pink', createdAt: '2023-11-12' },
  { id: 5, title: 'اجتماع الملاك', content: 'تحديد موعد لاجتماع الملاك لمناقشة الميزانية السنوية.', color: 'yellow', createdAt: '2023-11-14' },
];

export const properties: Property[] = [
  { id: 1, name: 'برج النخيل', city: 'الرياض', unitCount: 50, occupancyRate: 92, location: 'طريق الملك فهد', buildingNumber: '123', district: 'العليا', street: 'الشارع الرئيسي', postalCode: '11564' },
  { id: 2, name: 'أجنحة جدة البحرية', city: 'جدة', unitCount: 30, occupancyRate: 85, location: 'طريق الكورنيش', buildingNumber: '456', district: 'الحمراء', street: 'شارع الشاطئ', postalCode: '21432' },
  { id: 3, name: 'مركز الدمام للأعمال', city: 'الدمام', unitCount: 75, occupancyRate: 95, location: 'طريق الأمير محمد بن فهد', buildingNumber: '789', district: 'الخليج', street: 'الشارع التجاري', postalCode: '31452' },
];

export const units: Unit[] = [
    { id: 101, propertyId: 1, name: 'وحدة 101', status: 'Active', rooms: 2, bathrooms: 1, kitchens: 1 },
    { id: 102, propertyId: 1, name: 'وحدة 102', status: 'Active', rooms: 3, bathrooms: 2, kitchens: 1 },
    { id: 201, propertyId: 2, name: 'جناح أ', status: 'Active', rooms: 1, bathrooms: 1, kitchens: 1 },
    { id: 301, propertyId: 3, name: 'مكتب 1', status: 'Inactive', rooms: 5, bathrooms: 2, kitchens: 0 },
];

export const tenants: Tenant[] = [
  { id: 1, name: 'أحمد القحطاني', nationalId: '1098765432', rentAmount: 5000, startDate: '2023-01-15', endDate: '2024-01-14', unitId: 101 },
  { id: 2, name: 'فاطمة الغامدي', nationalId: '2087654321', rentAmount: 7500, startDate: '2022-11-01', endDate: '2023-10-31', unitId: 102 },
  { id: 3, name: 'خالد المطيري', nationalId: '1076543210', rentAmount: 4200, startDate: '2023-03-20', endDate: '2024-03-19', unitId: 201 },
];

export const transactions: Transaction[] = [
  { id: 1, type: 'Revenue', category: 'إيجار', amount: 5000, date: '2023-11-01', description: 'إيجار نوفمبر - وحدة 101', propertyId: 1, unitId: 101 },
  { id: 2, type: 'Expense', category: 'صيانة', amount: 350, date: '2023-11-05', description: 'إصلاح سباكة - وحدة 102', propertyId: 1, unitId: 102 },
  { id: 3, type: 'Revenue', category: 'إيجار', amount: 7500, date: '2023-11-01', description: 'إيجار نوفمبر - وحدة 102', propertyId: 1, unitId: 102 },
  { id: 4, type: 'Revenue', category: 'إيجار', amount: 4200, date: '2023-11-20', description: 'إيجار نوفمبر - جناح أ', propertyId: 2, unitId: 201 },
  { id: 5, type: 'Expense', category: 'خدمات', amount: 1200, date: '2023-11-15', description: 'فاتورة كهرباء - برج النخيل', propertyId: 1, unitId: 0 },
  { id: 6, type: 'Expense', category: 'رواتب', amount: 8000, date: '2023-10-30', description: 'رواتب الموظفين لشهر أكتوبر', propertyId: 1, unitId: 0 },
  { id: 7, type: 'Revenue', category: 'مواقف', amount: 500, date: '2023-10-25', description: 'رسوم مواقف', propertyId: 2, unitId: 0 },
];

export const reminders: Reminder[] = [
  { id: 1, tenantName: 'أحمد القحطاني', unitName: 'وحدة 101', propertyName: 'برج النخيل', rentAmount: 5000, dueDate: '2023-12-15' },
  { id: 2, tenantName: 'خالد المطيري', unitName: 'جناح أ', propertyName: 'أجنحة جدة البحرية', rentAmount: 4200, dueDate: '2023-12-20' },
  { id: 3, tenantName: 'مستأجر جديد', unitName: 'وحدة 103', propertyName: 'برج النخيل', rentAmount: 6000, dueDate: '2024-01-01' },
];

export const reportData = {
    kpis: {
        totalRevenue: 850000,
        totalExpenses: 250000,
        netProfit: 600000,
        occupancyRate: 92,
    },
    transactionDistribution: [
        { name: 'إيرادات', value: 850000 },
        { name: 'مصروفات', value: 250000 },
    ],
    monthlyNetProfit: [
        { name: 'يناير', profit: 50000 }, { name: 'فبراير', profit: 55000 }, { name: 'مارس', profit: 48000 },
        { name: 'أبريل', profit: 62000 }, { name: 'مايو', profit: 60000 }, { name: 'يونيو', profit: 70000 },
        { name: 'يوليو', profit: 75000 }, { name: 'أغسطس', profit: 72000 }, { name: 'سبتمبر', profit: 68000 },
        { name: 'أكتوبر', profit: 80000 }, { name: 'نوفمبر', profit: 78000 }, { name: 'ديسمبر', profit: 90000 },
    ],
    categoryData: [
        { name: 'إيجار', revenue: 750000, expense: 0 },
        { name: 'مواقف', revenue: 50000, expense: 0 },
        { name: 'رسوم', revenue: 50000, expense: 0 },
        { name: 'صيانة', revenue: 0, expense: 100000 },
        { name: 'خدمات', revenue: 0, expense: 80000 },
        { name: 'رواتب', revenue: 0, expense: 70000 },
    ]
};