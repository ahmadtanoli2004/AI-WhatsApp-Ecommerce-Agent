import { ArrowDown, Globe, MessageCircle, Bot, User } from 'lucide-react';

export default function ConnectionFlow() {
  return (
    <div className="card fade-in-up wa-section-card" style={{ animationDelay: '0.4s' }}>
      <div className="wa-card-header">
        <h3 className="card-title" style={{ margin: 0 }}>Connection Flow</h3>
      </div>
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div className="flow-step">
          <div className="flow-icon"><Globe size={20} /></div>
          <span className="flow-label">Meta Business Account</span>
        </div>
        
        <ArrowDown size={16} className="flow-arrow" />
        
        <div className="flow-step">
          <div className="flow-icon whatsapp"><MessageCircle size={20} /></div>
          <span className="flow-label">WhatsApp Business API</span>
        </div>
        
        <ArrowDown size={16} className="flow-arrow" />
        
        <div className="flow-step">
          <div className="flow-icon commerce">WA</div>
          <span className="flow-label">WA Commerce AI</span>
        </div>
        
        <ArrowDown size={16} className="flow-arrow" />
        
        <div className="flow-step">
          <div className="flow-icon ai"><Bot size={20} /></div>
          <span className="flow-label">AI Agent</span>
        </div>
        
        <ArrowDown size={16} className="flow-arrow" />
        
        <div className="flow-step">
          <div className="flow-icon user"><User size={20} /></div>
          <span className="flow-label">Customer</span>
        </div>

      </div>
    </div>
  );
}
