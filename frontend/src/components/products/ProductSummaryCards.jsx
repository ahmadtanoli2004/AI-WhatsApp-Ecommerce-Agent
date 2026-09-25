import { Package, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import StatCard from '../dashboard/StatCard';

export default function ProductSummaryCards({ products }) {
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'Active').length;
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 10).length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  return (
    <div className="dashboard-grid stat-cards-grid">
      <StatCard
        title="Total Products"
        value={totalProducts}
        change="+2.4%"
        isPositive={true}
        icon={Package}
      />
      <StatCard
        title="Active Products"
        value={activeProducts}
        change="+5.1%"
        isPositive={true}
        icon={CheckCircle}
      />
      <StatCard
        title="Low Stock"
        value={lowStock}
        change="-1.2%"
        isPositive={false}
        icon={AlertTriangle}
      />
      <StatCard
        title="Out of Stock"
        value={outOfStock}
        change="+0.5%"
        isPositive={false}
        icon={XCircle}
      />
    </div>
  );
}
