import { Search, Package, Sparkles, HelpCircle, Box, DollarSign, CheckCircle2 } from 'lucide-react';

const iconMap = {
  'c1': Search,
  'c2': Package,
  'c3': Sparkles,
  'c4': HelpCircle,
  'c5': Box,
  'c6': DollarSign
};

export default function AiCapabilities({ capabilities }) {
  if (!capabilities) return null;

  return (
    <div className="card fade-in-up ai-section-card" style={{ animationDelay: '0.5s' }}>
      <div className="ai-card-header">
        <h3 className="card-title" style={{ margin: 0 }}>AI Capabilities</h3>
      </div>
      
      <div className="ai-capabilities-grid">
        {capabilities.map(cap => {
          const Icon = iconMap[cap.id] || Sparkles;
          return (
            <div key={cap.id} className={`ai-cap-card ${cap.enabled ? 'enabled' : 'disabled'}`}>
              <div className="ai-cap-header">
                <div className="ai-cap-icon"><Icon size={20} /></div>
                {cap.enabled && <CheckCircle2 size={16} className="text-success" />}
              </div>
              <h4 className="ai-cap-title">{cap.title}</h4>
              <p className="ai-cap-desc text-muted text-sm">{cap.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
