import { useNavigate } from 'react-router-dom';
import { Eye, Package } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';

export default function CustomerOrderHistory({ orders }) {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    }).format(new Date(dateString));
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="card od-card">
        <h3 className="card-title">Order History</h3>
        <p className="text-muted text-center" style={{ padding: '2rem 0' }}>No orders placed yet.</p>
      </div>
    );
  }

  return (
    <div className="card od-card">
      <h3 className="card-title">Order History</h3>
      <div className="table-responsive">
        <table className="product-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th className="text-center">Items</th>
              <th className="text-right">Total</th>
              <th>Status</th>
              <th>Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="product-row">
                <td className="font-medium" style={{ fontFamily: 'monospace' }}>{order.id}</td>
                <td className="text-center">{order.items}</td>
                <td className="text-right font-medium">${order.total.toFixed(2)}</td>
                <td><StatusBadge status={order.status} /></td>
                <td className="text-muted text-sm">{formatDate(order.date)}</td>
                <td className="actions-cell text-right">
                  <button className="action-btn view-btn" onClick={() => navigate(`/orders/${order.id}`)} title="View Order">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
