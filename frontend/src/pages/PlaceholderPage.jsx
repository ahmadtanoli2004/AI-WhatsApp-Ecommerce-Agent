import { LayoutDashboard } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PlaceholderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split('/')[1] || 'dashboard';
  const pageTitle = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <div className="fade-in" style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100%', 
      minHeight: '60vh' 
    }}>
      <div className="card" style={{ 
        maxWidth: '500px', 
        width: '100%',
        textAlign: 'center', 
        padding: '4rem 2rem',
        borderStyle: 'dashed',
        backgroundColor: 'var(--bg-main)'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <LayoutDashboard size={32} color="var(--text-muted)" />
        </div>
        
        <h2 style={{ marginBottom: '0.5rem' }}>{pageTitle}</h2>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>
          This section is coming in the next module. 
          The UI prototype currently focuses on the Dashboard.
        </p>
        
        <button className="btn btn-primary" onClick={() => navigate('/dashboard')} style={{ margin: '0 auto' }}>
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
