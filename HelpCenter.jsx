import { useState } from 'react';
import { Bot, Send, User, Info } from 'lucide-react';
import api from '../api';
import './HelpCenter.css';

const HelpCenter = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatLog, setChatLog] = useState([
    { role: 'bot', text: 'Hello! I am LifeSource Assistant. How can I help you today? You can ask me about donating blood, registering, or find "hospital near me".' }
  ]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userText = message;
    const msgLower = userText.toLowerCase();
    
    // Add user message
    const newChat = [...chatLog, { role: 'user', text: userText }];
    setChatLog(newChat);
    setMessage('');
    setLoading(true);

    const isLocationQuery = /(hospital|donor|blood\s*bank|donation)/.test(msgLower) && /(near|close|around|nearby)/.test(msgLower);

    if (isLocationQuery || msgLower.includes('blood availability')) {
      if (!navigator.geolocation) {
        setChatLog([...newChat, { role: 'bot', text: 'Geolocation is not supported by your browser. Cannot find nearby resources.' }]);
        setLoading(false);
        return;
      }
      
      setChatLog(curr => [...curr, { role: 'bot', text: 'Detecting your location to find nearby resources...' }]);
      
      navigator.geolocation.getCurrentPosition(async (pos) => {
        try {
          // Send request without bloodGroup to get nearby entities using the newly updated backend fallback
          const res = await api.get(`/search?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`);
          const results = res.data.results || [];
          const apiMessage = res.data.message;
          
          if (results.length === 0) {
            setChatLog([...newChat, { role: 'bot', text: 'No nearby donors/hospitals found.' }]);
          } else {
            let textReply = apiMessage ? `${apiMessage} Here are the top 3 closest:` : `I found ${results.length} locations. Here are the top 3 closest to you:`;
            setChatLog([...newChat, { role: 'bot', text: textReply, options: results.slice(0, 3) }]); 
          }
        } catch (error) {
          console.error(error);
          setChatLog([...newChat, { role: 'bot', text: 'Sorry, I failed to fetch nearby hospitals right now.' }]);
        }
        setLoading(false);
      }, () => {
        setChatLog([...newChat, { role: 'bot', text: 'Location access denied. Please click the icon in your address bar to allow location.' }]);
        setLoading(false);
      });
      return; 
    }

    try {
      const res = await api.post('/help', { message: userText });
      setChatLog([...newChat, { role: 'bot', text: res.data.reply }]);
    } catch (error) {
      setChatLog([...newChat, { role: 'bot', text: 'Sorry, I am having trouble connecting to the server.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="help-page container">
      <div className="page-header">
        <h1>Help & Support Center</h1>
        <p>Get answers to your questions instantly through our AI assistant or browse common FAQs.</p>
      </div>

      <div className="help-container">
        <div className="faq-section">
          <h3><Info className="inline-icon"/> Frequently Asked Questions</h3>
          
          <div className="faq-item">
            <h4>Who can donate blood?</h4>
            <p>You must be in good health, at least 18 years old, and weigh at least 110 lbs. Certain medical conditions or medications may prevent you from donating temporarily.</p>
          </div>
          
          <div className="faq-item">
            <h4>How often can I donate blood?</h4>
            <p>Whole blood can be donated every 56 days. Platelets can be donated every 7 days, up to 24 times a year.</p>
          </div>
          
          <div className="faq-item">
            <h4>Is donating blood safe?</h4>
            <p>Yes. A new, sterile needle is used for each donation and is discarded afterward. You cannot get any infectious disease from giving blood.</p>
          </div>
        </div>

        <div className="chat-section">
          <div className="chat-header">
            <Bot size={28} className="bot-avatar" />
            <div>
              <h3>LifeSource AI Support</h3>
              <p className="status">{loading ? 'Typing...' : 'Online'}</p>
            </div>
          </div>

          <div className="chat-window">
            {chatLog.map((msg, idx) => (
              <div key={idx} className={`chat-bubble ${msg.role === 'bot' ? 'bot-message' : 'user-message'}`}>
                <div className="bubble-icon">
                  {msg.role === 'bot' ? <Bot size={20}/> : <User size={20}/>}
                </div>
                <div className="bubble-text">
                  <p style={{margin: 0}}>{msg.text}</p>
                  {msg.options && (
                    <div style={{marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px'}}>
                      {msg.options.map((opt, i) => (
                        <div key={i} style={{background: 'rgba(0,0,0,0.05)', padding: '10px', borderRadius: '8px', borderLeft: '4px solid #dc2626'}}>
                           <strong style={{display:'block', marginBottom:'3px'}}>{opt.name}</strong>
                           <span style={{fontSize:'13px', display:'block'}}>Type: {opt.type === 'hospital' ? 'Hospital' : `Donor (${opt.bloodGroup})`}</span>
                           <span style={{fontSize:'13px', display:'block'}}>Distance: {opt.distance.toFixed(2)} km</span>
                           <a href={`tel:${opt.contactNumber || opt.phone}`} style={{fontSize:'13px', fontWeight:'bold', color:'#dc2626', textDecoration:'none', marginTop:'4px', display:'inline-block'}}>📞 {opt.contactNumber || opt.phone}</a>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="chat-input-area">
            <input 
              type="text" 
              placeholder="Type your question..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="chat-input"
              disabled={loading}
            />
            <button type="submit" className="btn btn-primary send-btn" disabled={!message.trim() || loading}>
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
