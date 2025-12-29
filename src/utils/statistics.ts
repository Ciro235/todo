import type { Purchase, TimeRange } from '../types';
import { CATEGORIES } from '../constants';

export function calculateStatistics(purchases: Purchase[], timeRange: TimeRange) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const filtered = purchases.filter(p => {
    const pDate = new Date(p.date);
    const diff = now.getTime() - pDate.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    
    if (timeRange === 'daily') return days <= 1;
    if (timeRange === 'weekly') return days <= 7;
    return pDate.getMonth() === currentMonth && pDate.getFullYear() === currentYear;
  });
  
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  
  const lastMonthPurchases = purchases.filter(p => {
    const pDate = new Date(p.date);
    return pDate.getMonth() === lastMonth && pDate.getFullYear() === lastMonthYear;
  });

  const currentTotal = filtered.reduce((sum, p) => sum + p.amount, 0);
  const lastTotal = lastMonthPurchases.reduce((sum, p) => sum + p.amount, 0);
  const difference = currentTotal - lastTotal;
  const percentChange = lastTotal > 0 ? ((difference / lastTotal) * 100) : 0;

  const byCategory = CATEGORIES.map(cat => ({
    name: cat,
    current: filtered.filter(p => p.category === cat).reduce((sum, p) => sum + p.amount, 0),
    last: lastMonthPurchases.filter(p => p.category === cat).reduce((sum, p) => sum + p.amount, 0)
  })).filter(c => c.current > 0 || c.last > 0);

  const timeline = filtered.reduce((acc: any, p) => {
    const date = timeRange === 'daily' 
      ? new Date(p.date).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
      : p.date;
    if (!acc[date]) acc[date] = 0;
    acc[date] += p.amount;
    return acc;
  }, {});

  const timelineData = Object.entries(timeline).map(([date, amount]) => ({
    date,
    amount
  })).sort((a, b) => a.date.localeCompare(b.date));

  return { 
    currentTotal, 
    lastTotal, 
    difference, 
    percentChange,
    byCategory, 
    timeline: timelineData, 
    currentCount: filtered.length,
    lastCount: lastMonthPurchases.length
  };
}