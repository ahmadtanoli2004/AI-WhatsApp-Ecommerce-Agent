import { Eye, Edit2, Trash2, Image as ImageIcon, Package } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';
import './ProductTable.css';

export default function ProductTable({ products, onView, onEdit, onDelete }) {
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    }).format(date);
  };

  const getStockBadgeClass = (stock) => {
    if (stock > 10) return 'stock-ok';
    if (stock > 0) return 'stock-low';
    return 'stock-out';
  };

  if (products.length === 0) {
    return (
      <div className="card table-empty-state">
        <div className="empty-icon-wrapper">
          <Package size={32} />
        </div>
        <h3>No products found</h3>
        <p className="text-muted">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="card table-card fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="table-responsive">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="product-row">
                <td className="product-info-cell">
                  <div className="product-thumb">
                    {product.images && product.images[0] ? (
                      <img src={product.images[0]} alt={product.name} />
                    ) : (
                      <ImageIcon size={20} className="text-muted" />
                    )}
                  </div>
                  <div className="product-details">
                    <span className="product-name">{product.name}</span>
                    <span className="product-desc">{product.description.substring(0, 45)}...</span>
                  </div>
                </td>
                <td>{product.category}</td>
                <td className="font-medium">${product.price.toFixed(2)}</td>
                <td>
                  <span className={`stock-indicator ${getStockBadgeClass(product.stock)}`}>
                    {product.stock} in stock
                  </span>
                </td>
                <td>
                  <StatusBadge status={product.status} />
                </td>
                <td className="text-muted text-sm">{formatDate(product.lastUpdated)}</td>
                <td className="actions-cell text-right">
                  <button className="action-btn view-btn" onClick={() => onView(product)} title="View Details">
                    <Eye size={16} />
                  </button>
                  <button className="action-btn edit-btn" onClick={() => onEdit(product)} title="Edit Product">
                    <Edit2 size={16} />
                  </button>
                  <button className="action-btn delete-btn" onClick={() => onDelete(product)} title="Delete Product">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
