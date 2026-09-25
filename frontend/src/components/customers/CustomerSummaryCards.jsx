import { Users, UserCheck, UserPlus, Heart } from 'lucide-react';
import StatCard from '../dashboard/StatCard';

export default function CustomerSummaryCards({ customers }) {
  const total = customers.length + 3836; // Add base to mock larger db
  const active = customers.filter(c => c.status === 'Active').length + 2960;
  const newThisMonth = customers.filter(c => c.tags.includes('New Customer')).length + 283;
  const returning = customers.filter(c => c.tags.includes('Returning Customer')).length + 1474;

  return (
    <div className="dashboard-grid stat-cards-grid">
      <StatCard title="Total Customers" value={total} change="+4.2%" isPositive={true} icon={Users} />
      <StatCard title="Active Customers" value={active} change="+2.1%" isPositive={true} icon={UserCheck} />
      <StatCard title="New This Month" value={newThisMonth} change="+12.5%" isPositive={true} icon={UserPlus} />
      <StatCard title="Returning Customers" value={returning} change="+5.4%" isPositive={true} icon={Heart} />
    </div>
  );
}
