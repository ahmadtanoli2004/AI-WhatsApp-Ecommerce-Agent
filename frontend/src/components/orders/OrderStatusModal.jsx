import { useState } from 'react';
import { X } from 'lucide-react';

export default function OrderStatusModal({ isOpen, onClose, currentStatus, onSave, loading }) {
  const [status, setStatus] = useState(currentStatus || 'Pending');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(status);
  };

  return (
    <div className="modal-overlay fade-in" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="card fade-in-up" style={{ maxWidth: '400px', width: '100%', padding: '0' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0 }}>Update Order Status</h3>
          <button className="toast-close" onClick={onClose}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label>Status</label>
            <select 
              className="form-control" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-outline" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Update Status'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
