export default function AiSettings({ settings, onChange }) {
  if (!settings) return null;

  const toggleSetting = (key) => {
    onChange({ [key]: !settings[key] });
  };

  const settingItems = [
    { key: 'aiEnabled', label: 'AI Agent Enabled', desc: 'Master switch to enable or disable the AI agent.' },
    { key: 'productRecommendations', label: 'Product Recommendations', desc: 'Allow the AI agent to recommend relevant products to customers.' },
    { key: 'orderAssistance', label: 'Order Assistance', desc: 'Allow the AI to look up order status and details.' },
    { key: 'stockChecking', label: 'Stock Checking', desc: 'Allow the AI to answer questions about product availability.' },
    { key: 'priceQuestions', label: 'Price Questions', desc: 'Allow the AI to quote prices to customers.' },
    { key: 'conversationMemory', label: 'Conversation Memory', desc: 'Remember previous messages in the same thread for context.' }
  ];

  return (
    <div className="card fade-in-up ai-section-card" style={{ animationDelay: '0.3s' }}>
      <div className="ai-card-header">
        <h3 className="card-title" style={{ margin: 0 }}>Agent Settings</h3>
      </div>
      
      <div className="ai-settings-list">
        {settingItems.map(item => (
          <div key={item.key} className="ai-setting-item">
            <div className="ai-setting-info">
              <span className="font-medium">{item.label}</span>
              <span className="text-muted text-sm">{item.desc}</span>
            </div>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={settings[item.key]} 
                onChange={() => toggleSetting(item.key)} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
