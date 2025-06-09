import React, { useState } from 'react';
import { Bot, X, Send, MessageCircle } from 'lucide-react';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente de StockMind. ¿En qué puedo ayudarte hoy?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        isBot: false,
        timestamp: new Date()
      };
      
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      // Simular respuesta del bot después de un breve delay
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "Gracias por tu mensaje. Te ayudo con consultas sobre inventario, usuarios y funcionalidades de StockMind.",
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Botón flotante mejorado */}
      <div 
        className={`fixed bottom-8 right-22 z-50 transition-all duration-300 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <button
          onClick={toggleChat}
          className="relative group flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #00ABE4, #0891B2)',
            borderRadius: '50%',
            width: '70px',
            height: '70px',
            boxShadow: '0 8px 25px rgba(0, 171, 228, 0.4)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 12px 35px rgba(0, 171, 228, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0px)';
            e.target.style.boxShadow = '0 8px 25px rgba(0, 171, 228, 0.4)';
          }}
        >
          <Bot size={32} color="#FFFFFF" style={{ flexShrink: 0 }} />
          
          {/* Globo de diálogo mejorado */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div 
              className="px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap shadow-lg"
              style={{
                background: '#FFFFFF',
                color: '#075985',
                border: '2px solid #00ABE4',
                boxShadow: '0 8px 25px rgba(0, 171, 228, 0.2)'
              }}
            >
              ¡Hola! ¿Necesitas ayuda?
              <div 
                className="absolute top-full left-1/2 transform -translate-x-1/2"
                style={{
                  width: '0',
                  height: '0',
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: '8px solid #00ABE4'
                }}
              ></div>
            </div>
          </div>
        </button>
      </div>

      {/* Panel de chat mejorado y más grande */}
      <div 
        className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <div 
          className="flex flex-col"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(15px)',
            borderRadius: '20px',
            width: '420px',
            height: '550px',
            boxShadow: '0 20px 60px rgba(0, 171, 228, 0.3)',
            border: '1px solid rgba(0, 171, 228, 0.2)',
            overflow: 'hidden'
          }}
        >
          {/* Header del chat mejorado */}
          <div 
            className="flex items-center justify-between p-6"
            style={{
              background: 'linear-gradient(135deg, #00ABE4, #0891B2)',
              color: '#FFFFFF'
            }}
          >
            <div className="flex items-center space-x-3">
              <div 
                className="p-2 rounded-full"
                style={{ background: 'rgba(255, 255, 255, 0.2)' }}
              >
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-0">Asistente StockMind</h3>
                <p className="text-sm opacity-90 mb-0">En línea</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="p-2 rounded-full transition-colors duration-200"
              style={{ background: 'rgba(255, 255, 255, 0.2)' }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Área de mensajes mejorada */}
          <div 
            className="flex-1 overflow-y-auto p-6 space-y-4"
            style={{ background: '#F8FAFC' }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className="max-w-xs px-4 py-3 rounded-2xl text-sm font-medium shadow-sm"
                  style={{
                    background: message.isBot 
                      ? '#FFFFFF'
                      : 'linear-gradient(135deg, #00ABE4, #0891B2)',
                    color: message.isBot ? '#075985' : '#FFFFFF',
                    border: message.isBot ? '1px solid #E9F1FA' : 'none',
                    boxShadow: message.isBot 
                      ? '0 2px 8px rgba(0, 171, 228, 0.1)' 
                      : '0 4px 12px rgba(0, 171, 228, 0.3)'
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input de mensaje mejorado */}
          <div 
            className="p-6"
            style={{ 
              background: '#FFFFFF',
              borderTop: '1px solid #E9F1FA'
            }}
          >
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 text-sm font-medium transition-all duration-200"
                style={{
                  background: '#F8FAFC',
                  border: '2px solid #E9F1FA',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  color: '#075985',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00ABE4';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 171, 228, 0.1)';
                  e.target.style.background = '#FFFFFF';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E9F1FA';
                  e.target.style.boxShadow = 'none';
                  e.target.style.background = '#F8FAFC';
                }}
              />
              <button
                onClick={sendMessage}
                className="p-3 rounded-xl transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #00ABE4, #0891B2)',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(0, 171, 228, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(0, 171, 228, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 171, 228, 0.3)';
                }}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingChatbot;