export default function GeneralSettings({ settings, onChange }) {
  if (!settings) return null;

  const handleChange = (key, value) => {
    onChange({ [key]: value });
  };

  return (
    <div className="card fade-in-up">
      <div className="settings-card-header">
        <h3 className="card-title" style={{ margin: 0 }}>General Settings</h3>
        <p className="text-muted text-sm mt-1">Manage global application preferences.</p>
      </div>

      <div className="settings-card-body">
        <div className="form-grid">
          <div className="form-group">
            <label>Application Name</label>
            <input 
              type="text" 
              className="form-control" 
              value={settings.appName}
              onChange={(e) => handleChange('appName', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Default Currency</label>
            <select 
              className="form-control"
              value={settings.currency}
              onChange={(e) => handleChange('currency', e.target.value)}
            >
              <option value="PKR">PKR — Pakistani Rupee</option>
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — British Pound</option>
            </select>
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Application Description</label>
            <input 
              type="text" 
              className="form-control" 
              value={settings.appDescription}
              onChange={(e) => handleChange('appDescription', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Timezone</label>
            <select 
              className="form-control"
              value={settings.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
            >
              <option value="Asia/Karachi">Asia/Karachi</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York</option>
              <option value="Europe/London">Europe/London</option>
            </select>
          </div>

          <div className="form-group">
            <label>Language</label>
            <select 
              className="form-control"
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
            >
              <option value="English">English</option>
              <option value="Urdu">Urdu</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date Format</label>
            <select 
              className="form-control"
              value={settings.dateFormat}
              onChange={(e) => handleChange('dateFormat', e.target.value)}
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div className="form-group">
            <label>Theme</label>
            <select 
              className="form-control"
              value={settings.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
            >
              <option value="System">System Default</option>
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
