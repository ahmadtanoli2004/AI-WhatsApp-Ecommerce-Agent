import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { mockApiService } from '../../services/mockApiService';
import CustomerSummaryCards from './CustomerSummaryCards';
import CustomerToolbar from './CustomerToolbar';
import CustomerTable from './CustomerTable';
import Toast from '../ui/Toast';

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const [filters, setFilters] = useState({
    search: '', status: 'All Customers', orders: 'All Orders', sort: 'Recently Active'
  });

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await mockApiService.getCustomers(filters);
      setCustomers(data);
    } catch (err) {
      setToast({ message: err.message, type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [filters]);

  const resetFilters = () => {
    setFilters({ search: '', status: 'All Customers', orders: 'All Orders', sort: 'Recently Active' });
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Customers</h2>
          <p className="text-muted">Manage customer profiles, order history, and customer activity.</p>
        </div>
        <button className="btn btn-outline" onClick={() => setToast({ message: 'Exporting customers...', type: 'success' })}>
          <Download size={18} /> Export Customers
        </button>
      </div>

      <CustomerSummaryCards customers={customers} />

      <CustomerToolbar filters={filters} setFilters={setFilters} onReset={resetFilters} />

      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>Loading customers...</p>
        </div>
      ) : (
        <CustomerTable customers={customers} />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
