import { ArrowLeft, MessageSquare, Edit2, Mail, Phone, Calendar, Hash } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockApiService } from '../../services/mockApiService';
import StatusBadge from '../ui/StatusBadge';
import CustomerOrderHistory from './CustomerOrderHistory';
import CustomerActivityTimeline from './CustomerActivityTimeline';
import '../orders/OrderDetails.css'; // Reuse grid layout

export default function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  const fetchCustomer = async () => {
    try {
      const data = await mockApiService.getCustomerById(id);
      setCustomer(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    }).format(new Date(dateString));
  };

  const calculateAOV = (totalSpent, ordersCount) => {
    if (ordersCount === 0) return 0;
    return (totalSpent / ordersCount).toFixed(2);
  };

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading customer details...</div>;
  if (error || !customer) return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <h3 className="text-danger">{error || 'Customer not found'}</h3>
      <button className="btn btn-outline mt-4" onClick={() => navigate('/customers')}>Back to Customers</button>
    </div>
  );

  return (
    <div className="order-details-container fade-in">
      <div className="od-header">
        <div className="od-header-left">
          <button className="btn btn-outline" onClick={() => navigate('/customers')}>
            <ArrowLeft size={16} /> Back
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '0.5rem' }}>
            <div className="avatar" style={{ width: '48px', height: '48px', fontSize: '1.25rem' }}>
              {customer.avatar}
            </div>
            <div>
              <h2 className="od-title" style={{ fontFamily: 'var(--font-family)', fontSize: '1.25rem' }}>
                {customer.name}
              </h2>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                <StatusBadge status={customer.status} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="od-actions">
          <button className="btn btn-primary" onClick={() => navigate(`/conversations?userId=${customer.id}`)}>
            <MessageSquare size={16} /> Start Conversation
          </button>
          <button className="btn btn-outline">
            <Edit2 size={16} /> Edit Customer
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="dashboard-grid stat-cards-grid" style={{ marginBottom: '0' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="text-muted text-sm font-medium text-uppercase">Total Orders</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem' }}>{customer.ordersCount}</div>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="text-muted text-sm font-medium text-uppercase">Total Spent</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem' }}>${customer.totalSpent.toFixed(2)}</div>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="text-muted text-sm font-medium text-uppercase">Average Order Value</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.5rem' }}>${calculateAOV(customer.totalSpent, customer.ordersCount)}</div>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="text-muted text-sm font-medium text-uppercase">Last Order</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem', paddingTop: '0.25rem' }}>
            {customer.orders.length > 0 ? formatDate(customer.orders[0].date) : 'N/A'}
          </div>
        </div>
      </div>

      <div className="od-grid">
        <div className="od-main">
          <CustomerOrderHistory orders={customer.orders} />
          <CustomerActivityTimeline timeline={customer.timeline} />
        </div>

        <div className="od-sidebar">
          <div className="card od-card">
            <h3 className="card-title">Contact Information</h3>
            <div className="contact-list">
              <div className="contact-item">
                <Phone size={16} className="text-success" />
                <div>
                  <div className="font-medium">{customer.whatsapp}</div>
                  <div className="text-muted text-sm">WhatsApp</div>
                </div>
              </div>
              <div className="contact-item">
                <Mail size={16} className="text-muted" />
                <div>
                  <div className="font-medium">{customer.email}</div>
                  <div className="text-muted text-sm">Email</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card od-card">
            <h3 className="card-title">Customer Information</h3>
            <div className="contact-list">
              <div className="contact-item">
                <Hash size={16} className="text-muted" />
                <div>
                  <div className="font-medium" style={{ fontFamily: 'monospace' }}>{customer.id}</div>
                  <div className="text-muted text-sm">Customer ID</div>
                </div>
              </div>
              <div className="contact-item">
                <Calendar size={16} className="text-muted" />
                <div>
                  <div className="font-medium">{formatDate(customer.joinedDate)}</div>
                  <div className="text-muted text-sm">Joined Date</div>
                </div>
              </div>
              <div className="contact-item">
                <Calendar size={16} className="text-muted" />
                <div>
                  <div className="font-medium">{formatDate(customer.lastActivity)}</div>
                  <div className="text-muted text-sm">Last Activity</div>
                </div>
              </div>
            </div>
          </div>

          {customer.tags && customer.tags.length > 0 && (
            <div className="card od-card">
              <h3 className="card-title">Tags</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {customer.tags.map(tag => (
                  <span key={tag} style={{ 
                    padding: '4px 10px', 
                    background: 'var(--bg-main)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 500
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
