import React, { useState } from 'react';
import ChatModal from './ChatModal';

const ChatIcon = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      <button onClick={toggleChat} style={{position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#007bff', color: 'white', borderRadius: '50%', padding: '10px'}}>
        <i className="bi bi-chat-dots"></i> Chat
      </button>
      {isChatOpen && <ChatModal onClose={toggleChat} />}
    </div>
  );
};

export default ChatIcon;
