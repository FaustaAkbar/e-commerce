import { useState } from 'react';
import '../../styles/menuPage.css';

const Chatbot = () => {
  const [visible, setVisible] = useState(false);

  const toggleChatbot = () => setVisible(!visible);

  return (
    <div id="chatbot-container">
      <button id="chatbot-toggle" onClick={toggleChatbot} className="floating-chat-btn">
        <i className="fas fa-comments"></i>
      </button>
      {visible && (
        <div id="chatbot" className="modern-chatbot">
          <div id="chatbot-header" className="chat-header">
            <h3>
              <i className="fas fa-robot mr-2"></i>
              Pesan Bantuan
            </h3>
            <button id="chatbot-close" className="close-btn" onClick={toggleChatbot}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div id="chatbot-messages" className="messages-container"></div>
          <div id="chatbot-input-container" className="input-container">
            <input type="text" id="chatbot-input" className="modern-input" placeholder="Tanya saya sesuatu..." />
            <button id="chatbot-send" className="send-btn">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
