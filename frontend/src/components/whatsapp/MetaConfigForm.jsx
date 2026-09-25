import { useState } from 'react';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function MetaConfigForm({ credentials, onChange, onSave, onReset, isDirty }) {
  const [showAccess, setShowAccess] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const handleChange = (key, value) => {
    onChange({ [key]: value });
  };

  return (
    <div className="card fade-in-up wa-section-card" style={{ animationDelay: '0.2s' }}>
      <div className="wa-card-header">
        <div>
          <h3 className="card-title" style={{ margin: 0, marginBottom: '0.25rem' }}>Meta WhatsApp Configuration</h3>
          <p className="text-muted text-sm" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} className="text-success" /> 
            Credentials are securely stored and are never displayed in full.
          </p>
        </div>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <div className="wa-form-grid">
          <div className="form-group">
            <label>Access Token</label>
            <div className="secure-input-wrapper">
              <input 
                type={showAccess ? "text" : "password"} 
                className="form-control" 
                value={credentials.accessToken}
                onChange={(e) => handleChange('accessToken', e.target.value)}
              />
              <button className="secure-toggle" onClick={() => setShowAccess(!showAccess)}>
                {showAccess ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>App Secret</label>
            <div className="secure-input-wrapper">
              <input 
                type={showSecret ? "text" : "password"} 
                className="form-control" 
                value={credentials.appSecret}
                onChange={(e) => handleChange('appSecret', e.target.value)}
              />
              <button className="secure-toggle" onClick={() => setShowSecret(!showSecret)}>
                {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number ID</label>
            <input 
              type="text" 
              className="form-control" 
              value={credentials.phoneNumberId}
              onChange={(e) => handleChange('phoneNumberId', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>WhatsApp Business ID</label>
            <input 
              type="text" 
              className="form-control" 
              value={credentials.businessId}
              onChange={(e) => handleChange('businessId', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Meta App ID</label>
            <input 
              type="text" 
              className="form-control" 
              value={credentials.appId}
              onChange={(e) => handleChange('appId', e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
          <button className="btn btn-outline" onClick={onReset} disabled={!isDirty}>
            Reset
          </button>
          <button className="btn btn-primary" onClick={onSave} disabled={!isDirty}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
