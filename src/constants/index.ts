export const CATEGORIES = ['Alimentos', 'Transporte', 'Entretenimiento', 'Salud', 'Hogar', 'Otros'] as const;
export const COLORS = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#1e293b', '#475569'] as const;
export const TOAST_DURATION = 3000;
export const DEBOUNCE_DELAY = 300;

export const INITIAL_FORM_STATE = {
  name: '',
  amount: '',
  category: 'Alimentos',
  date: new Date().toISOString().split('T')[0]
};

export const INITIAL_FILTERS = {
  categories: [],
  dateRange: { start: null, end: null },
  minAmount: null,
  maxAmount: null
};