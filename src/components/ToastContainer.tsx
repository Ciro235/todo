import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import type { Toast } from '../types';

interface ToastContainerProps {
  toasts: Toast[];
}

export const ToastContainer = memo(({ toasts }: ToastContainerProps) => (
  <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full px-4">
    <AnimatePresence>
      {toasts.map(toast => (
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className={`p-4 rounded-lg shadow-lg flex items-center gap-3 ${
            toast.type === 'success' ? 'bg-blue-600 text-white' :
            toast.type === 'error' ? 'bg-gray-800 text-white' :
            'bg-gray-700 text-white'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="font-medium">{toast.message}</span>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
));

ToastContainer.displayName = 'ToastContainer';