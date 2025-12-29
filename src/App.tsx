// src/App.tsx
import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, TrendingUp } from 'lucide-react';
import { usePurchases } from './hooks/usePurchases';
import { useDebounce } from './hooks/useDebounce';
import { applyFilters } from './utils/filters';
import { calculateStatistics } from './utils/statistics';
import { ToastContainer } from './components/ToastContainer';
import { PurchaseItem } from './components/PurchaseItem';
import { PurchaseForm } from './components/PurchaseForm';
import { FilterPanel } from './components/FilterPanel';
import { StatisticsView } from './components/StatisticsView';
import type { Purchase, ViewMode, TimeRange, SortConfig, Filters } from './types';
import { INITIAL_FORM_STATE, INITIAL_FILTERS, DEBOUNCE_DELAY } from './constants';

export default function ShoppingExpenseTracker() {
  const { purchases, addPurchase, updatePurchase, deletePurchase, toasts } = usePurchases();
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [compareMode, setCompareMode] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, DEBOUNCE_DELAY);

  useEffect(() => {
    console.log('📊 Current state - Total purchases:', purchases.length);
  }, [purchases]);

  const handleSubmit = useCallback(() => {
    if (!form.name || !form.amount) return;

    if (editingId) {
      updatePurchase(editingId, { ...form, amount: parseFloat(form.amount) });
      setEditingId(null);
    } else {
      addPurchase({ ...form, amount: parseFloat(form.amount) });
    }
    setForm(INITIAL_FORM_STATE);
  }, [form, editingId, addPurchase, updatePurchase]);

  const handleEdit = useCallback((purchase: Purchase) => {
    setForm({ 
      name: purchase.name, 
      amount: purchase.amount.toString(), 
      category: purchase.category,
      date: purchase.date
    });
    setEditingId(purchase.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDelete = useCallback((id: string) => {
    deletePurchase(id);
  }, [deletePurchase]);

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setForm(INITIAL_FORM_STATE);
  }, []);

  const handleSort = useCallback((key: keyof Purchase) => {
    setSortConfig(prev => {
      if (prev?.key === key) {
        return {
          key,
          direction: prev.direction === 'ascending' ? 'descending' : 'ascending'
        };
      }
      return { key, direction: 'ascending' };
    });
  }, []);

  const toggleCategoryFilter = useCallback((category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setSortConfig(null);
  }, []);

  const filteredPurchases = useMemo(() => 
    applyFilters(purchases, debouncedSearch, filters, sortConfig),
    [purchases, debouncedSearch, filters, sortConfig]
  );

  const stats = useMemo(() => 
    calculateStatistics(purchases, timeRange),
    [purchases, timeRange]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-2 sm:p-4 md:p-6">
      <ToastContainer toasts={toasts} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-4 sm:p-6 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <motion.div 
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                className="flex items-center gap-2 sm:gap-3"
              >
                <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Gestor de Compras</h1>
              </motion.div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setView('list')}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base font-medium ${
                    view === 'list' ? 'bg-white text-blue-900' : 'bg-blue-800 hover:bg-blue-700'
                  }`}
                >
                  Lista
                </button>
                <button
                  onClick={() => setView('stats')}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg transition-all text-sm sm:text-base font-medium ${
                    view === 'stats' ? 'bg-white text-blue-900' : 'bg-blue-800 hover:bg-blue-700'
                  }`}
                >
                  Estadísticas
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {view === 'list' ? (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-3 sm:p-4 md:p-6"
              >
                <PurchaseForm
                  form={form}
                  editingId={editingId}
                  onFormChange={setForm}
                  onSubmit={handleSubmit}
                  onCancel={cancelEdit}
                />

                <div className="mb-4 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar compras..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <FilterPanel
                  showFilters={showFilters}
                  filters={filters}
                  sortConfig={sortConfig}
                  onToggleFilters={() => setShowFilters(!showFilters)}
                  onSort={handleSort}
                  onToggleCategoryFilter={toggleCategoryFilter}
                  onFiltersChange={setFilters}
                  onClearFilters={clearFilters}
                />

                {(filters.categories.length > 0 || filters.dateRange.start || filters.dateRange.end || filters.minAmount !== null || filters.maxAmount !== null || sortConfig) && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="font-medium text-blue-700">Filtros aplicados:</span>
                      
                      {filters.categories.length > 0 && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Categorías: {filters.categories.join(', ')}
                        </span>
                      )}
                      
                      {filters.dateRange.start && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Desde: {filters.dateRange.start}
                        </span>
                      )}
                      
                      {filters.dateRange.end && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Hasta: {filters.dateRange.end}
                        </span>
                      )}
                      
                      {filters.minAmount !== null && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Mín: ${filters.minAmount.toFixed(2)}
                        </span>
                      )}
                      
                      {filters.maxAmount !== null && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Máx: ${filters.maxAmount.toFixed(2)}
                        </span>
                      )}
                      
                      {sortConfig && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Ordenado por: {sortConfig.key} ({sortConfig.direction})
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <AnimatePresence mode="popLayout">
                  {filteredPurchases.length === 0 ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8 sm:py-12 text-gray-400"
                    >
                      <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-50" />
                      <p className="text-base sm:text-lg">
                        {searchTerm ? 'No se encontraron resultados' : 'No hay compras registradas'}
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-0">
                      {filteredPurchases.map((purchase) => (
                        <PurchaseItem
                          key={purchase.id}
                          purchase={purchase}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                        />
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              purchases.length === 0 ? (
                <motion.div
                  key="stats-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8 sm:py-12 text-gray-400 p-6"
                >
                  <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-50" />
                  <p className="text-base sm:text-lg px-4">Agrega compras para ver estadísticas</p>
                </motion.div>
              ) : (
                <StatisticsView
                  key="stats"
                  stats={stats}
                  timeRange={timeRange}
                  compareMode={compareMode}
                  onTimeRangeChange={setTimeRange}
                  onCompareModeToggle={() => setCompareMode(!compareMode)}
                />
              )
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
      