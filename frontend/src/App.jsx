import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import PlaceholderPage from './pages/PlaceholderPage';
import ProductManagement from './components/ProductManagement';
import ProductDetails from './components/products/ProductDetails';
import OrderManagement from './components/orders/OrderManagement';
import OrderDetails from './components/orders/OrderDetails';
import CustomerManagement from './components/customers/CustomerManagement';
import CustomerDetails from './components/customers/CustomerDetails';
import ConversationsPage from './components/conversations/ConversationsPage';
import AiAgentManagement from './components/ai-agent/AiAgentManagement';
import WhatsAppManagement from './components/whatsapp/WhatsAppManagement';
import SettingsManagement from './components/settings/SettingsManagement';
import './App.css'; // Still keeping it if needed, but layout CSS is moved

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Use the existing functional components */}
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="customers/:id" element={<CustomerDetails />} />
          <Route path="conversations" element={<ConversationsPage />} />
          <Route path="ai-agent" element={<AiAgentManagement />} />
          <Route path="whatsapp" element={<WhatsAppManagement />} />
          <Route path="settings" element={<SettingsManagement />} />
          
          {/* Catch-all for undefined routes */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
