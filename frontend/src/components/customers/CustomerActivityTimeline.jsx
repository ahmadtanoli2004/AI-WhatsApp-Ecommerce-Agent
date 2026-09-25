import { Clock } from 'lucide-react';

export default function CustomerActivityTimeline({ timeline }) {
  const formatDateTime = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(new Date(dateString));
  };

  if (!timeline || timeline.length === 0) {
    return (
      <div className="card od-card">
        <h3 className="card-title">Recent Activity</h3>
        <p className="text-muted text-center" style={{ padding: '2rem 0' }}>No recent activity.</p>
      </div>
    );
  }

  return (
    <div className="card od-card">
      <h3 className="card-title">Recent Activity</h3>
      <div className="timeline-container">
        {timeline.map((event, idx) => (
          <div key={idx} className="timeline-step completed">
            <div className="timeline-indicator">
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-color)' }}></div>
            </div>
            <div className="timeline-content" style={{ marginTop: '-4px' }}>
              <div className="timeline-title" style={{ fontSize: '0.875rem' }}>{event.action}</div>
              <div className="timeline-time" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={12} /> {formatDateTime(event.time)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
