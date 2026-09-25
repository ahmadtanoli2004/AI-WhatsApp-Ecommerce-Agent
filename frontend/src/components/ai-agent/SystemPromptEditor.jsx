export default function SystemPromptEditor({ prompt, onChange, onSave, onReset, isDirty }) {
  return (
    <div className="card fade-in-up ai-section-card" style={{ animationDelay: '0.2s' }}>
      <div className="ai-card-header">
        <div>
          <h3 className="card-title" style={{ margin: 0, marginBottom: '0.25rem' }}>System Prompt</h3>
          <p className="text-muted text-sm" style={{ margin: 0 }}>Define the behavior, tone, and responsibilities of your AI agent.</p>
        </div>
      </div>
      
      <div style={{ padding: '1.5rem', paddingTop: 0 }}>
        <textarea 
          className="form-control ai-prompt-textarea"
          value={prompt}
          onChange={(e) => onChange(e.target.value)}
          spellCheck="false"
        ></textarea>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
          <button className="btn btn-outline" onClick={onReset} disabled={!isDirty}>
            Reset
          </button>
          <button className="btn btn-primary" onClick={onSave} disabled={!isDirty}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
