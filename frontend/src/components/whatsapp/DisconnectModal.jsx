export default function DisconnectModal({ isOpen, onClose, onConfirm, isDisconnecting }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content fade-in" style={{ maxWidth: '400px' }}>
        <div className="modal-header">
          <h3 className="modal-title text-danger">Disconnect WhatsApp?</h3>
          <button className="close-btn" onClick={onClose} disabled={isDisconnecting}>&times;</button>
        </div>
        
        <div className="modal-body">
          <p>Are you sure you want to disconnect this WhatsApp Business integration?</p>
          <p className="text-muted text-sm mt-2">
            The AI Agent will stop receiving and sending messages immediately. Customers messaging your number will not receive automated responses.
          </p>
        </div>
        
        <div className="modal-footer" style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={onClose} disabled={isDisconnecting}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={isDisconnecting}>
            {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
          </button>
        </div>
      </div>
    </div>
  );
}
