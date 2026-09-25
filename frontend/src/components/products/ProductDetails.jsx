import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Package, Tag, DollarSign, Clock, PlayCircle } from 'lucide-react';
import { mockApiService } from '../../services/mockApiService';
import StatusBadge from '../ui/StatusBadge';
import DeleteConfirmModal from './DeleteConfirmModal';
import Toast from '../ui/Toast';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await mockApiService.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const confirmDelete = async () => {
    setActionLoading(true);
    try {
      await mockApiService.deleteProduct(id);
      setToast({ message: 'Product deleted successfully', type: 'success' });
      setIsDeleteOpen(false);
      setTimeout(() => navigate('/products'), 2000);
    } catch (err) {
      setToast({ message: err.message, type: 'danger' });
      setActionLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading product details...</div>;
  }

  if (error || !product) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--danger)' }}>{error || 'Product not found'}</h3>
        <Link to="/products" className="btn btn-outline mt-4">Back to Products</Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(new Date(dateString));
  };

  return (
    <div className="product-details-page fade-in">
      <div className="pd-header">
        <button className="btn btn-outline" onClick={() => navigate('/products')}>
          <ArrowLeft size={16} /> Back to Products
        </button>
        <div className="pd-actions">
          <button className="btn btn-outline">
            <Edit2 size={16} /> Edit Product
          </button>
          <button className="btn btn-primary" style={{ backgroundColor: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => setIsDeleteOpen(true)}>
            <Trash2 size={16} /> Delete Product
          </button>
        </div>
      </div>

      <div className="pd-grid">
        <div className="pd-gallery card">
          <div className="pd-main-image">
            {product.images && product.images[0] ? (
              <img src={product.images[0]} alt={product.name} />
            ) : (
              <div className="pd-no-image">No Image Available</div>
            )}
          </div>
        </div>

        <div className="pd-info card">
          <div className="pd-info-header">
            <StatusBadge status={product.status} />
            <span className="pd-id">ID: {product.id}</span>
          </div>
          
          <h1 className="pd-title">{product.name}</h1>
          <p className="pd-description">{product.description}</p>
          
          <div className="pd-price-block">
            <span className="pd-price">${product.price.toFixed(2)}</span>
            <span className="pd-currency">{product.currency}</span>
          </div>

          <div className="pd-meta-grid">
            <div className="pd-meta-item">
              <Tag size={18} className="text-muted" />
              <div>
                <span className="pd-meta-label">Category</span>
                <span className="pd-meta-value">{product.category}</span>
              </div>
            </div>
            
            <div className="pd-meta-item">
              <Package size={18} className="text-muted" />
              <div>
                <span className="pd-meta-label">Stock</span>
                <span className="pd-meta-value">{product.stock} units available</span>
              </div>
            </div>
            
            <div className="pd-meta-item">
              <Clock size={18} className="text-muted" />
              <div>
                <span className="pd-meta-label">Last Updated</span>
                <span className="pd-meta-value text-sm">{formatDate(product.lastUpdated)}</span>
              </div>
            </div>
            
            {product.video && (
              <div className="pd-meta-item">
                <PlayCircle size={18} className="text-primary" />
                <div>
                  <span className="pd-meta-label">Video</span>
                  <a href={product.video} target="_blank" rel="noreferrer" className="pd-link">View Product Video</a>
                </div>
              </div>
            )}
          </div>
        </div>

        {product.bargainingEnabled && (
          <div className="pd-info card" style={{ marginTop: '1.5rem' }}>
            <h3 className="card-title" style={{ marginBottom: '1.25rem' }}>Bargaining Rules</h3>
            <div className="pd-meta-grid">
              <div className="pd-meta-item">
                <div>
                  <span className="pd-meta-label">Bargaining</span>
                  <span className="pd-meta-value text-success">Enabled</span>
                </div>
              </div>
              
              <div className="pd-meta-item">
                <div>
                  <span className="pd-meta-label">Product Price</span>
                  <span className="pd-meta-value">Rs. {product.price.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="pd-meta-item">
                <div>
                  <span className="pd-meta-label">Maximum Discount</span>
                  <span className="pd-meta-value">{product.maxDiscount}%</span>
                </div>
              </div>

              <div className="pd-meta-item">
                <div>
                  <span className="pd-meta-label">Minimum Selling Price</span>
                  <span className="pd-meta-value font-medium">Rs. {product.minimumSellingPrice?.toLocaleString()}</span>
                </div>
              </div>

              <div className="pd-meta-item">
                <div>
                  <span className="pd-meta-label">Max Negotiation Attempts</span>
                  <span className="pd-meta-value">{product.maxNegotiationAttempts}</span>
                </div>
              </div>
            </div>
            
            <div className="info-alert" style={{ marginTop: '1.5rem', background: 'rgba(79, 70, 229, 0.1)', borderColor: 'rgba(79, 70, 229, 0.2)' }}>
              <span className="text-sm" style={{ color: 'var(--primary-dark)' }}>AI must not offer below the minimum selling price.</span>
            </div>
          </div>
        )}
      </div>

      <DeleteConfirmModal 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        loading={actionLoading}
      />

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}
