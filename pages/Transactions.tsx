
import React, {useState} from 'react';
import { Transaction } from '../types';
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon, SpinnerIcon, TransactionsIcon } from '../components/icons';
import Modal from '../components/Modal';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';


// Form for adding/editing transactions
const emptyTransaction: Omit<Transaction, 'id'> = { type: 'Revenue', category: '', amount: 0, date: new Date().toISOString().split('T')[0], description: '', propertyId: 1, unitId: 101 };

const TransactionForm: React.FC<{
  initialData?: Transaction | null;
  onSubmit: (data: Omit<Transaction, 'id'> | Transaction) => void;
  onClose: () => void;
}> = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(initialData || emptyTransaction);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isNumber = type === 'number';
    setFormData(prev => ({ ...prev, [name]: isNumber ? parseFloat(value) || 0 : value }));
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
          <label htmlFor="type" className="block text-sm font-medium text-slate-700">النوع</label>
          <select id="type" name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md">
            <option value="Revenue">إيراد</option>
            <option value="Expense">مصروف</option>
          </select>
        </div>
         <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700">الفئة</label>
          <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
        </div>
         <div>
          <label htmlFor="amount" className="block text-sm font-medium text-slate-700">المبلغ (ر.س)</label>
          <input type="number" name="amount" id="amount" value={formData.amount} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
        </div>
         <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-700">التاريخ</label>
          <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
        </div>
         <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">الوصف</label>
          <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"></textarea>
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

const TransactionDetails: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
    <div className="space-y-2">
         <dl className="divide-y divide-slate-100">
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-slate-500">النوع</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">{transaction.type === 'Revenue' ? 'إيراد' : 'مصروف'}</dd>
            </div>
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-slate-500">الفئة</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">{transaction.category}</dd>
            </div>
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-slate-500">المبلغ</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">{transaction.amount.toLocaleString()} ر.س</dd>
            </div>
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-slate-500">التاريخ</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">{new Date(transaction.date).toLocaleDateString('ar-SA')}</dd>
            </div>
            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-slate-500">الوصف</dt>
                <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">{transaction.description}</dd>
            </div>
        </dl>
    </div>
);


const TransactionsTable: React.FC<{ transactions: Transaction[], onView: (tx: Transaction) => void, onEdit: (tx: Transaction) => void, onDelete: (id: number) => void, isLoading: boolean, onAdd: () => void }> = ({ transactions, onView, onEdit, onDelete, isLoading, onAdd }) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200/80">
      <div className="overflow-x-auto">
        <table className="w-full text-right min-w-[768px]">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider">النوع</th>
              <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider">الفئة</th>
              <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider">المبلغ</th>
              <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider">التاريخ</th>
              <th className="p-4 text-sm font-semibold text-slate-500 text-right uppercase tracking-wider">الوصف</th>
              <th className="p-4 text-sm font-semibold text-slate-500 text-center uppercase tracking-wider">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
             {isLoading ? <SkeletonLoader rows={5} cols={6} /> : transactions.length > 0 ? transactions.map((tx, index) => (
              <tr key={tx.id} className="odd:bg-white even:bg-slate-50/50 group transition-colors duration-200 hover:bg-teal-50/50 opacity-0 animate-stagger-in" style={{ animationDelay: `${index * 50}ms` }}>
                <td className="p-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    tx.type === 'Revenue' ? 'bg-teal-100 text-teal-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {tx.type === 'Revenue' ? 'إيراد' : 'مصروف'}
                  </span>
                </td>
                <td className="p-4 whitespace-nowrap text-slate-600">{tx.category}</td>
                <td className={`p-4 whitespace-nowrap font-semibold ${tx.type === 'Revenue' ? 'text-teal-600' : 'text-red-600'}`}>
                  {tx.amount.toLocaleString()} ر.س
                </td>
                <td className="p-4 whitespace-nowrap text-slate-600">{new Date(tx.date).toLocaleDateString('ar-SA')}</td>
                <td className="p-4 whitespace-nowrap text-slate-600 truncate max-w-xs">{tx.description}</td>
                <td className="p-4 whitespace-nowrap">
                  <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => onView(tx)} className="p-2 rounded-full text-slate-500 hover:bg-teal-100 hover:text-teal-500 transition-all duration-200 hover:scale-125" title="عرض">
                      <EyeIcon />
                    </button>
                    <button onClick={() => onEdit(tx)} className="p-2 rounded-full text-slate-500 hover:bg-amber-100 hover:text-amber-500 transition-all duration-200 hover:scale-125" title="تعديل">
                      <PencilIcon />
                    </button>
                    <button onClick={() => onDelete(tx.id)} className="p-2 rounded-full text-slate-500 hover:bg-red-100 hover:text-red-500 transition-all duration-200 hover:scale-125" title="حذف">
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
         {!isLoading && transactions.length === 0 && (
            <EmptyState
                icon={<TransactionsIcon />}
                title="لا توجد معاملات مسجلة"
                message="ابدأ بتسجيل إيراداتك ومصروفاتك لتتبع أموالك."
                action={{ label: 'إضافة معاملة', onClick: onAdd }}
            />
        )}
      </div>
    </div>
  );
};


const Transactions: React.FC<{
  transactions: Transaction[],
  addTransaction: (tx: Omit<Transaction, 'id'>) => void,
  updateTransaction: (tx: Transaction) => void,
  deleteTransaction: (id: number) => void,
  isLoading: boolean
}> = ({ transactions, addTransaction, updateTransaction, deleteTransaction, isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'view' | null>(null);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const openModal = (type: 'add' | 'edit' | 'view', tx?: Transaction) => {
    setModalType(type);
    setSelectedTx(tx || null);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = (data: Omit<Transaction, 'id'> | Transaction) => {
    if ('id' in data) {
      updateTransaction(data);
    } else {
      addTransaction(data);
    }
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
         <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">المعاملات</h2>
           <p className="text-slate-600 mt-1">تتبع جميع الإيرادات والمصروفات المالية.</p>
        </div>
        <button onClick={() => openModal('add')} className="flex items-center bg-teal-500 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-teal-600 transition btn-press w-full sm:w-auto justify-center">
          <PlusIcon />
          <span>إضافة معاملة</span>
        </button>
      </div>
      <TransactionsTable 
        transactions={transactions} 
        onView={(tx) => openModal('view', tx)} 
        onEdit={(tx) => openModal('edit', tx)} 
        onDelete={deleteTransaction} 
        isLoading={isLoading}
        onAdd={() => openModal('add')}
      />
      
      <Modal isOpen={isModalOpen} onClose={closeModal} title={
        modalType === 'add' ? 'إضافة معاملة جديدة' :
        modalType === 'edit' ? 'تعديل المعاملة' : 'تفاصيل المعاملة'
      }>
        {modalType === 'add' && <TransactionForm onSubmit={handleFormSubmit} onClose={closeModal} />}
        {modalType === 'edit' && selectedTx && <TransactionForm initialData={selectedTx} onSubmit={handleFormSubmit} onClose={closeModal} />}
        {modalType === 'view' && selectedTx && <TransactionDetails transaction={selectedTx} />}
      </Modal>
    </div>
  );
};

export default Transactions;