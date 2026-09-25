import { AlertTriangle } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, loading }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay fade-in" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="card fade-in-up" style={{ maxWidth: '400px', width: '100%', padding: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{ background: 'var(--danger-bg)', color: 'var(--danger)', padding: '1rem', borderRadius: '50%' }}>
            <AlertTriangle size={32} />
          </div>
        </div>
        
        <h2 style={{ marginBottom: '0.5rem' }}>Delete Product?</h2>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>
          Are you sure you want to remove this product from your catalog? This action cannot be undone.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-outline" onClick={onClose} disabled={loading} style={{ flex: 1 }}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onConfirm} disabled={loading} style={{ flex: 1, backgroundColor: 'var(--danger)' }}>
            {loading ? 'Deleting...' : 'Delete Product'}
          </button>
        </div>
      </div>
    </div>
  );
}
