import { ShoppingBag, DollarSign, Users, Package } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import ChartCard from '../components/dashboard/ChartCard';
import RecentOrders from '../components/dashboard/RecentOrders';
import AIActivity from '../components/dashboard/AIActivity';
import WhatsAppStatus from '../components/dashboard/WhatsAppStatus';
import { statCardsData } from '../data/mockDashboardData';
import './Dashboard.css';

export default function Dashboard() {
  const getIcon = (id) => {
    switch (id) {
      case 'orders': return ShoppingBag;
      case 'revenue': return DollarSign;
      case 'customers': return Users;
      case 'products': return Package;
      default: return Package;
    }
  };

  return (
    <div className="dashboard-container fade-in">
      <div className="dashboard-welcome">
        <h2>Good morning, Admin</h2>
        <p className="text-muted">Here's what's happening with your store and AI agent today.</p>
      </div>

      {/* 4 Stat Cards */}
      <div className="dashboard-grid stat-cards-grid">
        {statCardsData.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            isPositive={stat.isPositive}
            icon={getIcon(stat.id)}
          />
        ))}
      </div>

      {/* Main Grid for Chart, AI, Orders, WA */}
      <div className="dashboard-grid main-content-grid">
        <ChartCard />
        
        <RecentOrders />
        
        <div className="dashboard-right-col">
          <WhatsAppStatus />
          <AIActivity />
        </div>
      </div>
    </div>
  );
}
