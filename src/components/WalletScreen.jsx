import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import BottomNavigation from './BottomNavigation';
import { Plus, ArrowUpRight, ArrowDownLeft, CreditCard, DollarSign, History, Shield } from 'lucide-react';

const WalletScreen = () => {
  const { user } = useAuth();
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [amount, setAmount] = useState('');

  const transactions = [
    {
      id: 1,
      type: 'debit',
      amount: 3500,
      description: 'Grocery Shopping - Sarah M.',
      date: '2024-01-15',
      status: 'completed',
      reference: 'TXN001234'
    },
    {
      id: 2,
      type: 'credit',
      amount: 10000,
      description: 'Wallet Top-up',
      date: '2024-01-14',
      status: 'completed',
      reference: 'TXN001233'
    },
    {
      id: 3,
      type: 'debit',
      amount: 1200,
      description: 'Pharmacy Pickup - David O.',
      date: '2024-01-13',
      status: 'completed',
      reference: 'TXN001232'
    },
    {
      id: 4,
      type: 'credit',
      amount: 500,
      description: 'Refund - Cancelled Order',
      date: '2024-01-12',
      status: 'completed',
      reference: 'TXN001231'
    }
  ];

  const handleAddMoney = () => {
    if (amount && parseFloat(amount) > 0) {
      // Simulate payment processing
      alert(`Adding ₦${parseFloat(amount).toLocaleString()} to wallet...`);
      setAmount('');
      setShowAddMoney(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Wallet</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm">Available Balance</p>
              <h2 className="text-3xl font-bold">₦{user?.balance?.toLocaleString() || '0'}</h2>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setShowAddMoney(true)}
              className="flex-1 bg-white text-primary font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Money
            </button>
            <button className="flex-1 bg-white/20 text-white font-medium py-3 rounded-lg hover:bg-white/30 transition-colors">
              Send Money
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-800 text-sm">Escrow</h3>
            <p className="text-xs text-gray-600">Secure payments</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-800 text-sm">Cashback</h3>
            <p className="text-xs text-gray-600">Earn rewards</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <History className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-800 text-sm">History</h3>
            <p className="text-xs text-gray-600">View all</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
            <button className="text-primary text-sm font-medium hover:text-primary-dark">
              View All
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {transactions.map((transaction, index) => (
              <div key={transaction.id} className={`p-4 ${index !== transactions.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'credit' 
                        ? 'bg-green-100' 
                        : 'bg-red-100'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <ArrowDownLeft className="w-5 h-5 text-green-600" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 text-sm">
                        {transaction.description}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>{formatDate(transaction.date)}</span>
                        <span>•</span>
                        <span>{transaction.reference}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-semibold ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      transaction.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Money Modal */}
      {showAddMoney && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Money to Wallet</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (₦)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field"
                placeholder="Enter amount"
                min="100"
                step="50"
              />
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Quick amounts:</p>
              <div className="grid grid-cols-3 gap-2">
                {[1000, 2000, 5000].map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount.toString())}
                    className="py-2 px-3 border border-gray-200 rounded-lg text-sm hover:border-primary hover:text-primary transition-colors"
                  >
                    ₦{quickAmount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddMoney(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMoney}
                disabled={!amount || parseFloat(amount) <= 0}
                className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Money
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default WalletScreen;