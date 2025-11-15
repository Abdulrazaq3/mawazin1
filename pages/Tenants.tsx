
import React, { useState } from 'react';
import { Tenant } from '../types';
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon, SpinnerIcon, TenantsIcon } from '../components/icons';
import Modal from '../components/Modal';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';

// Form for adding/editing tenants
const emptyTenant: Omit<Tenant, 'id'> = { name: '', nationalId: '', rentAmount: 0, startDate: '', endDate: '', unitId: 101 };

const TenantForm: React.FC<{
  initialData?: Tenant | null;
  onSubmit: (data: Omit<Tenant, 'id'> | Tenant) => void;
  onClose: () => void;
}> = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(initialData || emptyTenant);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseInt(value) || 0 : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
        onSubmit(formData);
    }, 600);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">الاسم الكامل</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
        </div>
        <div>
          <label htmlFor="nationalId" className="block text-sm font-medium text-slate-700">رقم الهوية</label>
          <input type="text" name="nationalId" id="nationalId" value={formData.nationalId} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
        </div>
        <div>
          <label htmlFor="rentAmount" className="block text-sm font-medium text-slate-700">مبلغ الإيجار (ر.س)</label>
          <input type="number" name="rentAmount" id="rentAmount" value={formData.rentAmount} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
        </div>
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-slate-700">تاريخ بداية العقد</label>
          <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
        </div>
         <div className="md:col-span-2">
          <label htmlFor="endDate" className="block text-sm font-medium text-slate-700">تاريخ نهاية العقد</label>
          <input type="date" name="endDate" id="endDate" value={formData.endDate} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
        </div>
      </div>
       <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-4">
        <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
          إلغاء
        </button>
        <button type="submit" disabled={isSaving} className="inline-flex justify-center items-center w-24 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-teal-400 disabled:cursor-not-allowed">
          {isSaving ? <SpinnerIcon /> : 'حفظ'}
        </button>
      </div>
    </form>
  )
}

const TenantDetails: React.FC<{ tenant: Tenant }> = ({ tenant }) => (
    <div className="space-y-2">
         <dl className="divide-y divide-slate-100">
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-slate-500">الاسم</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">{tenant.name}</dd>
            </div>
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-slate-500">رقم الهوية</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">{tenant.nationalId}</dd>
            </div>
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-slate-500">مبلغ الإيجار</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">{tenant.rentAmount.toLocaleString()} ر.س</dd>
            </div>
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-slate-500">فترة الإقامة</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">{new Date(tenant.startDate).toLocaleDateString('ar-SA')} - {new Date(tenant.endDate).toLocaleDateString('ar-SA')}</dd>
            </div>
        </dl>
    </div>
);


const TenantsTable: React.FC<{ tenants: Tenant[], onView: (t: Tenant) => void, onEdit: (t: Tenant) => void, onDelete: (id: number) => void, isLoading: boolean, onAdd: () => void }> = ({ tenants, onView, onEdit, onDelete, isLoading, onAdd }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200/80">
      <div className="overflow-x-auto">
        <table className="w-full text-right min-w-[768px]">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider">الاسم</th>
              <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider">رقم الهوية</th>
              <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider">مبلغ الإيجار</th>
              <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider">فترة الإقامة</th>
              <th className="p-4 text-sm font-semibold text-slate-500 text-center uppercase tracking-wider">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
             {isLoading ? <SkeletonLoader rows={5} cols={5} /> : tenants.length > 0 ? tenants.map((tenant, index) => (
              <tr key={tenant.id} className="odd:bg-white even:bg-slate-50/50 group transition-colors duration-200 hover:bg-teal-50/50 opacity-0 animate-stagger-in" style={{ animationDelay: `${index * 50}ms` }}>
                <td className="p-4 whitespace-nowrap font-semibold text-slate-800">{tenant.name}</td>
                <td className="p-4 whitespace-nowrap text-slate-600">{tenant.nationalId}</td>
                <td className="p-4 whitespace-nowrap text-slate-600">{tenant.rentAmount.toLocaleString()} ر.س</td>
                <td className="p-4 whitespace-nowrap text-slate-600">
                  {new Date(tenant.startDate).toLocaleDateString('ar-SA')} - {new Date(tenant.endDate).toLocaleDateString('ar-SA')}
                </td>
                <td className="p-4 whitespace-nowrap">
                  <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => onView(tenant)} className="p-2 rounded-full text-slate-500 hover:bg-teal-100 hover:text-teal-500 transition-all duration-200 hover:scale-125" title="عرض">
                      <EyeIcon />
                    </button>
                    <button onClick={() => onEdit(tenant)} className="p-2 rounded-full text-slate-500 hover:bg-amber-100 hover:text-amber-500 transition-all duration-200 hover:scale-125" title="تعديل">
                      <PencilIcon />
                    </button>
                    <button onClick={() => onDelete(tenant.id)} className="p-2 rounded-full text-slate-500 hover:bg-red-100 hover:text-red-500 transition-all duration-200 hover:scale-125" title="حذف">
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
        {!isLoading && tenants.length === 0 && (
          <EmptyState
            icon={<TenantsIcon />}
            title="لا يوجد مستأجرون حالياً"
            message="ابدأ بإضافة بيانات المستأجرين لديك لتتبع عقودهم ودفعاتهم."
            action={{ label: 'إضافة مستأجر', onClick: onAdd }}
          />
        )}
      </div>
    </div>
  );
};


const Tenants: React.FC<{
    tenants: Tenant[],
    addTenant: (t: Omit<Tenant, 'id'>) => void,
    updateTenant: (t: Tenant) => void,
    deleteTenant: (id: number) => void,
    isLoading: boolean
}> = ({ tenants, addTenant, updateTenant, deleteTenant, isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view' | null>(null);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  const openModal = (type: 'add' | 'edit' | 'view', tenant?: Tenant) => {
    setModalType(type);
    setSelectedTenant(tenant || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedTenant(null);
  };

  const handleFormSubmit = (data: Omit<Tenant, 'id'> | Tenant) => {
    if ('id' in data) {
      updateTenant(data);
    } else {
      addTenant(data);
    }
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
         <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">المستأجرون</h2>
           <p className="text-slate-600 mt-1">عرض وإدارة جميع المستأجرين الحاليين.</p>
        </div>
        <button onClick={() => openModal('add')} className="flex items-center bg-teal-500 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-teal-600 transition btn-press w-full sm:w-auto justify-center">
          <PlusIcon />
          <span>إضافة مستأجر</span>
        </button>
      </div>
      <TenantsTable 
        tenants={tenants} 
        onView={(t) => openModal('view', t)} 
        onEdit={(t) => openModal('edit', t)} 
        onDelete={deleteTenant} 
        isLoading={isLoading}
        onAdd={() => openModal('add')}
      />

      <Modal isOpen={isModalOpen} onClose={closeModal} title={
        modalType === 'add' ? 'إضافة مستأجر جديد' :
        modalType === 'edit' ? 'تعديل بيانات المستأجر' : 'تفاصيل المستأجر'
      }>
        {modalType === 'add' && <TenantForm onSubmit={handleFormSubmit} onClose={closeModal} />}
        {modalType === 'edit' && selectedTenant && <TenantForm initialData={selectedTenant} onSubmit={handleFormSubmit} onClose={closeModal} />}
        {modalType === 'view' && selectedTenant && <TenantDetails tenant={selectedTenant} />}
      </Modal>
    </div>
  );
};

export default Tenants;