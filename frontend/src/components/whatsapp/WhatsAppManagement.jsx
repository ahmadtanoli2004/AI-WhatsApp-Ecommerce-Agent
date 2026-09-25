import { useState, useEffect } from 'react';
import { Power, PowerOff } from 'lucide-react';
import { mockApiService } from '../../services/mockApiService';
import Toast from '../ui/Toast';
import StatusBadge from '../ui/StatusBadge';

import WhatsAppConnection from './WhatsAppConnection';
import WhatsAppStats from './WhatsAppStats';
import MetaConfigForm from './MetaConfigForm';
import WebhookConfig from './WebhookConfig';
import ConnectionFlow from './ConnectionFlow';
import MessageHealth from './MessageHealth';
import WhatsAppActivity from './WhatsAppActivity';
import BusinessProfile from './BusinessProfile';
import DisconnectModal from './DisconnectModal';
import './WhatsApp.css';

export default function WhatsAppManagement() {
  const [config, setConfig] = useState(null);
  const [originalConfig, setOriginalConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Interaction states
  const [isTestingConn, setIsTestingConn] = useState(false);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const data = await mockApiService.getWhatsAppConfig();
      setConfig(data);
      setOriginalConfig(JSON.parse(JSON.stringify(data)));
    } catch (err) {
      showToast('Failed to load WhatsApp configuration', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => setToast({ message, type });

  const handleSaveMeta = async () => {
    try {
      const newConfig = await mockApiService.updateWhatsAppConfig({ credentials: config.credentials });
      setConfig(newConfig);
      setOriginalConfig(JSON.parse(JSON.stringify(newConfig)));
      showToast('WhatsApp configuration saved successfully');
    } catch (err) {
      showToast('Failed to save configuration', 'danger');
    }
  };

  const handleSaveWebhook = async () => {
    try {
      const newConfig = await mockApiService.updateWhatsAppConfig({ credentials: config.credentials });
      setConfig(newConfig);
      setOriginalConfig(JSON.parse(JSON.stringify(newConfig)));
      showToast('Webhook configuration saved successfully');
    } catch (err) {
      showToast('Failed to save webhook', 'danger');
    }
  };

  const handleTestConnection = async () => {
    setIsTestingConn(true);
    try {
      const res = await mockApiService.testWhatsAppConnection();
      showToast(res.message);
    } catch (err) {
      showToast(err.message || 'Connection test failed', 'danger');
    } finally {
      setIsTestingConn(false);
    }
  };

  const handleTestWebhook = async () => {
    setIsTestingWebhook(true);
    try {
      const res = await mockApiService.testWebhook();
      showToast(res.message);
    } catch (err) {
      showToast('Webhook test failed', 'danger');
    } finally {
      setIsTestingWebhook(false);
    }
  };

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    try {
      const newConfig = await mockApiService.disconnectWhatsApp();
      setConfig(newConfig);
      setOriginalConfig(JSON.parse(JSON.stringify(newConfig)));
      setShowDisconnectModal(false);
      showToast('WhatsApp integration disconnected', 'danger');
    } catch (err) {
      showToast('Failed to disconnect', 'danger');
    } finally {
      setIsDisconnecting(false);
    }
  };

  const handleReconnect = async () => {
    setIsReconnecting(true);
    try {
      const newConfig = await mockApiService.reconnectWhatsApp();
      setConfig(newConfig);
      setOriginalConfig(JSON.parse(JSON.stringify(newConfig)));
      showToast('WhatsApp reconnected successfully', 'success');
    } catch (err) {
      showToast('Failed to reconnect', 'danger');
    } finally {
      setIsReconnecting(false);
    }
  };

  if (loading || !config) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading WhatsApp configuration...</div>;
  }

  // Dirty check for meta config
  const isMetaDirty = JSON.stringify(config.credentials) !== JSON.stringify(originalConfig.credentials);

  return (
    <div className="wa-layout fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>WhatsApp Business</h2>
          <p className="text-muted">Connect and manage your WhatsApp Business messaging integration.</p>
        </div>
        
        <div className="wa-header-actions">
          <StatusBadge status={config.status === 'Connected' ? 'Active' : config.status} />
          
          {config.status === 'Connected' ? (
            <button className="btn btn-outline text-danger" style={{ borderColor: 'var(--danger)' }} onClick={() => setShowDisconnectModal(true)}>
              <PowerOff size={16} /> Disconnect
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleReconnect} disabled={isReconnecting}>
              <Power size={16} /> {isReconnecting ? 'Reconnecting...' : 'Reconnect'}
            </button>
          )}
        </div>
      </div>

      <WhatsAppConnection 
        config={config} 
        onTest={handleTestConnection}
        isTesting={isTestingConn}
      />

      <WhatsAppStats stats={config.stats} />

      <div className="wa-grid-main">
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <MetaConfigForm 
            credentials={config.credentials}
            onChange={(updates) => setConfig(prev => ({ ...prev, credentials: { ...prev.credentials, ...updates } }))}
            onSave={handleSaveMeta}
            onReset={() => setConfig(prev => ({ ...prev, credentials: originalConfig.credentials }))}
            isDirty={isMetaDirty}
          />
          
          <WebhookConfig 
            credentials={config.credentials}
            status={config.webhookStatus}
            onChange={(updates) => setConfig(prev => ({ ...prev, credentials: { ...prev.credentials, ...updates } }))}
            onSave={handleSaveWebhook}
            onTest={handleTestWebhook}
            isTesting={isTestingWebhook}
          />

          <WhatsAppActivity activity={config.activity} />
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <MessageHealth 
            health={config.health}
            apiStatus={config.status}
            webhookStatus={config.webhookStatus}
          />

          <ConnectionFlow />

          <BusinessProfile info={config.businessInfo} />
        </div>
      </div>

      <DisconnectModal 
        isOpen={showDisconnectModal}
        onClose={() => setShowDisconnectModal(false)}
        onConfirm={handleDisconnect}
        isDisconnecting={isDisconnecting}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
