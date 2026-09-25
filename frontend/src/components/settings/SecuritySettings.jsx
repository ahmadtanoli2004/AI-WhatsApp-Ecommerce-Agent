import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Key } from 'lucide-react';

export default function SecuritySettings({ settings, onChange }) {
  const navigate = useNavigate();

  if (!settings) return null;

  const handleChange = (key, value) => {
    onChange({ [key]: value });
  };

  return (
    <div className="card fade-in-up">
      <div className="settings-card-header">
        <h3 className="card-title" style={{ margin: 0 }}>Security Settings</h3>
        <p className="text-muted text-sm mt-1">Manage authentication preferences and credential visibility.</p>
      </div>

      <div className="settings-card-body">
        
        <div className="info-alert" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '2rem', background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)', color: '#92400e' }}>
          <ShieldAlert size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <span className="font-medium" style={{ display: 'block', marginBottom: '0.25rem' }}>Security Notice</span>
            <span className="text-sm">Sensitive credentials are displayed in masked form. Connect your production security system before using real credentials. This frontend interface is designed for preview purposes.</span>
          </div>
        </div>

        <div className="form-grid" style={{ marginBottom: '2rem' }}>
          <div className="form-group">
            <label>Session Timeout</label>
            <select 
              className="form-control"
              value={settings.sessionTimeout}
              onChange={(e) => handleChange('sessionTimeout', e.target.value)}
            >
              <option value="15 minutes">15 minutes</option>
              <option value="30 minutes">30 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="4 hours">4 hours</option>
            </select>
          </div>

          <div className="form-group">
            <label>API Credential Visibility</label>
            <select 
              className="form-control"
              value={settings.credentialVisibility}
              onChange={(e) => handleChange('credentialVisibility', e.target.value)}
            >
              <option value="Protected">Protected (Masked by default)</option>
              <option value="Always Show">Always Show</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div className="ai-setting-row">
            <div className="ai-setting-info">
              <div className="ai-setting-title">Two-Factor Authentication (2FA)</div>
              <div className="ai-setting-desc">Require an additional code when logging in. (Mock UI)</div>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={settings.twoFactorAuth} 
                onChange={(e) => handleChange('twoFactorAuth', e.target.checked)} 
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="ai-setting-row">
            <div className="ai-setting-info">
              <div className="ai-setting-title">Login Notifications</div>
              <div className="ai-setting-desc">Receive an email when a login occurs from a new device.</div>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={settings.loginNotifications} 
                onChange={(e) => handleChange('loginNotifications', e.target.checked)} 
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <hr style={{ borderTop: '1px solid var(--border-color)', margin: '2rem 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ margin: '0 0 0.25rem 0' }}>Manage WhatsApp Credentials</h4>
            <p className="text-sm text-muted" style={{ margin: 0 }}>View or rotate Meta API keys securely.</p>
          </div>
          <button className="btn btn-outline" onClick={() => navigate('/whatsapp')}>
            <Key size={14} style={{ marginRight: '6px' }} /> Go to WhatsApp
          </button>
        </div>

      </div>
    </div>
  );
}
