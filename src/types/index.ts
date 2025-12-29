export interface Purchase {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface Filters {
  categories: string[];
  dateRange: { start: string | null; end: string | null };
  minAmount: number | null;
  maxAmount: number | null;
}

export interface SortConfig {
  key: keyof Purchase;
  direction: 'ascending' | 'descending';
}

export type TimeRange = 'daily' | 'weekly' | 'monthly';
export type ViewMode = 'list' | 'stats';