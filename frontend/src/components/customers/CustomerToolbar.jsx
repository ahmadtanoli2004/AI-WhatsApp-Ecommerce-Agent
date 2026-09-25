import { Search, RotateCcw } from 'lucide-react';

export default function CustomerToolbar({ filters, setFilters, onReset }) {
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="product-toolbar card fade-in-up" style={{ animationDelay: '0.1s' }}>
      <div className="toolbar-search">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search by name, phone, or email..." 
          className="search-input"
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
        />
      </div>

      <div className="toolbar-filters">
        <select 
          className="form-control filter-select"
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
        >
          <option>All Customers</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <select 
          className="form-control filter-select"
          value={filters.orders}
          onChange={(e) => handleChange('orders', e.target.value)}
        >
          <option>All Orders</option>
          <option>No Orders</option>
          <option>1-5 Orders</option>
          <option>6+ Orders</option>
        </select>

        <select 
          className="form-control filter-select"
          value={filters.sort}
          onChange={(e) => handleChange('sort', e.target.value)}
        >
          <option>Recently Active</option>
          <option>Highest Spend</option>
          <option>Most Orders</option>
          <option>Newest</option>
        </select>

        <button className="btn btn-outline reset-btn" onClick={onReset} title="Reset Filters">
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
