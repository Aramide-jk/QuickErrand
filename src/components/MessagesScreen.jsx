import { useState } from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from './BottomNavigation';
import { Search, MessageCircle, Clock, Star } from 'lucide-react';

const MessagesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    {
      id: 1,
      runner: {
        name: 'Sarah M.',
        avatar: 'S',
        rating: 4.9,
        status: 'online'
      },
      lastMessage: "I'm at Shoprite now. They have organic milk in stock.",
      timestamp: '10:47 AM',
      unread: 2,
      errandType: 'Grocery Shopping'
    },
    {
      id: 2,
      runner: {
        name: 'David O.',
        avatar: 'D',
        rating: 4.8,
        status: 'offline'
      },
      lastMessage: "Order completed successfully! Please rate your experience.",
      timestamp: 'Yesterday',
      unread: 0,
      errandType: 'Bill Payment'
    },
    {
      id: 3,
      runner: {
        name: 'Fatima A.',
        avatar: 'F',
        rating: 4.7,
        status: 'online'
      },
      lastMessage: "I'll be there in 15 minutes to pick up your prescription.",
      timestamp: '2 days ago',
      unread: 0,
      errandType: 'Pharmacy Pickup'
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.runner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.errandType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">Messages</h1>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              {searchQuery ? 'No conversations found' : 'No messages yet'}
            </h3>
            <p className="text-gray-600">
              {searchQuery 
                ? 'Try searching with different keywords'
                : 'Start a conversation by posting an errand request'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredConversations.map((conversation) => (
              <Link
                key={conversation.id}
                to={`/chat/${conversation.id}`}
                className="block bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {conversation.runner.avatar}
                      </span>
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      conversation.runner.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-800 truncate">
                          {conversation.runner.name}
                        </h3>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 mr-1" />
                          <span className="text-xs text-gray-600">{conversation.runner.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                        {conversation.unread > 0 && (
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-medium">{conversation.unread}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-1 truncate">
                      {conversation.lastMessage}
                    </p>
                    
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{conversation.errandType}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default MessagesScreen;