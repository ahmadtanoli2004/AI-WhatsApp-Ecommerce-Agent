import { useLocation } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import './TopHeader.css';

export default function TopHeader() {
  const location = useLocation();
  const path = location.pathname.split('/')[1] || 'dashboard';
  const pageTitle = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <header className="top-header">
      <div className="header-left">
        <h1 className="page-title">{pageTitle.replace('-', ' ')}</h1>
      </div>
      
      <div className="header-right">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
        
        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-indicator"></span>
        </button>
        
        <div className="divider"></div>
        
        <div className="ai-status">
          <span className="status-dot purple"></span>
          <span className="status-text">AI Active</span>
        </div>
        
        <div className="divider"></div>
        
        <div className="user-profile">
          <div className="avatar">AD</div>
          <div className="user-info">
            <span className="user-name">Admin User</span>
            <span className="user-role">Superadmin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
