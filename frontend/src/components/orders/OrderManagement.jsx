import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download } from 'lucide-react';
import { mockApiService } from '../../services/mockApiService';
import OrderSummaryCards from './OrderSummaryCards';
import OrderToolbar from './OrderToolbar';
import OrderTable from './OrderTable';
import Toast from '../ui/Toast';

export default function OrderManagement() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    search: '', status: 'All Statuses', payment: 'All Payments', date: 'All Dates', sort: 'Newest First'
  });
  
  const [toast, setToast] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await mockApiService.getOrders(filters);
      setOrders(data);
    } catch (err) {
      showToast(err.message, 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const resetFilters = () => {
    setFilters({ search: '', status: 'All Statuses', payment: 'All Payments', date: 'All Dates', sort: 'Newest First' });
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleView = (order) => {
    navigate(`/orders/${order.id}`);
  };

  const handleExport = () => {
    showToast('Exporting orders to CSV...');
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1600px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Orders</h2>
          <p className="text-muted">Track, manage, and review customer orders from one place.</p>
        </div>
        <button className="btn btn-outline" onClick={handleExport}>
          <Download size={18} /> Export Orders
        </button>
      </div>

      <OrderSummaryCards orders={orders} />

      <OrderToolbar filters={filters} setFilters={setFilters} onReset={resetFilters} />

      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>Loading orders...</p>
        </div>
      ) : (
        <OrderTable 
          orders={orders} 
          onView={handleView} 
        />
      )}

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}
