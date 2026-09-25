import StatusBadge from '../ui/StatusBadge';

export default function AiAgentSettings({ settings, onChange }) {
  if (!settings) return null;

  const handleChange = (key, value) => {
    onChange({ [key]: value });
  };

  return (
    <div className="card fade-in-up">
      <div className="settings-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 className="card-title" style={{ margin: 0 }}>AI Agent Settings</h3>
          <p className="text-muted text-sm mt-1">Configure global agent behavior and capabilities.</p>
        </div>
        <StatusBadge status={settings.enabled ? 'Active' : 'Disabled'} />
      </div>

      <div className="settings-card-body">
        <div className="ai-setting-row" style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <div className="ai-setting-info">
            <div className="ai-setting-title">AI Agent Enabled</div>
            <div className="ai-setting-desc">Toggle the main switch for all AI automated responses.</div>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={settings.enabled} onChange={(e) => handleChange('enabled', e.target.checked)} />
            <span className="slider"></span>
          </label>
        </div>

        <div className="form-grid" style={{ marginBottom: '2rem' }}>
          <div className="form-group">
            <label>Default Model</label>
            <select className="form-control" value={settings.defaultModel} onChange={(e) => handleChange('defaultModel', e.target.value)}>
              <option value="Gemini">Google Gemini Pro</option>
              <option value="GPT-4">OpenAI GPT-4</option>
            </select>
          </div>
          <div className="form-group">
            <label>Response Language</label>
            <select className="form-control" value={settings.responseLanguage} onChange={(e) => handleChange('responseLanguage', e.target.value)}>
              <option value="English">English</option>
              <option value="Urdu">Urdu</option>
              <option value="Roman Urdu">Roman Urdu</option>
            </select>
          </div>
          <div className="form-group">
            <label>Response Tone</label>
            <select className="form-control" value={settings.responseTone} onChange={(e) => handleChange('responseTone', e.target.value)}>
              <option value="Professional">Professional</option>
              <option value="Friendly">Friendly</option>
              <option value="Concise">Concise</option>
              <option value="Helpful">Helpful</option>
            </select>
          </div>
          <div className="form-group">
            <label>Response Length</label>
            <select className="form-control" value={settings.responseLength} onChange={(e) => handleChange('responseLength', e.target.value)}>
              <option value="Short">Short</option>
              <option value="Balanced">Balanced</option>
              <option value="Detailed">Detailed</option>
            </select>
          </div>
        </div>

        <h4 style={{ marginBottom: '1rem' }}>Capabilities</h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="ai-setting-row">
            <div className="ai-setting-info">
              <div className="ai-setting-title">Conversation Memory</div>
              <div className="ai-setting-desc">Remember context from previous interactions.</div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={settings.conversationMemory} onChange={(e) => handleChange('conversationMemory', e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="ai-setting-row">
            <div className="ai-setting-info">
              <div className="ai-setting-title">Product Recommendations</div>
              <div className="ai-setting-desc">Suggest relevant products based on user queries.</div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={settings.productRecommendations} onChange={(e) => handleChange('productRecommendations', e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="ai-setting-row">
            <div className="ai-setting-info">
              <div className="ai-setting-title">Order Assistance</div>
              <div className="ai-setting-desc">Help customers check order status and history.</div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={settings.orderAssistance} onChange={(e) => handleChange('orderAssistance', e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="ai-setting-row">
            <div className="ai-setting-info">
              <div className="ai-setting-title">Stock Checking</div>
              <div className="ai-setting-desc">Allow AI to verify inventory levels before responding.</div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={settings.stockChecking} onChange={(e) => handleChange('stockChecking', e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <h4 style={{ margin: '2.5rem 0 1rem 0' }}>Customer Bargaining</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div className="ai-setting-row">
            <div className="ai-setting-info">
              <div className="ai-setting-title">Smart Price Negotiation</div>
              <div className="ai-setting-desc">Handles customer price offers while respecting configured product-level pricing limits.</div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={settings.customerBargaining} onChange={(e) => handleChange('customerBargaining', e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>
          
          <div className={`form-grid ${!settings.customerBargaining ? 'opacity-50' : ''}`} style={{ pointerEvents: settings.customerBargaining ? 'auto' : 'none' }}>
            <div className="form-group">
              <label>Global Maximum Discount (%)</label>
              <input type="number" min="0" max="100" className="form-control" value={settings.maxDiscount} onChange={(e) => handleChange('maxDiscount', Number(e.target.value))} />
            </div>
            <div className="form-group">
              <label>Global Max Negotiation Attempts</label>
              <input type="number" min="1" className="form-control" value={settings.maxNegotiationAttempts} onChange={(e) => handleChange('maxNegotiationAttempts', Number(e.target.value))} />
            </div>
          </div>
          
          <div className="ai-setting-row" style={{ marginTop: '0.5rem' }}>
            <div className="ai-setting-info">
              <div className="ai-setting-title">Enforce Minimum Selling Price</div>
              <div className="ai-setting-desc">The AI can negotiate within limits, but it must never offer below the minimum selling price.</div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={settings.enforceMinimumSellingPrice} onChange={(e) => handleChange('enforceMinimumSellingPrice', e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <h4 style={{ margin: '2.5rem 0 1rem 0' }}>Voice Support <span className="badge badge-info" style={{ marginLeft: '8px' }}>Mock / Integration Ready</span></h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="ai-setting-row">
            <div className="ai-setting-info">
              <div className="ai-setting-title">Voice Messages</div>
              <div className="ai-setting-desc">Receive and process customer voice messages.</div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={settings.voiceSupport} onChange={(e) => handleChange('voiceSupport', e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="ai-setting-row">
            <div className="ai-setting-info">
              <div className="ai-setting-title">Speech-to-Text</div>
              <div className="ai-setting-desc">Convert customer voice messages into text for AI processing.</div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={settings.speechToText} onChange={(e) => handleChange('speechToText', e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="ai-setting-row">
            <div className="ai-setting-info">
              <div className="ai-setting-title">Voice Responses</div>
              <div className="ai-setting-desc">Generate voice responses for supported conversations.</div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={settings.voiceResponses} onChange={(e) => handleChange('voiceResponses', e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

      </div>
    </div>
  );
}
