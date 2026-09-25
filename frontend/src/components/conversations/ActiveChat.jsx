import { Bot, User, Search, MoreVertical, Menu, ArrowLeft, Mic, Play, ShieldAlert } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ChatComposer from './ChatComposer';

export default function ActiveChat({ 
  conversation, 
  onSend, 
  onSuggest, 
  isTyping,
  onToggleSidebar,
  onToggleList,
  isMobile
}) {
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages, isTyping]);

  if (!conversation) {
    return (
      <div className="active-chat-panel empty">
        <div className="chat-empty-state">
          <Bot size={48} className="text-muted" />
          <h3>No Conversation Selected</h3>
          <p className="text-muted">Select a conversation from the left to start chatting.</p>
        </div>
      </div>
    );
  }

  const formatTime = (isoString) => {
    return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date(isoString));
  };

  return (
    <div className="active-chat-panel">
      <div className="chat-header">
        <div className="chat-header-left">
          {isMobile && (
            <button className="chat-icon-btn" onClick={onToggleList}>
              <ArrowLeft size={20} />
            </button>
          )}
          
          <div className="chat-avatar">
            {conversation.customerAvatar}
            {conversation.status === 'online' && <div className="status-dot online"></div>}
          </div>
          
          <div className="chat-header-info">
            <h3 className="chat-name">{conversation.customerName}</h3>
            <div className="chat-status-row">
              <span className="chat-number">{conversation.whatsapp}</span>
              <span className="separator">•</span>
              {conversation.mode === 'ai' ? (
                <span className="chat-mode ai"><Bot size={12} /> AI Active</span>
              ) : (
                <span className="chat-mode human"><User size={12} /> Human Agent</span>
              )}
            </div>
          </div>
        </div>

        <div className="chat-header-actions">
          <button className="chat-icon-btn" title="Search in chat">
            <Search size={20} />
          </button>
          <button className="chat-icon-btn" title="Customer Info" onClick={onToggleSidebar}>
            <Menu size={20} />
          </button>
          <button className="chat-icon-btn" title="More options">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {conversation.messages.map(msg => {
          const isCustomer = msg.sender === 'customer';
          const isAI = msg.sender === 'ai';
          
          return (
            <div key={msg.id} className={`message-wrapper ${isCustomer ? 'customer' : 'agent'}`}>
              <div className={`message-bubble ${isCustomer ? 'bubble-customer' : 'bubble-agent'}`}>
                {isAI && <div className="message-sender-label"><Bot size={10} /> AI Agent</div>}
                {!isAI && !isCustomer && <div className="message-sender-label text-muted"><User size={10} /> Human Agent</div>}
                
                {msg.type === 'voice' && (
                  <div className="voice-message-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.1)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
                      <button className="chat-icon-btn" style={{ background: 'var(--primary)', color: 'white', padding: '0.25rem' }}>
                        <Play size={14} fill="currentColor" />
                      </button>
                      <div className="voice-waveform" style={{ flexGrow: 1, height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px', position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%', background: 'var(--primary)', borderRadius: '2px' }}></div>
                      </div>
                      <span className="text-xs">{msg.duration || '0:00'}</span>
                    </div>
                    {msg.transcript && (
                      <div className="voice-transcript text-sm" style={{ fontStyle: 'italic', opacity: 0.9 }}>
                        <Mic size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        Transcript: "{msg.transcript}"
                      </div>
                    )}
                  </div>
                )}
                
                {msg.type === 'bargain_offer' && (
                  <div className="bargain-offer-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-wa)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>
                      <ShieldAlert size={12} /> Negotiation Active
                    </div>
                    <div className="message-text">{msg.text}</div>
                    
                    {msg.metadata && (
                      <div className="bargain-metadata-card" style={{ marginTop: '0.5rem', background: 'rgba(0,0,0,0.15)', padding: '0.5rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                          <span className="text-muted">Original Price</span>
                          <span>Rs. {msg.metadata.originalPrice?.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                          <span className="text-muted">Customer Offer</span>
                          <span>Rs. {msg.metadata.customerOffer?.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                          <span className="text-muted">Minimum Price</span>
                          <span>Rs. {msg.metadata.minimumPrice?.toLocaleString()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--accent-wa)', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                          <span>AI Offer</span>
                          <span>Rs. {msg.metadata.aiOffer?.toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {(!msg.type || msg.type === 'text') && (
                  <div className="message-text">{msg.text}</div>
                )}
                
                <div className="message-time">{formatTime(msg.timestamp)}</div>
              </div>
            </div>
          );
        })}
        
        {isTyping && (
          <div className="message-wrapper agent">
            <div className="message-bubble bubble-agent typing-indicator">
              <div className="message-sender-label"><Bot size={10} /> AI Agent is typing</div>
              <div className="typing-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <ChatComposer 
        onSend={onSend} 
        onSuggest={onSuggest}
        disabled={isTyping}
      />
    </div>
  );
}
