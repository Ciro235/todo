import type { Purchase, Filters, SortConfig } from '../types';

export function applyFilters(
  purchases: Purchase[],
  searchTerm: string,
  filters: Filters,
  sortConfig: SortConfig | null
): Purchase[] {
  let result = purchases.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (filters.categories.length > 0) {
    result = result.filter(p => filters.categories.includes(p.category));
  }
  
  if (filters.dateRange.start || filters.dateRange.end) {
    result = result.filter(p => {
      const purchaseDate = new Date(p.date).getTime();
      const startDate = filters.dateRange.start ? new Date(filters.dateRange.start).getTime() : 0;
      const endDate = filters.dateRange.end ? new Date(filters.dateRange.end).getTime() : Infinity;
      return purchaseDate >= startDate && purchaseDate <= endDate;
    });
  }
  
  if (filters.minAmount !== null) {
    result = result.filter(p => p.amount >= filters.minAmount!);
  }
  
  if (filters.maxAmount !== null) {
    result = result.filter(p => p.amount <= filters.maxAmount!);
  }
  
  if (sortConfig !== null) {
    result = [...result].sort((a, b) => {
      if (sortConfig.key === 'name') {
        return sortConfig.direction === 'ascending' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortConfig.key === 'amount') {
        return sortConfig.direction === 'ascending'
          ? a.amount - b.amount
          : b.amount - a.amount;
      } else if (sortConfig.key === 'category') {
        return sortConfig.direction === 'ascending'
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      } else if (sortConfig.key === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortConfig.direction === 'ascending'
          ? dateA - dateB
          : dateB - dateA;
      }
      return 0;
    });
  }
  
  return result;
}