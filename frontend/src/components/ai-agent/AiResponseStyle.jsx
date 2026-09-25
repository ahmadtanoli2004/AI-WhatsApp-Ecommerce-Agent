export default function AiResponseStyle({ styleConfig, onChange }) {
  if (!styleConfig) return null;

  const handleChange = (key, value) => {
    onChange({ [key]: value });
  };

  return (
    <div className="card fade-in-up ai-section-card" style={{ animationDelay: '0.4s' }}>
      <div className="ai-card-header">
        <h3 className="card-title" style={{ margin: 0 }}>Response Style</h3>
      </div>
      
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div className="form-group">
          <label>Tone</label>
          <select 
            className="form-control"
            value={styleConfig.tone}
            onChange={(e) => handleChange('tone', e.target.value)}
          >
            <option>Professional</option>
            <option>Friendly</option>
            <option>Casual</option>
          </select>
        </div>

        <div className="form-group">
          <label>Response Length</label>
          <select 
            className="form-control"
            value={styleConfig.length}
            onChange={(e) => handleChange('length', e.target.value)}
          >
            <option>Concise</option>
            <option>Balanced</option>
            <option>Detailed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Language</label>
          <select 
            className="form-control"
            value={styleConfig.language}
            onChange={(e) => handleChange('language', e.target.value)}
          >
            <option>English</option>
            <option>Urdu</option>
            <option>Roman Urdu</option>
            <option>English + Urdu</option>
          </select>
        </div>
      </div>
    </div>
  );
}
