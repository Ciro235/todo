import { useCallback, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Purchase, Toast } from '../types';
import { TOAST_DURATION } from '../constants';

export function usePurchases() {
  const [purchases, setPurchases] = useLocalStorage<Purchase[]>('purchases', []);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, TOAST_DURATION);
  }, []);

  const addPurchase = useCallback((purchase: Omit<Purchase, 'id'>) => {
    const newPurchase = { ...purchase, id: Date.now().toString() };
    setPurchases(prev => {
      const updated = [newPurchase, ...prev];
      console.log('Purchase added, total:', updated.length);
      return updated;
    });
    addToast('Compra agregada exitosamente', 'success');
  }, [setPurchases, addToast]);

  const updatePurchase = useCallback((id: string, purchase: Omit<Purchase, 'id'>) => {
    setPurchases(prev => {
      const updated = prev.map(p => p.id === id ? { ...purchase, id } : p);
      console.log('Purchase updated');
      return updated;
    });
    addToast('Compra actualizada', 'success');
  }, [setPurchases, addToast]);

  const deletePurchase = useCallback((id: string) => {
    setPurchases(prev => {
      const updated = prev.filter(p => p.id !== id);
      console.log('Purchase deleted, total:', updated.length);
      return updated;
    });
    addToast('Compra eliminada', 'info');
  }, [setPurchases, addToast]);

  return { purchases, addPurchase, updatePurchase, deletePurchase, toasts };
}