export default function NotificationSettings({ settings, onChange }) {
  if (!settings) return null;

  const handleChange = (key, value) => {
    onChange({ [key]: value });
  };

  const notificationOptions = [
    { id: 'newOrder', label: 'New Order Notifications', desc: 'Receive an alert whenever a new order is placed.' },
    { id: 'orderStatus', label: 'Order Status Updates', desc: 'Alerts when order fulfillment status changes.' },
    { id: 'newCustomerMsg', label: 'New Customer Messages', desc: 'Alerts for incoming manual messages needing human review.' },
    { id: 'aiEscalation', label: 'AI Escalation Alerts', desc: 'Alerts when the AI agent cannot answer and hands over to a human.' },
    { id: 'lowStock', label: 'Low Stock Alerts', desc: 'Receive notifications when a product falls below the minimum threshold.' },
    { id: 'failedMessage', label: 'Failed Message Alerts', desc: 'Alerts if a WhatsApp message fails to deliver.' }
  ];

  const reportOptions = [
    { id: 'dailySummary', label: 'Daily Summary', desc: 'A daily email report of sales and AI performance.' },
    { id: 'weeklySummary', label: 'Weekly Summary', desc: 'A comprehensive weekly report covering all major KPIs.' }
  ];

  return (
    <div className="card fade-in-up">
      <div className="settings-card-header">
        <h3 className="card-title" style={{ margin: 0 }}>Notification Settings</h3>
        <p className="text-muted text-sm mt-1">Manage system alerts and automated reporting.</p>
      </div>

      <div className="settings-card-body">
        
        <h4 style={{ marginBottom: '1.5rem' }}>System Alerts</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {notificationOptions.map(opt => (
            <div key={opt.id} className="ai-setting-row">
              <div className="ai-setting-info">
                <div className="ai-setting-title">{opt.label}</div>
                <div className="ai-setting-desc">{opt.desc}</div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings[opt.id]} 
                  onChange={(e) => handleChange(opt.id, e.target.checked)} 
                />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>

        <h4 style={{ marginBottom: '1.5rem' }}>Automated Reports</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {reportOptions.map(opt => (
            <div key={opt.id} className="ai-setting-row">
              <div className="ai-setting-info">
                <div className="ai-setting-title">{opt.label}</div>
                <div className="ai-setting-desc">{opt.desc}</div>
              </div>
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={settings[opt.id]} 
                  onChange={(e) => handleChange(opt.id, e.target.checked)} 
                />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
