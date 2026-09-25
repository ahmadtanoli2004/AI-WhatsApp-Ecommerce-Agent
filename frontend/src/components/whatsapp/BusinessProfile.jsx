export default function BusinessProfile({ info }) {
  if (!info) return null;

  return (
    <div className="card fade-in-up wa-section-card" style={{ animationDelay: '0.7s' }}>
      <div className="wa-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="card-title" style={{ margin: 0 }}>Business Profile</h3>
        <button className="btn btn-outline btn-sm">Edit Profile</button>
      </div>
      
      <div style={{ padding: '1.5rem' }}>
        <div className="wa-info-grid single-col">
          <div className="wa-info-item">
            <div className="wa-info-content">
              <span className="wa-info-label">Business Name</span>
              <span className="wa-info-val font-medium">{info.name}</span>
            </div>
          </div>
          <div className="wa-info-item">
            <div className="wa-info-content">
              <span className="wa-info-label">Category</span>
              <span className="wa-info-val">{info.category}</span>
            </div>
          </div>
          <div className="wa-info-item">
            <div className="wa-info-content">
              <span className="wa-info-label">Business Phone</span>
              <span className="wa-info-val">{info.phone}</span>
            </div>
          </div>
          <div className="wa-info-item">
            <div className="wa-info-content">
              <span className="wa-info-label">Business Email</span>
              <span className="wa-info-val">{info.email}</span>
            </div>
          </div>
          <div className="wa-info-item" style={{ gridColumn: '1 / -1' }}>
            <div className="wa-info-content">
              <span className="wa-info-label">Description</span>
              <span className="wa-info-val text-sm">{info.description}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
