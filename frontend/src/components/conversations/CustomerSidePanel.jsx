import { X, ExternalLink, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../ui/StatusBadge';

export default function CustomerSidePanel({ customer, onClose, isMobile }) {
  const navigate = useNavigate();

  if (!customer) return null;

  return (
    <div className="chat-side-panel fade-in">
      <div className="side-panel-header">
        <h3>Customer Profile</h3>
        <button className="chat-icon-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="side-panel-content">
        <div className="side-profile-hero">
          <div className="side-avatar">{customer.avatar}</div>
          <h4>{customer.name}</h4>
          <span className="text-muted text-sm">{customer.email}</span>
          <div className="mt-2"><StatusBadge status={customer.status} /></div>
        </div>

        <div className="side-stats-grid">
          <div className="side-stat-box">
            <span className="stat-label">Orders</span>
            <span className="stat-val">{customer.ordersCount}</span>
          </div>
          <div className="side-stat-box">
            <span className="stat-label">Total Spent</span>
            <span className="stat-val">${customer.totalSpent.toFixed(2)}</span>
          </div>
        </div>

        {customer.tags && customer.tags.length > 0 && (
          <div className="side-section">
            <h5>Tags</h5>
            <div className="side-tags">
              {customer.tags.map(tag => (
                <span key={tag} className="side-tag">{tag}</span>
              ))}
            </div>
          </div>
        )}

        <div className="side-section">
          <h5>Latest Order</h5>
          {customer.orders && customer.orders.length > 0 ? (
            <div className="side-order-card" onClick={() => navigate(`/orders/${customer.orders[0].id}`)}>
              <div className="side-order-header">
                <span className="font-medium" style={{ fontFamily: 'monospace' }}>{customer.orders[0].id}</span>
                <span className="font-medium">${customer.orders[0].total.toFixed(2)}</span>
              </div>
              <div className="side-order-footer">
                <StatusBadge status={customer.orders[0].status} />
              </div>
            </div>
          ) : (
            <p className="text-muted text-sm">No recent orders.</p>
          )}
        </div>

        <button 
          className="btn btn-outline" 
          style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
          onClick={() => navigate(`/customers/${customer.id}`)}
        >
          View Full Profile <ExternalLink size={14} style={{ marginLeft: '4px' }}/>
        </button>
      </div>
    </div>
  );
}
