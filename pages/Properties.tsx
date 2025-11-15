
import React, { useState, useMemo } from 'react';
import { Property } from '../types';
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon, SearchIcon, SpinnerIcon, PropertiesIcon } from '../components/icons';
import Modal from '../components/Modal';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';

const emptyProperty: Omit<Property, 'id'> = { name: '', city: '', unitCount: 0, occupancyRate: 0, location: '', buildingNumber: '', district: '', street: '', postalCode: '' };

const PropertyForm: React.FC<{
  initialData?: Property | null;
  onSubmit: (data: Omit<Property, 'id'> | Property) => void;
  onClose: () => void;
}> = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(initialData || emptyProperty);
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
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">اسم العقار</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-slate-700 dark:text-slate-300">المدينة</label>
          <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
        </div>
        <div>
          <label htmlFor="unitCount" className="block text-sm font-medium text-slate-700 dark:text-slate-300">عدد الوحدات</label>
          <input type="number" name="unitCount" id="unitCount" value={formData.unitCount} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
        </div>
         <div>
          <label htmlFor="occupancyRate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">نسبة الإشغال (%)</label>
          <input type="number" name="occupancyRate" id="occupancyRate" value={formData.occupancyRate} onChange={handleChange} required max="100" min="0" className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
        </div>
        <div className="md:col-span-2">
            <label htmlFor="location" className="block text-sm font-medium text-slate-700 dark:text-slate-300">الموقع</label>
            <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
        </div>
      </div>
      <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-4">
        <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-600">
          إلغاء
        </button>
        <button type="submit" disabled={isSaving} className="inline-flex justify-center items-center w-24 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-teal-400 disabled:cursor-not-allowed">
          {isSaving ? <SpinnerIcon /> : 'حفظ'}
        </button>
      </div>
    </form>
  );
};

const PropertyDetails: React.FC<{ property: Property }> = ({ property }) => (
    <div className="space-y-4">
        {Object.entries(property).map(([key, value]) => (
            <div key={key} className="grid grid-cols-3 gap-4 border-b border-slate-100 pb-2 dark:border-slate-700">
                <dt className="text-sm font-medium text-slate-500 capitalize dark:text-slate-400">{key.replace(/([A-Z])/g, ' $1')}</dt>
                <dd className="mt-1 text-sm text-slate-900 col-span-2 sm:mt-0 dark:text-slate-200">{value.toString()}</dd>
            </div>
        ))}
    </div>
);

