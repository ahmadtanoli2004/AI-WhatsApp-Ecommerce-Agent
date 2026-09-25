import { ArrowLeft, Printer, Edit2, Trash2, CheckCircle2, User, MapPin, Truck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockApiService } from '../../services/mockApiService';
import StatusBadge from '../ui/StatusBadge';
import Toast from '../ui/Toast';
import OrderStatusModal from './OrderStatusModal';
import DeleteConfirmModal from '../products/DeleteConfirmModal';
import OrderSlip from './OrderSlip';
import './OrderDetails.css';

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [toast, setToast] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const data = await mockApiService.getOrderById(id);
      setOrder(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => setToast({ message, type });

  const handleUpdateStatus = async (newStatus) => {
    setActionLoading(true);
    try {
      await mockApiService.updateOrderStatus(id, { status: newStatus });
      showToast('Order status updated');
      setIsStatusModalOpen(false);
      fetchOrder();
    } catch (err) {
      showToast(err.message, 'danger');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    setActionLoading(true);
    try {
      await mockApiService.cancelOrder(id);
      showToast('Order cancelled successfully');
      setIsCancelModalOpen(false);
      fetchOrder();
    } catch (err) {
      showToast(err.message, 'danger');
    } finally {
      setActionLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString, showTime = true) => {
    if (!dateString) return '';
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    if (showTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading order details...</div>;
  if (error || !order) return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <h3 className="text-danger">{error || 'Order not found'}</h3>
      <button className="btn btn-outline mt-4" onClick={() => navigate('/orders')}>Back to Orders</button>
    </div>
  );

  return (
    <div className="order-details-container fade-in">
      {/* The Printable Order Slip (Hidden in UI, visible on print) */}
      <OrderSlip order={order} />
      
      {/* Standard UI (Visible in UI, hidden on print) */}
      <div className="screen-only">
        <div className="od-header">
          <div className="od-header-left">
            <button className="btn btn-outline" onClick={() => navigate('/orders')}>
              <ArrowLeft size={16} /> Back
            </button>
            <div>
              <h2 className="od-title">Order {order.id}</h2>
              <span className="text-muted text-sm">{formatDate(order.date)}</span>
            </div>
            <StatusBadge status={order.status} />
          </div>
          
          <div className="od-actions">
            <button className="btn btn-outline" onClick={() => setIsStatusModalOpen(true)}>
              Update Status
            </button>
            <button className="btn btn-outline" onClick={handlePrint}>
              <Printer size={16} /> Print Order Slip
            </button>
            <button className="btn btn-outline text-danger" onClick={() => setIsCancelModalOpen(true)} disabled={order.status === 'Cancelled' || order.status === 'Delivered'}>
              <Trash2 size={16} /> Cancel Order
            </button>
          </div>
        </div>

        <div className="od-grid">
          {/* Main Column */}
          <div className="od-main">
            {/* Items Card */}
            <div className="card od-card">
              <h3 className="card-title">Order Items</h3>
              <div className="table-responsive">
                <table className="product-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th className="text-right">Unit Price</th>
                      <th className="text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className="od-item-info">
                            <div className="od-item-thumb">
                              {item.image ? <img src={item.image} alt={item.name} /> : <Package size={20} className="text-muted"/>}
                            </div>
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </td>
                        <td>{item.quantity}</td>
                        <td className="text-right">${item.unitPrice.toFixed(2)}</td>
                        <td className="text-right font-medium">${item.subtotal.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="card od-card">
              <h3 className="card-title">Order Timeline</h3>
              <div className="timeline-container">
                {order.timeline.map((event, idx) => (
                  <div key={idx} className={`timeline-step ${event.completed ? 'completed' : 'pending'}`}>
                    <div className="timeline-indicator">
                      {event.completed ? <CheckCircle2 size={18} /> : <div className="dot"></div>}
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-title">{event.step}</div>
                      {event.time && <div className="timeline-time">{formatDate(event.time)}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="od-sidebar">
            {/* Summary Card */}
            <div className="card od-card">
              <h3 className="card-title">Order Summary</h3>
              <div className="summary-list">
                <div className="summary-item">
                  <span className="text-muted">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span className="text-muted">Shipping</span>
                  <span>${order.shipping.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span className="text-muted">Discount</span>
                  <span className="text-success">-${order.discount.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                  <span className="text-muted">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-item summary-total">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="payment-info">
                <div className="info-row">
                  <span className="text-muted">Payment Method:</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>
                <div className="info-row">
                  <span className="text-muted">Payment Status:</span>
                  <StatusBadge status={order.paymentStatus} type={order.paymentStatus === 'Paid' ? 'success' : 'warning'} />
                </div>
              </div>
            </div>

            {/* Customer Card */}
            <div className="card od-card">
              <h3 className="card-title">Customer Information</h3>
              <div className="contact-list">
                <div className="contact-item">
                  <User size={16} className="text-muted" />
                  <div>
                    <div className="font-medium">{order.customer.name}</div>
                    <div className="text-muted text-sm">{order.customer.email}</div>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="text-success" style={{ padding: '0 2px' }}>WA</div>
                  <div className="text-muted text-sm">{order.customer.phone}</div>
                </div>
              </div>
            </div>

            {/* Shipping Card */}
            <div className="card od-card">
              <h3 className="card-title">Shipping Address</h3>
              <div className="contact-item align-top">
                <MapPin size={16} className="text-muted mt-1" />
                <div className="text-muted text-sm" style={{ lineHeight: 1.5 }}>
                  {order.customer.address.street}<br/>
                  {order.customer.address.city}, {order.customer.address.province} {order.customer.address.postalCode}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrderStatusModal 
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        currentStatus={order.status}
        onSave={handleUpdateStatus}
        loading={actionLoading}
      />

      <DeleteConfirmModal 
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleCancelOrder}
        loading={actionLoading}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
