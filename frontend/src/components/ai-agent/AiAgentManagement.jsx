import { useState, useEffect } from 'react';
import { Bot } from 'lucide-react';
import { mockApiService } from '../../services/mockApiService';
import Toast from '../ui/Toast';

import AiOverview from './AiOverview';
import AiPerformanceCards from './AiPerformanceCards';
import SystemPromptEditor from './SystemPromptEditor';
import AiSettings from './AiSettings';
import AiResponseStyle from './AiResponseStyle';
import AiCapabilities from './AiCapabilities';
import AiTestConsole from './AiTestConsole';
import AiActivity from './AiActivity';
import './AiAgent.css';

export default function AiAgentManagement() {
  const [config, setConfig] = useState(null);
  const [originalConfig, setOriginalConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const data = await mockApiService.getAiAgentConfig();
      setConfig(data);
      setOriginalConfig(JSON.parse(JSON.stringify(data)));
    } catch (err) {
      showToast('Failed to load AI configuration', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => setToast({ message, type });

  const handleSave = async (updates) => {
    try {
      const newConfig = await mockApiService.updateAiAgentConfig(updates);
      setConfig(newConfig);
      setOriginalConfig(JSON.parse(JSON.stringify(newConfig)));
      showToast('AI agent settings saved successfully');
    } catch (err) {
      showToast('Failed to save settings', 'danger');
    }
  };

  const handleReset = async () => {
    try {
      const newConfig = await mockApiService.resetAiAgentConfig();
      setConfig(newConfig);
      setOriginalConfig(JSON.parse(JSON.stringify(newConfig)));
      showToast('AI configuration reset to default');
    } catch (err) {
      showToast('Failed to reset settings', 'danger');
    }
  };

  if (loading || !config) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading AI configuration...</div>;
  }

  // Check if prompt is dirty
  const isPromptDirty = config.systemPrompt !== originalConfig.systemPrompt;

  return (
    <div className="ai-agent-layout fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>AI Agent</h2>
          <p className="text-muted">Configure your AI shopping assistant, behavior, and customer support capabilities.</p>
        </div>
        
        <div className="ai-header-actions">
          <div className="ai-status-indicator">
            <div className="ai-status-dot"></div> Active
          </div>
          <button className="btn btn-outline" onClick={() => {
            document.querySelector('.ai-test-layout')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}>
            <Bot size={18} /> Test Agent
          </button>
        </div>
      </div>

      <AiOverview config={config} />
      <AiPerformanceCards performance={config.performance} />

      <div className="ai-grid-main">
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <SystemPromptEditor 
            prompt={config.systemPrompt}
            onChange={(val) => setConfig({ ...config, systemPrompt: val })}
            onSave={() => handleSave({ systemPrompt: config.systemPrompt })}
            onReset={() => setConfig({ ...config, systemPrompt: originalConfig.systemPrompt })}
            isDirty={isPromptDirty}
          />
          
          <AiCapabilities capabilities={config.capabilities} />
          
          <AiTestConsole suggestedPrompts={config.suggestedPrompts} />
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <AiSettings 
            settings={config.settings}
            onChange={(newSettings) => handleSave({ settings: newSettings })}
          />
          
          <AiResponseStyle 
            styleConfig={config.responseStyle}
            onChange={(newStyle) => handleSave({ responseStyle: newStyle })}
          />
          
          <AiActivity activity={config.activity} />
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
