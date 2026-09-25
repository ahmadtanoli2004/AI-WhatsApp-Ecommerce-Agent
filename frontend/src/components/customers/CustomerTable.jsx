import { Eye, MessageSquare, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../ui/StatusBadge';

export default function CustomerTable({ customers }) {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    }).format(new Date(dateString));
  };

  if (customers.length === 0) {
    return (
      <div className="card table-empty-state">
        <div className="empty-icon-wrapper">
          <Users size={32} />
        </div>
        <h3>No customers found</h3>
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
              <th>Customer</th>
              <th>WhatsApp</th>
              <th className="text-center">Orders</th>
              <th className="text-right">Total Spent</th>
              <th>Last Activity</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id} className="product-row">
                <td className="product-info-cell" style={{ minWidth: '250px' }}>
                  <div className="avatar">
                    {customer.avatar}
                  </div>
                  <div className="product-details">
                    <span className="product-name">{customer.name}</span>
                    <span className="product-desc">{customer.email}</span>
                  </div>
                </td>
                <td className="font-medium">{customer.whatsapp}</td>
                <td className="text-center font-medium">{customer.ordersCount}</td>
                <td className="text-right font-medium">${customer.totalSpent.toFixed(2)}</td>
                <td className="text-muted text-sm">{formatDate(customer.lastActivity)}</td>
                <td>
                  <StatusBadge status={customer.status} />
                </td>
                <td className="actions-cell text-right">
                  <button className="action-btn view-btn" onClick={() => navigate(`/customers/${customer.id}`)} title="View Customer">
                    <Eye size={16} />
                  </button>
                  <button className="action-btn edit-btn" onClick={() => navigate(`/conversations?userId=${customer.id}`)} title="View Conversation">
                    <MessageSquare size={16} />
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
