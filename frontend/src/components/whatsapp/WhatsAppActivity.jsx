import { ArrowDownLeft, ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function WhatsAppActivity({ activity }) {
  if (!activity || activity.length === 0) return null;

  const getIcon = (type) => {
    switch(type) {
      case 'incoming': return <ArrowDownLeft size={14} className="text-primary-dark" />;
      case 'outgoing': return <ArrowUpRight size={14} className="text-success" />;
      case 'system': return <ShieldCheck size={14} className="text-muted" />;
      default: return <CheckCircle2 size={14} className="text-muted" />;
    }
  };

  const getIconBg = (type) => {
    switch(type) {
      case 'incoming': return 'rgba(37, 211, 102, 0.1)';
      case 'outgoing': return 'rgba(37, 211, 102, 0.2)';
      case 'system': return 'var(--bg-hover)';
      default: return 'var(--bg-hover)';
    }
  };

  return (
    <div className="card fade-in-up wa-section-card" style={{ animationDelay: '0.6s' }}>
      <div className="wa-card-header">
        <h3 className="card-title" style={{ margin: 0 }}>Recent WhatsApp Activity</h3>
      </div>
      
      <div style={{ padding: '1.5rem' }}>
        <div className="wa-activity-list">
          {activity.map((item, idx) => (
            <div key={idx} className="wa-activity-item">
              <div className="wa-activity-icon" style={{ background: getIconBg(item.type) }}>
                {getIcon(item.type)}
              </div>
              <div className="wa-activity-content">
                <div className="wa-activity-title">{item.action}</div>
                <div className="wa-activity-meta">
                  <span>{item.target}</span>
                  <span>•</span>
                  <span>{new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(item.time))}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
