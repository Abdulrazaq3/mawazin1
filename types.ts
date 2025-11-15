export type Page = 'تسجيل الدخول' | 'لوحة التحكم' | 'العقارات' | 'المستأجرون' | 'المعاملات' | 'التقارير' | 'التذكيرات' | 'الملاحظات' | 'الإعدادات' | 'الملف الشخصي';

export interface Note {
  id: number;
  title: string;
  content: string;
  color: 'yellow' | 'blue' | 'green' | 'pink';
  createdAt: string;
}

export interface Property {
  id: number;
  name: string;
  city: string;
  unitCount: number;
  occupancyRate: number;
  location: string;
  buildingNumber: string;
  district: string;
  street: string;
  postalCode: string;
}

export interface Unit {
  id: number;
  propertyId: number;
  name: string;
  status: 'Active' | 'Inactive';
  rooms: number;
  bathrooms: number;
  kitchens: number;
}

export interface Tenant {
  id: number;
  name: string;
  nationalId: string;
  rentAmount: number;
  startDate: string;
  endDate: string;
  unitId: number;
}

export interface Transaction {
  id: number;
  type: 'Revenue' | 'Expense';
  category: string;
  amount: number;
  date: string;
  description: string;
  propertyId: number;
  unitId: number;
}

export interface Reminder {
  id: number;
  tenantName: string;
  unitName: string;
  propertyName: string;
  rentAmount: number;
  dueDate: string;
}

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}