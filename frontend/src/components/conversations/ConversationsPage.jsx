import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockApiService } from '../../services/mockApiService';
import ConversationList from './ConversationList';
import ActiveChat from './ActiveChat';
import CustomerSidePanel from './CustomerSidePanel';
import Toast from '../ui/Toast';
import './Conversations.css';

export default function ConversationsPage() {
  const [searchParams] = useSearchParams();
  const userIdParam = searchParams.get('userId');

  const [conversations, setConversations] = useState([]);
  const [activeConvId, setActiveConvId] = useState(null);
  const [activeCustomer, setActiveCustomer] = useState(null);
  
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Responsive states
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [view, setView] = useState('list'); // 'list' or 'chat' for mobile

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (window.innerWidth <= 1024 && window.innerWidth > 768) {
        setShowSidebar(false);
      } else if (window.innerWidth > 1024) {
        setShowSidebar(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [search, filter]);

  useEffect(() => {
    if (userIdParam && conversations.length > 0) {
      const conv = conversations.find(c => c.customerId === userIdParam);
      if (conv) {
        handleSelectConversation(conv.id);
      }
    }
  }, [userIdParam, conversations.length]);

  const fetchConversations = async () => {
    try {
      const data = await mockApiService.getConversations({ search, filter });
      setConversations(data);
    } catch (err) {
      showToast(err.message, 'danger');
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerInfo = async (customerId) => {
    try {
      const data = await mockApiService.getCustomerById(customerId);
      setActiveCustomer(data);
    } catch (err) {
      // Intentionally ignoring error to prevent console spam
    }
  };

  const handleSelectConversation = (id) => {
    setActiveConvId(id);
    const conv = conversations.find(c => c.id === id);
    if (conv) {
      fetchCustomerInfo(conv.customerId);
    }
    if (isMobile) {
      setView('chat');
    }
  };

  const showToast = (message, type = 'success') => setToast({ message, type });

  const handleSendMessage = async (text) => {
    if (!activeConvId) return;
    
    // Optimistic UI update
    const convIndex = conversations.findIndex(c => c.id === activeConvId);
    if (convIndex === -1) return;
    
    setIsTyping(true);
    try {
      await mockApiService.sendMockMessage(activeConvId, text);
      // Re-fetch to get updated state (including AI reply)
      await fetchConversations();
      
      // Keep fetching for a few seconds to catch the async AI reply
      setTimeout(() => fetchConversations(), 1600);
      
    } catch (err) {
      showToast('Failed to send message', 'danger');
    } finally {
      setIsTyping(false);
    }
  };

  const handleAISuggestion = (suggestionText) => {
    handleSendMessage(suggestionText);
  };

  const activeConversation = conversations.find(c => c.id === activeConvId);

  if (loading && conversations.length === 0) {
    return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading conversations...</div>;
  }

  return (
    <div className="conversations-layout fade-in">
      {/* LEFT PANEL */}
      {(!isMobile || view === 'list') && (
        <ConversationList 
          conversations={conversations}
          activeId={activeConvId}
          onSelect={handleSelectConversation}
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />
      )}

      {/* CENTER PANEL */}
      {(!isMobile || view === 'chat') && (
        <ActiveChat 
          conversation={activeConversation}
          onSend={handleSendMessage}
          onSuggest={handleAISuggestion}
          isTyping={isTyping}
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
          onToggleList={() => setView('list')}
          isMobile={isMobile}
        />
      )}

      {/* RIGHT PANEL */}
      {!isMobile && showSidebar && activeConversation && (
        <CustomerSidePanel 
          customer={activeCustomer}
          onClose={() => setShowSidebar(false)}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
