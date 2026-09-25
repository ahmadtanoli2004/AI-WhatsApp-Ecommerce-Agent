import { Eye, Edit2, Trash2 } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';

export default function OrderTable({ orders, onView }) {
  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    }).format(new Date(dateString));
  };

  const getPaymentBadgeClass = (status) => {
    switch (status) {
      case 'Paid': return 'text-success';
      case 'Pending': return 'text-warning';
      case 'Failed': return 'text-danger';
      case 'Refunded': return 'text-muted';
      default: return '';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="card table-empty-state">
        <div className="empty-icon-wrapper">
          <Eye size={32} />
        </div>
        <h3>No orders found</h3>
        <p className="text-muted">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="card table-card fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="table-responsive">
        <table className="product-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="product-row">
                <td className="font-medium" style={{ fontFamily: 'monospace' }}>
                  {order.id}
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 500 }}>{order.customer.name}</span>
                    <span className="text-muted text-sm">{order.customer.email}</span>
                  </div>
                </td>
                <td className="text-muted">
                  {order.items.reduce((acc, item) => acc + item.quantity, 0)} items
                </td>
                <td className="font-medium">
                  ${order.total.toFixed(2)}
                </td>
                <td>
                  <span className={getPaymentBadgeClass(order.paymentStatus)} style={{ fontWeight: 500, fontSize: '0.875rem' }}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
                <td className="text-muted text-sm">
                  {formatDate(order.date)}
                </td>
                <td className="actions-cell text-right">
                  <button className="action-btn view-btn" onClick={() => onView(order)} title="View Order">
                    <Eye size={16} />
                  </button>
                  <button className="action-btn edit-btn" onClick={() => onView(order)} title="Edit Order">
                    <Edit2 size={16} />
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
