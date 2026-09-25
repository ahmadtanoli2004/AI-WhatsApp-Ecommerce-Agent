import { Search, RotateCcw } from 'lucide-react';
import './ProductToolbar.css';

export default function ProductToolbar({ filters, setFilters, onReset }) {
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="product-toolbar card fade-in-up" style={{ animationDelay: '0.1s' }}>
      <div className="toolbar-search">
        <Search size={18} className="search-icon" />
        <input 
          type="text" 
          placeholder="Search by product name or description..." 
          className="search-input"
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
        />
      </div>

      <div className="toolbar-filters">
        <select 
          className="form-control filter-select"
          value={filters.category}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Wearables</option>
          <option>Furniture</option>
          <option>Beauty</option>
        </select>

        <select 
          className="form-control filter-select"
          value={filters.stock}
          onChange={(e) => handleChange('stock', e.target.value)}
        >
          <option>All Stock</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>

        <select 
          className="form-control filter-select"
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Draft</option>
          <option>Inactive</option>
        </select>

        <select 
          className="form-control filter-select"
          value={filters.sort}
          onChange={(e) => handleChange('sort', e.target.value)}
        >
          <option>Recently Updated</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>

        <button className="btn btn-outline reset-btn" onClick={onReset} title="Reset Filters">
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
