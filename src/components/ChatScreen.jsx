import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip, Camera, MapPin, Phone, CheckCircle } from 'lucide-react';

const ChatScreen = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock data for the errand
  const errand = {
    id: parseInt(id),
    type: 'Grocery Shopping',
    runner: {
      name: 'Sarah M.',
      phone: '+234 803 123 4567',
      rating: 4.9,
      status: 'online'
    },
    status: 'in-progress'
  };

  // Mock messages
  const initialMessages = [
    {
      id: 1,
      sender: 'runner',
      text: "Hi! I'm Sarah, your runner for today. I'm heading to Shoprite now to get your items.",
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: 2,
      sender: 'user',
      text: "Great! Please make sure to get the organic milk if available.",
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: 3,
      sender: 'runner',
      text: "I'm at Shoprite now. They have organic milk in stock. Anything else you'd like me to check?",
      timestamp: '10:45 AM',
      type: 'text'
    },
    {
      id: 4,
      sender: 'runner',
      text: "",
      timestamp: '10:47 AM',
      type: 'location',
      location: 'Shoprite, Victoria Island'
    }
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleCompleteErrand = () => {
    setIsCompleted(true);
    const completionMessage = {
      id: messages.length + 1,
      sender: 'system',
      text: 'Errand marked as completed! Please rate your runner.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'system'
    };
    setMessages([...messages, completionMessage]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center p-4">
          <Link to="/requests" className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          
          <div className="flex-1 flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {errand.runner.name.charAt(0)}
                </span>
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                errand.runner.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
              }`}></div>
            </div>
            
            <div className="flex-1">
              <h1 className="font-medium text-gray-800">{errand.runner.name}</h1>
              <p className="text-sm text-gray-600">{errand.type}</p>
            </div>
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.type === 'system' ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 max-w-xs">
                <p className="text-sm text-yellow-800 text-center">{msg.text}</p>
              </div>
            ) : msg.type === 'location' ? (
              <div className="bg-white rounded-lg border border-gray-200 p-3 max-w-xs">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-gray-800">Current Location</span>
                </div>
                <p className="text-sm text-gray-600">{msg.location}</p>
                <p className="text-xs text-gray-500 mt-1">{msg.timestamp}</p>
              </div>
            ) : (
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-200'
              }`}>
                <p className={`text-sm ${msg.sender === 'user' ? 'text-white' : 'text-gray-800'}`}>
                  {msg.text}
                </p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {msg.timestamp}
                </p>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Complete Errand Button */}
      {!isCompleted && errand.status === 'in-progress' && (
        <div className="px-4 py-2 bg-white border-t">
          <button
            onClick={handleCompleteErrand}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Mark as Complete
          </button>
        </div>
      )}

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Camera className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isCompleted}
            />
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isCompleted}
            className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;