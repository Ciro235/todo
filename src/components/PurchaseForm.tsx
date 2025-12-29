import React from 'react';
import { Plus, Save, X } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface PurchaseFormProps {
  form: {
    name: string;
    amount: string;
    category: string;
    date: string;
  };
  editingId: string | null;
  onFormChange: (form: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

export const PurchaseForm: React.FC<PurchaseFormProps> = ({ 
  form, 
  editingId, 
  onFormChange, 
  onSubmit, 
  onCancel 
}) => (
  <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl mb-4 sm:mb-6 shadow-sm border border-gray-200">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
      <input
        type="text"
        placeholder="Producto"
        value={form.name}
        onChange={(e) => onFormChange({ ...form, name: e.target.value })}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
      />
      <input
        type="number"
        step="0.01"
        placeholder="Precio"
        value={form.amount}
        onChange={(e) => onFormChange({ ...form, amount: e.target.value })}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
      />
      <select
        value={form.category}
        onChange={(e) => onFormChange({ ...form, category: e.target.value })}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
      >
        {CATEGORIES.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <input
        type="date"
        value={form.date}
        onChange={(e) => onFormChange({ ...form, date: e.target.value })}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
      />
      <div className="flex gap-2 sm:col-span-2 lg:col-span-1">
        <button
          onClick={onSubmit}
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all flex items-center justify-center gap-2 font-medium text-sm sm:text-base shadow-md"
        >
          {editingId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span className="hidden xs:inline">{editingId ? 'Guardar' : 'Agregar'}</span>
        </button>
        {editingId && (
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-gray-400 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  </div>
);