import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  MessageSquare, 
  Bot, 
  MessageCircle, 
  Settings 
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/products', label: 'Products', icon: Package },
  { path: '/orders', label: 'Orders', icon: ShoppingCart },
  { path: '/customers', label: 'Customers', icon: Users },
  { path: '/conversations', label: 'Conversations', icon: MessageSquare },
  { path: '/ai-agent', label: 'AI Agent', icon: Bot },
  { path: '/whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="brand-logo">
          <Bot size={28} className="brand-icon" />
          <div className="brand-text">
            <h2>WA Commerce AI</h2>
            <p>AI E-Commerce Agent</p>
          </div>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} className="nav-icon" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="agent-status-card">
          <div className="agent-info">
            <span className="agent-name">AI Agent</span>
            <span className="agent-state">
              <span className="status-dot green"></span>
              Online
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
