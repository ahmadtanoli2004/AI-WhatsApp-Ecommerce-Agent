import { Bot, Sparkles, Languages, Cpu } from 'lucide-react';

export default function AiOverview({ config }) {
  if (!config) return null;
  
  return (
    <div className="card fade-in-up" style={{ padding: '1.5rem', animationDelay: '0.1s' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ 
          width: '64px', height: '64px', borderRadius: '16px', 
          background: 'rgba(79, 70, 229, 0.1)', color: 'var(--accent-blue)',
          display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
          <Bot size={32} />
        </div>
        
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>WA Commerce AI Assistant</h3>
          <p className="text-muted" style={{ margin: '0 0 1rem 0', maxWidth: '600px' }}>
            Your AI agent helps customers discover products, answer questions, and assist with orders securely and autonomously.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Cpu size={16} className="text-muted"/>
              <span className="text-sm"><span className="text-muted">Model:</span> <span className="font-medium">{config.model}</span></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={16} className="text-muted"/>
              <span className="text-sm"><span className="text-muted">Mode:</span> <span className="font-medium">{config.mode}</span></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Languages size={16} className="text-muted"/>
              <span className="text-sm"><span className="text-muted">Languages:</span> <span className="font-medium">{config.responseStyle.language}</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
