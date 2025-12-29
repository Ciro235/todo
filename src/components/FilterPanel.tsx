import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown, Filter, ChevronUp, ChevronDown } from 'lucide-react';
import type { Filters, SortConfig, Purchase } from '../types';
import { CATEGORIES } from '../constants';

interface FilterPanelProps {
  showFilters: boolean;
  filters: Filters;
  sortConfig: SortConfig | null;
  onToggleFilters: () => void;
  onSort: (key: keyof Purchase) => void;
  onToggleCategoryFilter: (category: string) => void;
  onFiltersChange: (filters: Filters) => void;
  onClearFilters: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  showFilters,
  filters,
  sortConfig,
  onToggleFilters,
  onSort,
  onToggleCategoryFilter,
  onFiltersChange,
  onClearFilters
}) => (
  <div className="mb-6 space-y-4">
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSort('name')}
        className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
          sortConfig?.key === 'name'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Nombre
        {sortConfig?.key === 'name' && (
          sortConfig.direction === 'ascending' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
        )}
      </button>
      <button
        onClick={() => onSort('amount')}
        className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
          sortConfig?.key === 'amount'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Precio
        {sortConfig?.key === 'amount' && (
          sortConfig.direction === 'ascending' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
        )}
      </button>
      <button
        onClick={() => onSort('category')}
        className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
          sortConfig?.key === 'category'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Categoría
        {sortConfig?.key === 'category' && (
          sortConfig.direction === 'ascending' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
        )}
      </button>
      <button
        onClick={() => onSort('date')}
        className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
          sortConfig?.key === 'date'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Fecha
        {sortConfig?.key === 'date' && (
          sortConfig.direction === 'ascending' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
        )}
      </button>
      <button
        onClick={onToggleFilters}
        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all flex items-center gap-2"
      >
        <Filter className="w-4 h-4" />
        Filtros
        {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
    </div>

    <AnimatePresence>
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-hidden"
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-gray-700">Categorías</h4>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => onToggleCategoryFilter(cat)}
                    className={`px-3 py-1 rounded-full transition-all ${
                      filters.categories.includes(cat)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-gray-700">Rango de fechas</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Desde</label>
                  <input
                    type="date"
                    value={filters.dateRange.start || ''}
                    onChange={(e) => onFiltersChange({
                      ...filters,
                      dateRange: { ...filters.dateRange, start: e.target.value || null }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Hasta</label>
                  <input
                    type="date"
                    value={filters.dateRange.end || ''}
                    onChange={(e) => onFiltersChange({
                      ...filters,
                      dateRange: { ...filters.dateRange, end: e.target.value || null }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 text-gray-700">Rango de precios</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Mínimo</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={filters.minAmount || ''}
                    onChange={(e) => onFiltersChange({
                      ...filters,
                      minAmount: e.target.value ? parseFloat(e.target.value) : null
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Máximo</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="9999.99"
                    value={filters.maxAmount || ''}
                    onChange={(e) => onFiltersChange({
                      ...filters,
                      maxAmount: e.target.value ? parseFloat(e.target.value) : null
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <span className="text-sm text-gray-600">
                {filters.categories.length} categorías seleccionadas
                {(filters.dateRange.start || filters.dateRange.end || filters.minAmount !== null || filters.maxAmount !== null) && 
                  ' • Filtros adicionales activos'}
              </span>
              <button
                onClick={onClearFilters}
                className="px-4 py-2 text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg transition-all"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);