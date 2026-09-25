import { Clock } from 'lucide-react';

export default function AiActivity({ activity }) {
  if (!activity || activity.length === 0) return null;

  return (
    <div className="card fade-in-up ai-section-card" style={{ animationDelay: '0.7s' }}>
      <div className="ai-card-header">
        <h3 className="card-title" style={{ margin: 0 }}>Recent Activity</h3>
      </div>
      
      <div style={{ padding: '1.5rem' }}>
        <div className="timeline-container">
          {activity.map((event, idx) => (
            <div key={idx} className="timeline-step completed">
              <div className="timeline-indicator">
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-blue)' }}></div>
              </div>
              <div className="timeline-content" style={{ marginTop: '-4px' }}>
                <div className="timeline-title" style={{ fontSize: '0.875rem' }}>{event.action}</div>
                <div className="timeline-time" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={12} /> {event.time} {/* Using the raw mock string e.g. "2 minutes ago" or parsing ISO */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
