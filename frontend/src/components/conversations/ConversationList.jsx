import { Search, Bot, MessageSquare } from 'lucide-react';

export default function ConversationList({ 
  conversations, 
  activeId, 
  onSelect, 
  search, 
  setSearch, 
  filter, 
  setFilter 
}) {
  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const now = new Date();
    const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    
    if (isToday) {
      return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(date);
    }
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  return (
    <div className="conv-list-panel">
      <div className="conv-list-header">
        <h2>Conversations</h2>
        <div className="conv-search">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search conversations..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="conv-filters">
          {['All', 'Unread', 'AI Active', 'Human'].map(f => (
            <button 
              key={f}
              className={`conv-filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="conv-list-items">
        {conversations.length === 0 ? (
          <div className="conv-empty-state text-muted">
            <MessageSquare size={24} />
            <p>No conversations found</p>
          </div>
        ) : (
          conversations.map(conv => (
            <div 
              key={conv.id} 
              className={`conv-list-item ${activeId === conv.id ? 'active' : ''}`}
              onClick={() => onSelect(conv.id)}
            >
              <div className="conv-avatar">
                {conv.customerAvatar}
                {conv.status === 'online' && <div className="status-dot online"></div>}
              </div>
              
              <div className="conv-item-content">
                <div className="conv-item-top">
                  <span className="conv-name">{conv.customerName}</span>
                  <span className="conv-time">{formatTime(conv.lastMessageTime)}</span>
                </div>
                <div className="conv-item-bottom">
                  <span className="conv-last-msg">{conv.lastMessage}</span>
                  <div className="conv-badges">
                    {conv.mode === 'ai' && (
                      <span className="conv-badge-ai"><Bot size={10} /> AI</span>
                    )}
                    {conv.unreadCount > 0 && (
                      <span className="conv-badge-unread">{conv.unreadCount}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
