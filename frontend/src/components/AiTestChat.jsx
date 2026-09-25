import { useState, useRef, useEffect } from 'react';
import { mockApiService } from '../services/mockApiService';
import './AiTestChat.css';

export default function AiTestChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input.trim() };
    
    const conversationHistory = messages.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      content: msg.content
    }));

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const data = await mockApiService.sendChatMessage(userMessage.content, conversationHistory);
      
      const aiMessage = { 
        role: 'model', 
        content: data.response,
        products: data.products 
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="chat-container fade-in card">
      <div className="chat-header">
        <div>
          <h2>AI Sales Agent Sandbox</h2>
          <p className="subtitle">Test how your virtual assistant interacts with customers.</p>
        </div>
        <button className="btn btn-sm btn-secondary" onClick={clearChat}>
           <span className="icon">↻</span> Reset Conversation
        </button>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="chat-empty">
            <div className="ai-avatar-large">🤖</div>
            <h3>I'm your AI Shopping Assistant</h3>
            <p>Try asking me about the products in your catalog!</p>
            <div className="suggestions">
              <span className="suggestion-chip" onClick={() => setInput('Do you have any headphones?')}>"Do you have any headphones?"</span>
              <span className="suggestion-chip" onClick={() => setInput('Show me fitness watches')}>"Show me fitness watches"</span>
            </div>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`message-wrapper ${msg.role}`}>
            {msg.role === 'model' && <div className="ai-avatar-small">🤖</div>}
            <div className={`message-bubble ${msg.role}`}>
              <div className="message-content">{msg.content}</div>
              
              {msg.products && msg.products.length > 0 && (
                <div className="product-context">
                  <p className="context-title">Related Products:</p>
                  <div className="product-cards-mini">
                    {msg.products.map(p => (
                      <div key={p.id} className="product-card-mini">
                         <div className="mini-img-placeholder">
                           {p.images && p.images[0] ? <img src={p.images[0]} alt=""/> : '📦'}
                         </div>
                         <div className="mini-details">
                           <strong>{p.name}</strong>
                           <span>${p.price}</span>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message-wrapper model">
            <div className="ai-avatar-small">🤖</div>
            <div className="message-bubble model typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && <div className="chat-error">{error}</div>}

      <form className="chat-input-area" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message to the AI agent..."
          disabled={isLoading}
          className="chat-input form-control"
          autoFocus
        />
        <button type="submit" disabled={isLoading || !input.trim()} className="btn btn-primary send-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2"/>
          </svg>
        </button>
      </form>
    </div>
  );
}
