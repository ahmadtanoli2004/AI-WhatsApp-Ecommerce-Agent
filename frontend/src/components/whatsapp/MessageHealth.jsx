export default function MessageHealth({ health, apiStatus, webhookStatus }) {
  if (!health) return null;

  // Convert percentages to numbers for progress bars
  const deliveryVal = parseFloat(health.deliveryRate);
  const responseVal = parseFloat(health.responseSuccess);

  return (
    <div className="card fade-in-up wa-section-card" style={{ animationDelay: '0.5s' }}>
      <div className="wa-card-header">
        <h3 className="card-title" style={{ margin: 0 }}>Message Health</h3>
      </div>
      
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div className="health-stat">
          <div className="health-stat-header">
            <span className="font-medium">Message Delivery</span>
            <span className="font-medium">{health.deliveryRate}</span>
          </div>
          <div className="progress-bg">
            <div className="progress-bar bg-success" style={{ width: health.deliveryRate }}></div>
          </div>
        </div>

        <div className="health-stat">
          <div className="health-stat-header">
            <span className="font-medium">AI Response Success</span>
            <span className="font-medium">{health.responseSuccess}</span>
          </div>
          <div className="progress-bg">
            <div className="progress-bar" style={{ width: health.responseSuccess, background: 'var(--accent-blue)' }}></div>
          </div>
        </div>

        <hr style={{ borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="text-muted">Webhook Health</span>
          <span className={`font-medium ${webhookStatus === 'Connected' ? 'text-success' : 'text-danger'}`}>
            {webhookStatus === 'Connected' ? 'Healthy' : 'Failing'}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="text-muted">API Status</span>
          <span className={`font-medium ${apiStatus === 'Connected' ? 'text-success' : 'text-danger'}`}>
            {apiStatus}
          </span>
        </div>

      </div>
    </div>
  );
}
