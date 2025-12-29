import { memo } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Calendar } from 'lucide-react';
import type { Purchase } from '../types';

interface PurchaseItemProps {
  purchase: Purchase;
  onEdit: (purchase: Purchase) => void;
  onDelete: (id: string) => void;
}

export const PurchaseItem = memo(({ purchase, onEdit, onDelete }: PurchaseItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: -100 }}
    layout
    className="mb-2 sm:mb-3"
  >
    <div className="bg-white border-2 border-gray-200 p-3 sm:p-4 rounded-lg hover:shadow-lg transition-all hover:border-blue-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base sm:text-lg text-gray-900 truncate">{purchase.name}</h3>
          <div className="flex flex-wrap gap-2 sm:gap-4 mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
            <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full font-medium whitespace-nowrap">
              {purchase.category}
            </span>
            <span className="flex items-center gap-1 whitespace-nowrap text-gray-500">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              {new Date(purchase.date).toLocaleDateString('es', { 
                day: '2-digit', 
                month: '2-digit',
                year: '2-digit'
              })}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
          <span className="text-xl sm:text-2xl font-bold text-blue-600">
            ${purchase.amount.toFixed(2)}
          </span>
          <div className="flex gap-1 sm:gap-2">
            <button
              onClick={() => onEdit(purchase)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            >
              <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => onDelete(purchase.id)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
));

PurchaseItem.displayName = 'PurchaseItem';