const PropertiesTable: React.FC<{ 
  properties: Property[], 
  onEdit: (p: Property) => void, 
  onView: (p: Property) => void, 
  onDelete: (id: number) => void, 
  isLoading: boolean, 
  onAdd: () => void,
  sortOption: string,
  setSortOption: (option: string) => void
}> = ({ properties, onEdit, onView, onDelete, isLoading, onAdd, sortOption, setSortOption }) => {
    
    const onSort = (key: string) => {
        const [currentKey, currentDirection] = sortOption.split('-');
        let newDirection = 'asc';
        if (key === currentKey && currentDirection === 'asc') {
            newDirection = 'desc';
        }
        setSortOption(`${key}-${newDirection}`);
    };

    const SortableHeader: React.FC<{ 
        label: string; 
        sortKey: string; 
        className?: string;
    }> = ({ label, sortKey, className }) => {
        const [currentKey, currentDirection] = sortOption.split('-');
        const isActive = currentKey === sortKey;

        return (
            <th className={`p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider dark:text-slate-400 ${className || ''}`}>
                <button onClick={() => onSort(sortKey)} className="flex items-center gap-1.5 group transition-colors">
                    <span className="group-hover:text-slate-700 dark:group-hover:text-slate-200">{label}</span>
                    <div className="w-4 h-4 flex flex-col items-center justify-center">
                         <svg className={`h-2.5 w-2.5 -mb-1 ${isActive && currentDirection === 'asc' ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M10 3l-5 5h10l-5-5z"></path></svg>
                         <svg className={`h-2.5 w-2.5 -mt-1 ${isActive && currentDirection === 'desc' ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M10 17l5-5H5l5 5z"></path></svg>
                    </div>
                </button>
            </th>
        )
    }

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200/80 dark:bg-slate-800 dark:border-slate-700">
      <div className="overflow-x-auto">
          <table className="w-full text-right min-w-[768px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <SortableHeader label="الاسم" sortKey="name" />
                <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider dark:text-slate-400">المدينة</th>
                <SortableHeader label="الوحدات" sortKey="units" />
                <SortableHeader label="الإشغال" sortKey="occupancy" />
                <th className="p-4 text-sm font-semibold text-slate-500 text-center uppercase tracking-wider dark:text-slate-400">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {isLoading ? <SkeletonLoader rows={5} cols={5} /> : properties.length > 0 ? (
                properties.map((property, index) => (
                  <tr key={property.id} className="odd:bg-white even:bg-slate-50/50 group transition-colors duration-200 hover:bg-teal-50/50 opacity-0 animate-stagger-in dark:odd:bg-slate-800 dark:even:bg-slate-800/50 dark:hover:bg-teal-500/10" style={{ animationDelay: `${index * 50}ms` }}>
                    <td className="p-4 whitespace-nowrap font-semibold text-slate-800 dark:text-slate-200">{property.name}</td>
                    <td className="p-4 whitespace-nowrap text-slate-600 dark:text-slate-300">{property.city}</td>
                    <td className="p-4 whitespace-nowrap text-slate-600 dark:text-slate-300">{property.unitCount}</td>
                    <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="w-full bg-slate-200 rounded-full h-2.5 mr-2 dark:bg-slate-700">
                                <div className="bg-teal-500 h-2.5 rounded-full" style={{width: `${property.occupancyRate}%`}}></div>
                            </div>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{property.occupancyRate}%</span>
                        </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button onClick={() => onView(property)} className="p-2 rounded-full text-slate-500 hover:bg-teal-100 hover:text-teal-500 transition-all duration-200 hover:scale-125 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-teal-400" title="عرض">
                          <EyeIcon />
                        </button>
                        <button onClick={() => onEdit(property)} className="p-2 rounded-full text-slate-500 hover:bg-amber-100 hover:text-amber-500 transition-all duration-200 hover:scale-125 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-amber-400" title="تعديل">
                          <PencilIcon />
                        </button>
                        <button onClick={() => onDelete(property.id)} className="p-2 rounded-full text-slate-500 hover:bg-red-100 hover:text-red-500 transition-all duration-200 hover:scale-125 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-red-400" title="حذف">
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : null}
            </tbody>
          </table>
        {!isLoading && properties.length === 0 && (
           <EmptyState
              icon={<PropertiesIcon />}
              title="لم يتم إضافة أي عقار بعد"
              message="ابدأ بتنظيم أعمالك عن طريق إضافة عقارك الأول."
              action={{ label: 'إضافة عقار', onClick: onAdd }}
            />
        )}
      </div>
    </div>
  );
};


const Properties: React.FC<{
  properties: Property[],
  addProperty: (p: Omit<Property, 'id'>) => void,
  updateProperty: (p: Property) => void,
  deleteProperty: (id: number) => void,
  isLoading: boolean
}> = ({ properties, addProperty, updateProperty, deleteProperty, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view' | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const openModal = (type: 'add' | 'edit' | 'view', property?: Property) => {
    setModalType(type);
    setSelectedProperty(property || null);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedProperty(null);
  };
  
  const handleFormSubmit = (data: Omit<Property, 'id'> | Property) => {
    if ('id' in data) {
      updateProperty(data);
    } else {
      addProperty(data);
    }
    closeModal();
  };


  const filteredAndSortedProperties = useMemo(() => {
    const filtered = properties.filter(property =>
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const sorted = [...filtered];
    const [sortKey, sortDirection] = sortOption.split('-');

    sorted.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        if (sortKey === 'name') {
            aValue = a.name;
            bValue = b.name;
        } else if (sortKey === 'units') {
            aValue = a.unitCount;
            bValue = b.unitCount;
        } else if (sortKey === 'occupancy') {
            aValue = a.occupancyRate;
            bValue = b.occupancyRate;
        } else {
            return 0;
        }

        const comparison = typeof aValue === 'string' && typeof bValue === 'string'
            ? aValue.localeCompare(bValue, 'ar')
            : (aValue as number) - (bValue as number);

        return sortDirection === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [properties, searchQuery, sortOption]);


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">العقارات</h2>
           <p className="text-slate-600 mt-1 dark:text-slate-400">إدارة وتتبع جميع العقارات الخاصة بك.</p>
        </div>
        <div className="flex items-center gap-x-4 gap-y-2 flex-wrap justify-end">
            <button onClick={() => openModal('add')} className="flex items-center bg-teal-500 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-teal-600 transition btn-press w-full sm:w-auto justify-center">
                <PlusIcon />
                <span>إضافة عقار</span>
            </button>
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200/80 flex items-center justify-between flex-wrap gap-4 dark:bg-slate-800 dark:border-slate-700">
           <div className="relative w-full sm:w-auto">
                <input
                    type="text"
                    placeholder="ابحث بالاسم أو المدينة..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 pl-4 py-2 w-full sm:w-64 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
                    aria-label="ابحث عن عقار"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <SearchIcon />
                </div>
            </div>
      </div>
      <PropertiesTable 
        properties={filteredAndSortedProperties} 
        onView={(p) => openModal('view', p)} 
        onEdit={(p) => openModal('edit', p)} 
        onDelete={deleteProperty} 
        isLoading={isLoading}
        onAdd={() => openModal('add')}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      
      <Modal isOpen={isModalOpen} onClose={closeModal} title={
        modalType === 'add' ? 'إضافة عقار جديد' :
        modalType === 'edit' ? 'تعديل العقار' : 'تفاصيل العقار'
      }>
        {modalType === 'add' && <PropertyForm onSubmit={handleFormSubmit} onClose={closeModal} />}
        {modalType === 'edit' && selectedProperty && <PropertyForm initialData={selectedProperty} onSubmit={handleFormSubmit} onClose={closeModal} />}
        {modalType === 'view' && selectedProperty && <PropertyDetails property={selectedProperty} />}
      </Modal>

    </div>
  );
};

export default Properties;
