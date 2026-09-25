import { Settings, Building2, Bot, MessageCircle, Bell, ShieldCheck } from 'lucide-react';

export default function SettingsSidebar({ activeSection, onSelect }) {
  const navItems = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'businessProfile', label: 'Business Profile', icon: Building2 },
    { id: 'aiAgent', label: 'AI Agent', icon: Bot },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: ShieldCheck }
  ];

  return (
    <div className="settings-sidebar">
      <nav className="settings-nav">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`settings-nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => onSelect(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
