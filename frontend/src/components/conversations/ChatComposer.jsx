import { Paperclip, Mic, Smile, Send, Sparkles, Square, X as XIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ChatComposer({ onSend, onSuggest, disabled }) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
    } else {
      setRecordingTime(0);
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    if (disabled) return;
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    if (!isRecording) return;
    setIsRecording(false);
    // Send a mock voice message
    onSend({ type: 'voice', duration: formatTime(recordingTime), transcript: 'Mujhe blue shirt ka price bata dein.' });
  };

  const handleCancelRecording = () => {
    setIsRecording(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled && !isRecording) {
      onSend(message);
      setMessage('');
    }
  };

  const handleSuggest = () => {
    onSuggest("Would you like me to check the latest delivery estimate?");
  };

  return (
    <div className="chat-composer-container">
      <div className="chat-suggestion-bar">
        <button className="btn-ai-suggestion" onClick={handleSuggest} disabled={disabled} title="Get AI Suggestion">
          <Sparkles size={14} /> AI Suggestion
        </button>
      </div>
      
      <form className="chat-composer" onSubmit={handleSubmit}>
        <div className="composer-actions">
          <button type="button" className="composer-btn" disabled={disabled} title="Attach">
            <Paperclip size={20} />
          </button>
          <button type="button" className="composer-btn" disabled={disabled} title="Emoji">
            <Smile size={20} />
          </button>
        </div>
        
        {isRecording ? (
          <div className="recording-state" style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', color: 'var(--danger)', fontWeight: '500' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', animation: 'pulse 1.5s infinite' }}>
              <Mic size={16} />
              <span>Recording... {formatTime(recordingTime)}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="button" className="composer-btn" onClick={handleCancelRecording} title="Cancel">
                <XIcon size={20} />
              </button>
              <button type="button" className="composer-send-btn active" style={{ backgroundColor: 'var(--danger)' }} onClick={handleStopRecording} title="Stop & Send">
                <Square size={16} fill="currentColor" />
              </button>
            </div>
          </div>
        ) : (
          <input 
            type="text" 
            className="composer-input" 
            placeholder="Type a message..." 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={disabled}
          />
        )}
        
        {!isRecording && (
          message.trim() ? (
            <button type="submit" className="composer-send-btn active" disabled={disabled}>
              <Send size={18} />
            </button>
          ) : (
            <button type="button" className="composer-btn" disabled={disabled} onClick={handleStartRecording} title="Voice Note">
              <Mic size={20} />
            </button>
          )
        )}
      </form>
    </div>
  );
}
