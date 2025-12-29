import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { TimeRange } from '../types';
import { COLORS } from '../constants';

interface StatisticsViewProps {
  stats: any;
  timeRange: TimeRange;
  compareMode: boolean;
  onTimeRangeChange: (range: TimeRange) => void;
  onCompareModeToggle: () => void;
}

export const StatisticsView: React.FC<StatisticsViewProps> = ({
  stats,
  timeRange,
  compareMode,
  onTimeRangeChange,
  onCompareModeToggle
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="p-3 sm:p-4 md:p-6"
  >
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['daily', 'weekly', 'monthly'] as const).map(range => (
          <button
            key={range}
            onClick={() => onTimeRangeChange(range)}
            className={`flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
              timeRange === range
                ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {range === 'daily' ? 'Diario' : range === 'weekly' ? 'Semanal' : 'Mensual'}
          </button>
        ))}
      </div>
      
      {timeRange === 'monthly' && (
        <button
          onClick={onCompareModeToggle}
          className={`w-full px-4 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
            compareMode
              ? 'bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-lg'
              : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          }`}
        >
          {compareMode ? '✓ Comparando con mes anterior' : 'Comparar con mes anterior'}
        </button>
      )}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 sm:p-6 rounded-lg sm:rounded-xl text-white shadow-xl"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
          <h3 className="text-sm sm:text-lg font-medium opacity-90">
            {timeRange === 'daily' ? 'Hoy' : timeRange === 'weekly' ? 'Esta Semana' : 'Este Mes'}
          </h3>
        </div>
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold break-all">
          ${stats.currentTotal.toFixed(2)}
        </p>
        {compareMode && timeRange === 'monthly' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-sm mt-2 ${stats.difference >= 0 ? 'text-blue-200' : 'text-blue-100'}`}
          >
            {stats.difference >= 0 ? '+' : ''}{stats.percentChange.toFixed(1)}% vs mes anterior
          </motion.p>
        )}
      </motion.div>
      
      {compareMode && timeRange === 'monthly' && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-gray-700 to-gray-900 p-4 sm:p-6 rounded-lg sm:rounded-xl text-white shadow-xl"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
            <h3 className="text-sm sm:text-lg font-medium opacity-90">Mes Anterior</h3>
          </div>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold break-all">
            ${stats.lastTotal.toFixed(2)}
          </p>
          <p className="text-sm mt-2 text-gray-300">
            {stats.lastCount} compras
          </p>
        </motion.div>
      )}

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 sm:p-6 rounded-lg sm:rounded-xl text-white shadow-xl"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
          <h3 className="text-sm sm:text-lg font-medium opacity-90">Compras</h3>
        </div>
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold">{stats.currentCount}</p>
      </motion.div>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-gray-700 to-gray-900 p-4 sm:p-6 rounded-lg sm:rounded-xl text-white shadow-xl"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />
          <h3 className="text-sm sm:text-lg font-medium opacity-90">Promedio</h3>
        </div>
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold break-all">
          ${stats.currentCount > 0 ? (stats.currentTotal / stats.currentCount).toFixed(2) : '0.00'}
        </p>
      </motion.div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg border-2 border-gray-200"
      >
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Tendencia de Gastos</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={stats.timeline}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '2px solid #e5e7eb', 
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value: number | undefined) => value !== undefined ? `$${value.toFixed(2)}` : '$0.00'}
            />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#2563eb" 
              strokeWidth={3}
              dot={{ fill: '#2563eb', r: 5 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg border-2 border-gray-200"
      >
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Gastos por Categoría</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={stats.byCategory.map((c: any) => ({ name: c.name, value: c.current }))}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: any) => {
                if (percent < 0.05) return '';
                return `${name} ${(percent * 100).toFixed(0)}%`;
              }}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {stats.byCategory.map((_: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number | undefined) => value !== undefined ? `$${value.toFixed(2)}` : '$0.00'}
              contentStyle={{ fontSize: '12px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {compareMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg border-2 border-gray-200 lg:col-span-2"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900">Comparación por Categoría</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.byCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: number | undefined) => value !== undefined ? `$${value.toFixed(2)}` : '$0.00'}
              />
              <Legend />
              <Bar dataKey="current" fill="#1e40af" name="Mes Actual" radius={[8, 8, 0, 0]} />
              <Bar dataKey="last" fill="#475569" name="Mes Anterior" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}
    </div>
  </motion.div>
);
