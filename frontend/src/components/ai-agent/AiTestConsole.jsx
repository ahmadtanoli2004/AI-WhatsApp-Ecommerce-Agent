import { Bot, User, Send, RotateCcw, Mic, Play, FileText } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { mockApiService } from '../../services/mockApiService';

export default function AiTestConsole({ suggestedPrompts }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [inputMode, setInputMode] = useState('text'); // 'text' or 'voice'
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text, isVoice = false) => {
    if (!text.trim() && !isVoice) return;
    
    // Add user message
    const userMsg = isVoice 
      ? { id: Date.now(), type: 'voice', text: 'Voice Message (0:04)', sender: 'user', transcript: 'Is this product available in black?' }
      : { id: Date.now(), type: 'text', text, sender: 'user' };
      
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await mockApiService.getMockAiTestResponse(isVoice ? userMsg.transcript : text);
      const aiMsg = { id: Date.now() + 1, type: 'text', text: isVoice ? 'Yes, the black variant is currently available.' : response, sender: 'ai' };
      
      // Simulate slight delay for processing
      setTimeout(() => {
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
      }, 1000);
      
    } catch (error) {
      // Intentionally ignoring test error to prevent console spam
      setIsTyping(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="card fade-in-up ai-section-card" style={{ animationDelay: '0.6s' }}>
      <div className="ai-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 className="card-title" style={{ margin: 0 }}>Test Agent</h3>
        <button className="btn btn-outline reset-btn" onClick={handleClear} title="Clear Chat">
          <RotateCcw size={16} /> Clear
        </button>
      </div>

      <div className="ai-test-layout">
        <div className="ai-test-chat">
          <div className="ai-test-messages">
            {messages.length === 0 ? (
              <div className="ai-test-empty">
                <Bot size={32} className="text-muted" />
                <p>Send a message to test the AI configuration.</p>
              </div>
            ) : (
              messages.map(msg => (
                <div key={msg.id} className={`ai-test-msg ${msg.sender === 'user' ? 'msg-user' : 'msg-ai'}`}>
                  {msg.sender === 'ai' && <div className="msg-icon"><Bot size={14}/></div>}
                  
                  {msg.type === 'voice' ? (
                    <div className="msg-bubble" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                        <Play size={12} fill="currentColor" />
                        <span className="text-xs font-medium">Voice Message</span>
                      </div>
                      <div className="text-xs" style={{ fontStyle: 'italic', opacity: 0.9 }}>
                        Transcript: "{msg.transcript}"
                      </div>
                    </div>
                  ) : (
                    <div className="msg-bubble">{msg.text}</div>
                  )}
                  
                  {msg.sender === 'user' && <div className="msg-icon user"><User size={14}/></div>}
                </div>
              ))
            )}
            
            {isTyping && (
              <div className="ai-test-msg msg-ai">
                <div className="msg-icon"><Bot size={14}/></div>
                <div className="msg-bubble typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-test-input-area" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)' }}>
              <button 
                className={`btn btn-outline ${inputMode === 'text' ? 'active' : ''}`} 
                style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', borderColor: inputMode === 'text' ? 'var(--primary)' : '' }}
                onClick={() => setInputMode('text')}
              >
                <FileText size={12} style={{ marginRight: '4px' }} /> Text
              </button>
              <button 
                className={`btn btn-outline ${inputMode === 'voice' ? 'active' : ''}`} 
                style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem', borderColor: inputMode === 'voice' ? 'var(--primary)' : '' }}
                onClick={() => setInputMode('voice')}
              >
                <Mic size={12} style={{ marginRight: '4px' }} /> Voice
              </button>
            </div>
            
            <div style={{ display: 'flex', padding: '1rem', gap: '0.75rem' }}>
              {inputMode === 'text' ? (
                <>
                  <input 
                    type="text" 
                    placeholder="Ask the AI agent something..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                    disabled={isTyping}
                  />
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleSend(input)}
                    disabled={isTyping || !input.trim()}
                  >
                    <Send size={16} />
                  </button>
                </>
              ) : (
                <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(79, 70, 229, 0.05)', borderRadius: 'var(--radius-md)', padding: '0.5rem' }}>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleSend('', true)}
                    disabled={isTyping}
                    style={{ gap: '0.5rem' }}
                  >
                    <Play size={16} fill="currentColor" /> Play Mock Voice
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="ai-test-suggested">
          <h4>Suggested Test Prompts</h4>
          <div className="suggested-pills">
            {suggestedPrompts?.map((prompt, i) => (
              <button 
                key={i} 
                className="suggested-pill"
                onClick={() => handleSend(prompt)}
                disabled={isTyping}
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
