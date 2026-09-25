import { Search, RotateCcw } from 'lucide-react';

export default function OrderToolbar({ filters, setFilters, onReset }) {
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="product-toolbar card fade-in-up" style={{ animationDelay: '0.1s' }}>
      <div className="toolbar-search">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search by order ID or customer..." 
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
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

        <select 
          className="form-control filter-select"
          value={filters.payment}
          onChange={(e) => handleChange('payment', e.target.value)}
        >
          <option>All Payments</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Failed</option>
          <option>Refunded</option>
        </select>

        <select 
          className="form-control filter-select"
          value={filters.sort}
          onChange={(e) => handleChange('sort', e.target.value)}
        >
          <option>Newest First</option>
          <option>Oldest First</option>
          <option>Highest Amount</option>
          <option>Lowest Amount</option>
        </select>

        <button className="btn btn-outline reset-btn" onClick={onReset} title="Reset Filters">
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
