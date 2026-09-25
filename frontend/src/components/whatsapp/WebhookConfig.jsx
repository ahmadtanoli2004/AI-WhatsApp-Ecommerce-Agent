import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';

export default function WebhookConfig({ credentials, status, onChange, onSave, onTest, isTesting }) {
  const [showVerify, setShowVerify] = useState(false);

  const handleChange = (key, value) => {
    onChange({ [key]: value });
  };

  return (
    <div className="card fade-in-up wa-section-card" style={{ animationDelay: '0.3s' }}>
      <div className="wa-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="card-title" style={{ margin: 0 }}>Webhook Configuration</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="text-sm text-muted">Status:</span>
          <StatusBadge status={status === 'Connected' ? 'Active' : status} />
        </div>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label>Callback URL</label>
          <input 
            type="text" 
            className="form-control" 
            value={credentials.callbackUrl}
            onChange={(e) => handleChange('callbackUrl', e.target.value)}
            style={{ fontFamily: 'monospace' }}
          />
          <span className="text-muted text-sm mt-1" style={{ display: 'block' }}>URL must be public and support HTTPS.</span>
        </div>

        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label>Verify Token</label>
          <div className="secure-input-wrapper">
            <input 
              type={showVerify ? "text" : "password"} 
              className="form-control" 
              value={credentials.verifyToken}
              onChange={(e) => handleChange('verifyToken', e.target.value)}
            />
            <button className="secure-toggle" onClick={() => setShowVerify(!showVerify)}>
              {showVerify ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            className="btn btn-outline" 
            onClick={onTest}
            disabled={isTesting || !credentials.callbackUrl}
          >
            {isTesting ? 'Testing...' : 'Test Webhook'}
          </button>
          <button className="btn btn-primary" onClick={onSave}>Save Webhook</button>
        </div>
      </div>
    </div>
  );
}
