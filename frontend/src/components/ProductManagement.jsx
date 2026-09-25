import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { mockApiService } from '../services/mockApiService';
import ProductSummaryCards from './products/ProductSummaryCards';
import ProductToolbar from './products/ProductToolbar';
import ProductTable from './products/ProductTable';
import ProductFormModal from './products/ProductFormModal';
import DeleteConfirmModal from './products/DeleteConfirmModal';
import Toast from './ui/Toast';
import './ProductManagement.css';

export default function ProductManagement() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    search: '', category: 'All Categories', stock: 'All Stock', status: 'All Status', sort: 'Recently Updated'
  });

  const [toast, setToast] = useState(null);
  
  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await mockApiService.getProducts(filters);
      setProducts(data);
    } catch (err) {
      showToast(err.message, 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const resetFilters = () => {
    setFilters({ search: '', category: 'All Categories', stock: 'All Stock', status: 'All Status', sort: 'Recently Updated' });
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleView = (product) => {
    navigate(`/products/${product.id}`);
  };

  const handleDeleteRequest = (product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleSaveProduct = async (productData, isEditing) => {
    try {
      if (isEditing) {
        await mockApiService.updateProduct(selectedProduct.id, productData);
        showToast('Product updated successfully');
      } else {
        await mockApiService.createProduct(productData);
        showToast('Product created successfully');
      }
      fetchProducts();
    } catch (err) {
      showToast(err.message, 'danger');
    }
  };

  const confirmDelete = async () => {
    setActionLoading(true);
    try {
      await mockApiService.deleteProduct(selectedProduct.id);
      showToast('Product deleted successfully');
      setIsDeleteOpen(false);
      fetchProducts();
    } catch (err) {
      showToast(err.message, 'danger');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1600px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Products</h2>
          <p className="text-muted">Manage your product catalog, inventory, pricing, and availability.</p>
        </div>
        <button className="btn btn-primary" onClick={handleAdd}>
          <Plus size={18} /> Add Product
        </button>
      </div>

      <ProductSummaryCards products={products} />

      <ProductToolbar filters={filters} setFilters={setFilters} onReset={resetFilters} />

      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>Loading products...</p>
        </div>
      ) : (
        <ProductTable 
          products={products} 
          onView={handleView} 
          onEdit={handleEdit} 
          onDelete={handleDeleteRequest} 
        />
      )}

      <ProductFormModal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSave={handleSaveProduct}
        initialData={selectedProduct}
      />

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
