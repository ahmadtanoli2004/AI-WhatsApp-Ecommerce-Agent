import { ArrowRight } from 'lucide-react';
import { recentOrdersData } from '../../data/mockDashboardData';
import './RecentOrders.css';

export default function RecentOrders() {
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Delivered': return 'badge-success';
      case 'Processing': return 'badge-warning';
      case 'Shipped': return 'badge-info';
      default: return 'badge-neutral';
    }
  };

  return (
    <div className="card recent-orders-card fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="card-header">
        <h3 className="card-title">Recent Orders</h3>
        <button className="btn-link">
          View All <ArrowRight size={16} />
        </button>
      </div>
      
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrdersData.map((order) => (
              <tr key={order.id}>
                <td className="font-medium">{order.id}</td>
                <td>{order.customer}</td>
                <td className="text-muted">{order.items} items</td>
                <td className="font-medium">${order.total.toFixed(2)}</td>
                <td>
                  <span className={`badge ${getStatusBadge(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="text-muted">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
