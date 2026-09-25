import { useState, useEffect } from 'react';
import { X, UploadCloud, Image as ImageIcon } from 'lucide-react';
import './ProductFormModal.css';

export default function ProductFormModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Electronics',
    price: 0,
    currency: 'USD',
    stock: 0,
    status: 'Active',
    video: '',
    images: [],
    bargainingEnabled: false,
    maxDiscount: 0,
    minimumSellingPrice: 0,
    maxNegotiationAttempts: 3
  });
  
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData;

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          ...initialData,
          images: initialData.images || [],
          video: initialData.video || '',
          bargainingEnabled: initialData.bargainingEnabled || false,
          maxDiscount: initialData.maxDiscount || 0,
          minimumSellingPrice: initialData.minimumSellingPrice || 0,
          maxNegotiationAttempts: initialData.maxNegotiationAttempts || 3
        });
      } else {
        setFormData({
          name: '', description: '', category: 'Electronics', price: 0, 
          currency: 'USD', stock: 0, status: 'Draft', video: '', images: [],
          bargainingEnabled: false, maxDiscount: 0, minimumSellingPrice: 0, maxNegotiationAttempts: 3
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => {
      const newValue = type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value);
      const updated = { ...prev, [name]: newValue };
      
      // Auto-calculate minimum selling price if price or discount changes
      if (name === 'price' || name === 'maxDiscount') {
        const p = name === 'price' ? newValue : prev.price;
        const d = name === 'maxDiscount' ? newValue : prev.maxDiscount;
        if (p > 0 && d >= 0 && d <= 100) {
          updated.minimumSellingPrice = p - (p * (d / 100));
        }
      }
      
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSave(formData, isEditing);
    setLoading(false);
    onClose();
  };

  return (
    <div className="modal-overlay fade-in">
      <div className="modal-drawer slide-in-right">
        <div className="drawer-header">
          <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="drawer-body">
          <div className="form-section">
            <h3 className="section-title">General Information</h3>
            
            <div className="form-group">
              <label>Product Name *</label>
              <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-control" placeholder="E.g., Wireless Headphones" />
            </div>
            
            <div className="form-group">
              <label>Description *</label>
              <textarea required name="description" value={formData.description} onChange={handleInputChange} className="form-control" rows="4" placeholder="Detailed product description"></textarea>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Pricing & Inventory</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Price *</label>
                <div className="input-with-prefix">
                  <span className="prefix">$</span>
                  <input required type="number" min="0" step="0.01" name="price" value={formData.price} onChange={handleInputChange} className="form-control with-prefix" />
                </div>
              </div>
              <div className="form-group">
                <label>Stock Quantity *</label>
                <input required type="number" min="0" name="stock" value={formData.stock} onChange={handleInputChange} className="form-control" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="form-control">
                  <option>Electronics</option>
                  <option>Wearables</option>
                  <option>Furniture</option>
                  <option>Beauty</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange} className="form-control">
                  <option>Active</option>
                  <option>Draft</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Bargaining & Negotiation</h3>
            
            <div className="ai-setting-row" style={{ marginBottom: '1.5rem', background: 'var(--bg-surface-hover)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div className="ai-setting-info">
                <div className="ai-setting-title">Enable Bargaining</div>
                <div className="ai-setting-desc">Allow the AI agent to negotiate price for this specific product.</div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" name="bargainingEnabled" checked={formData.bargainingEnabled} onChange={handleInputChange} />
                <span className="slider"></span>
              </label>
            </div>

            <div className={`form-grid ${!formData.bargainingEnabled ? 'opacity-50' : ''}`} style={{ pointerEvents: formData.bargainingEnabled ? 'auto' : 'none' }}>
              <div className="form-group">
                <label>Maximum Discount (%)</label>
                <input type="number" min="0" max="100" name="maxDiscount" value={formData.maxDiscount} onChange={handleInputChange} className="form-control" />
              </div>
              
              <div className="form-group">
                <label>Minimum Selling Price</label>
                <div className="input-with-prefix">
                  <span className="prefix">Rs.</span>
                  <input type="number" disabled value={formData.minimumSellingPrice} className="form-control with-prefix" style={{ backgroundColor: 'var(--bg-main)' }} />
                </div>
              </div>
              
              <div className="form-group">
                <label>Max Negotiation Attempts</label>
                <input type="number" min="1" name="maxNegotiationAttempts" value={formData.maxNegotiationAttempts} onChange={handleInputChange} className="form-control" />
              </div>
              
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <p className="text-muted text-sm">
                  <span className="font-medium text-main">Note:</span> AI will never offer a price below the configured minimum selling price.
                </p>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Media</h3>
            
            <div className="form-group">
              <label>Product Images</label>
              <div className="drag-drop-zone">
                <UploadCloud size={32} className="upload-icon" />
                <p><strong>Drag & drop product images here</strong></p>
                <p className="text-muted text-sm">or browse files (UI only)</p>
              </div>
              
              {/* Mock Image Previews */}
              {formData.images.length > 0 && (
                <div className="image-previews">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="preview-box">
                      <img src={img} alt={`Preview ${idx}`} />
                    </div>
                  ))}
                  <div className="preview-box add-more">
                    <ImageIcon size={20} className="text-muted" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="form-group mt-4">
              <label>Video URL (Optional)</label>
              <input type="text" name="video" value={formData.video} onChange={handleInputChange} className="form-control" placeholder="https://youtube.com/..." />
            </div>
          </div>

          <div className="drawer-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
