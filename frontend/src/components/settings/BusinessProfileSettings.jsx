import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function BusinessProfileSettings({ settings, onChange }) {
  if (!settings) return null;
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (key, value) => {
    onChange({ [key]: value });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleChange('logoUrl', file.name); // Mock state representation
    }
  };

  return (
    <div className="card fade-in-up">
      <div className="settings-card-header">
        <h3 className="card-title" style={{ margin: 0 }}>Business Profile</h3>
        <p className="text-muted text-sm mt-1">Manage public-facing business details.</p>
      </div>

      <div className="settings-card-body">
        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label>Business Logo</label>
          <div 
            className={`file-drop-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('logo-upload').click()}
            style={{ cursor: 'pointer' }}
          >
            <input 
              type="file" 
              id="logo-upload" 
              style={{ display: 'none' }} 
              accept="image/*"
              onChange={(e) => {
                if (e.target.files[0]) handleChange('logoUrl', e.target.files[0].name);
              }}
            />
            {settings.logoUrl ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <ImageIcon size={32} className="text-primary-dark" />
                <span className="font-medium text-success">Selected: {settings.logoUrl}</span>
                <span className="text-sm text-muted">Click or drag to replace</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <UploadCloud size={32} className="text-muted" />
                <span className="font-medium">Drag & Drop or <span className="text-primary-dark">Browse</span></span>
                <span className="text-sm text-muted">Supports JPG, PNG (Max 2MB)</span>
              </div>
            )}
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Business Name</label>
            <input 
              type="text" 
              className="form-control" 
              value={settings.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Business Category</label>
            <input 
              type="text" 
              className="form-control" 
              value={settings.category}
              onChange={(e) => handleChange('category', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Business Phone</label>
            <input 
              type="text" 
              className="form-control" 
              value={settings.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Business Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={settings.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Business Address</label>
            <input 
              type="text" 
              className="form-control" 
              value={settings.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Business Description</label>
            <textarea 
              className="form-control" 
              rows="3"
              value={settings.description}
              onChange={(e) => handleChange('description', e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
