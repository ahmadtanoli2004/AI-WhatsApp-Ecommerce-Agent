import { useState, useEffect } from 'react';
import { AlertCircle, Save, RotateCcw } from 'lucide-react';
import { mockApiService } from '../../services/mockApiService';
import Toast from '../ui/Toast';

import SettingsSidebar from './SettingsSidebar';
import GeneralSettings from './GeneralSettings';
import BusinessProfileSettings from './BusinessProfileSettings';
import AiAgentSettings from './AiAgentSettings';
import WhatsAppSettings from './WhatsAppSettings';
import NotificationSettings from './NotificationSettings';
import SecuritySettings from './SecuritySettings';
import './Settings.css';

export default function SettingsManagement() {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState(null);
  const [originalSettings, setOriginalSettings] = useState(null);
  const [whatsappSummary, setWhatsappSummary] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [settingsData, waData] = await Promise.all([
        mockApiService.getSettings(),
        mockApiService.getWhatsAppConfig()
      ]);
      setSettings(settingsData);
      setOriginalSettings(JSON.parse(JSON.stringify(settingsData)));
      setWhatsappSummary(waData);
    } catch (err) {
      showToast('Failed to load settings', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => setToast({ message, type });

  // Compute dirty state for the currently active section (excluding whatsapp which is read-only here)
  const isDirty = () => {
    if (!settings || !originalSettings) return false;
    if (activeSection === 'whatsapp') return false;
    return JSON.stringify(settings[activeSection]) !== JSON.stringify(originalSettings[activeSection]);
  };

  const handleSectionChange = (sectionId, updates) => {
    setSettings(prev => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], ...updates }
    }));
  };

  const handleSave = async () => {
    if (activeSection === 'whatsapp') return;
    
    setSaving(true);
    try {
      const newSettings = await mockApiService.updateSettings(activeSection, settings[activeSection]);
      setSettings(newSettings);
      setOriginalSettings(JSON.parse(JSON.stringify(newSettings)));
      
      let msg = 'Settings saved successfully';
      if (activeSection === 'businessProfile') msg = 'Business profile saved successfully';
      showToast(msg);
    } catch (err) {
      showToast('Failed to save settings', 'danger');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (activeSection === 'whatsapp') return;
    
    try {
      // Revert the specific section to its original loaded state
      setSettings(prev => ({
        ...prev,
        [activeSection]: JSON.parse(JSON.stringify(originalSettings[activeSection]))
      }));
      showToast('Settings reset to defaults');
    } catch (err) {
      showToast('Failed to reset', 'danger');
    }
  };

  if (loading || !settings) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading settings...</div>;
  }

  const sectionIsDirty = isDirty();

  return (
    <div className="settings-layout fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Settings</h2>
          <p className="text-muted">Manage your business, AI agent, notifications, and application preferences.</p>
        </div>
        
        <div className="settings-header-actions">
          {sectionIsDirty && (
            <div className="unsaved-indicator">
              <AlertCircle size={14} />
              Unsaved changes
            </div>
          )}
          
          <button 
            className="btn btn-outline" 
            onClick={handleReset} 
            disabled={!sectionIsDirty || saving || activeSection === 'whatsapp'}
          >
            <RotateCcw size={16} style={{ marginRight: '6px' }} /> Reset
          </button>
          
          <button 
            className="btn btn-primary" 
            onClick={handleSave} 
            disabled={!sectionIsDirty || saving || activeSection === 'whatsapp'}
          >
            <Save size={16} style={{ marginRight: '6px' }} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="settings-grid-main">
        <SettingsSidebar activeSection={activeSection} onSelect={setActiveSection} />
        
        <div className="settings-content-area">
          {activeSection === 'general' && (
            <GeneralSettings 
              settings={settings.general} 
              onChange={(updates) => handleSectionChange('general', updates)} 
            />
          )}
          {activeSection === 'businessProfile' && (
            <BusinessProfileSettings 
              settings={settings.businessProfile} 
              onChange={(updates) => handleSectionChange('businessProfile', updates)} 
            />
          )}
          {activeSection === 'aiAgent' && (
            <AiAgentSettings 
              settings={settings.aiAgent} 
              onChange={(updates) => handleSectionChange('aiAgent', updates)} 
            />
          )}
          {activeSection === 'whatsapp' && (
            <WhatsAppSettings summary={whatsappSummary} />
          )}
          {activeSection === 'notifications' && (
            <NotificationSettings 
              settings={settings.notifications} 
              onChange={(updates) => handleSectionChange('notifications', updates)} 
            />
          )}
          {activeSection === 'security' && (
            <SecuritySettings 
              settings={settings.security} 
              onChange={(updates) => handleSectionChange('security', updates)} 
            />
          )}
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
