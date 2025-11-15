import React, { useState } from 'react';
import { Note } from '../types';
import { PlusIcon, PencilIcon, TrashIcon, SpinnerIcon, NotesIcon } from '../components/icons';
import Modal from '../components/Modal';
import EmptyState from '../components/EmptyState';

type NoteColor = 'yellow' | 'blue' | 'green' | 'pink';

const colorClasses: { [key in NoteColor]: { bg: string, text: string, border: string } } = {
  yellow: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' },
  blue: { bg: 'bg-sky-100', text: 'text-sky-800', border: 'border-sky-300' },
  green: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' },
  pink: { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-300' },
};

const emptyNote: Omit<Note, 'id' | 'createdAt'> = { title: '', content: '', color: 'yellow' };

// Note Form Component
const NoteForm: React.FC<{
  initialData?: Note | null;
  onSubmit: (data: Omit<Note, 'id'> | Note) => void;
  onClose: () => void;
}> = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(initialData ? { title: initialData.title, content: initialData.content, color: initialData.color } : emptyNote);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleColorChange = (color: NoteColor) => {
    setFormData(prev => ({ ...prev, color }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
        if (initialData) {
            onSubmit({ ...initialData, ...formData });
        } else {
            onSubmit({ ...formData, createdAt: new Date().toISOString() });
        }
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700">العنوان</label>
        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500" />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-slate-700">المحتوى</label>
        <textarea name="content" id="content" value={formData.content} onChange={handleChange} required rows={5} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">اللون</label>
        <div className="flex space-x-3 rtl:space-x-reverse">
            {Object.keys(colorClasses).map((colorKey) => {
                const color = colorKey as NoteColor;
                return (
                    <button type="button" key={color} onClick={() => handleColorChange(color)} className={`w-8 h-8 rounded-full ${colorClasses[color].bg} border-2 ${formData.color === color ? colorClasses[color].border : 'border-transparent'} transition`}></button>
                )
            })}
        </div>
      </div>
      <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-4">
        <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">إلغاء</button>
        <button type="submit" disabled={isSaving} className="inline-flex justify-center items-center w-24 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-teal-400">
          {isSaving ? <SpinnerIcon /> : 'حفظ'}
        </button>
      </div>
    </form>
  )
}


// Notes Page Component
const Notes: React.FC<{
  notes: Note[],
  addNote: (n: Omit<Note, 'id'>) => void,
  updateNote: (n: Note) => void,
  deleteNote: (id: number) => void,
  isLoading: boolean
}> = ({ notes, addNote, updateNote, deleteNote, isLoading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const openAddModal = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };
  
  const openEditModal = (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const handleFormSubmit = (data: Omit<Note, 'id'> | Note) => {
    if ('id' in data) {
      updateNote(data);
    } else {
      addNote(data);
    }
    closeModal();
  };
  
  const handleDelete = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الملاحظة؟')) {
        deleteNote(id);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">الملاحظات</h2>
          <p className="text-slate-600 mt-1">دون أفكارك ومهامك المهمة هنا.</p>
        </div>
        <button onClick={openAddModal} className="flex items-center bg-teal-500 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-teal-600 transition btn-press w-full sm:w-auto justify-center">
          <PlusIcon />
          <span>إضافة ملاحظة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-4 h-56 animate-pulse">
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-full"></div>
                        <div className="h-4 bg-slate-200 rounded w-full"></div>
                        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                    </div>
                </div>
            ))
        ) : notes.length > 0 ? (
          notes.map((note, index) => (
            <div 
              key={note.id} 
              className={`${colorClasses[note.color].bg} ${colorClasses[note.color].text} p-4 rounded-lg shadow-md flex flex-col justify-between h-56 relative group animate-stagger-in transition-transform hover:-translate-y-1`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="overflow-hidden">
                <h3 className="font-bold text-lg mb-2 truncate">{note.title}</h3>
                <p className="text-sm break-words line-clamp-5">{note.content}</p>
              </div>
              <div className="flex justify-between items-center text-xs opacity-70 mt-2">
                <span>{new Date(note.createdAt).toLocaleDateString('ar-SA')}</span>
                <div className="absolute top-2 left-2 flex space-x-1 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEditModal(note)} className="p-1.5 bg-black/10 rounded-full hover:bg-black/20 text-current" title="تعديل"><PencilIcon /></button>
                    <button onClick={() => handleDelete(note.id)} className="p-1.5 bg-black/10 rounded-full hover:bg-black/20 text-current" title="حذف"><TrashIcon /></button>
                </div>
              </div>
            </div>
          ))
        ) : (
            <div className="col-span-full">
                <EmptyState
                    icon={<NotesIcon />}
                    title="لا توجد ملاحظات بعد"
                    message="ابدأ بتدوين أفكارك وملاحظاتك المهمة بالضغط على زر الإضافة."
                    action={{ label: 'إضافة ملاحظة', onClick: openAddModal }}
                />
            </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedNote ? 'تعديل الملاحظة' : 'إضافة ملاحظة جديدة'}>
        <NoteForm initialData={selectedNote} onSubmit={handleFormSubmit} onClose={closeModal} />
      </Modal>

    </div>
  );
};

export default Notes;