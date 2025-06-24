import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BottomNavigation from './BottomNavigation';
import { 
  ArrowLeft, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Download,
  CreditCard,
  Clock,
  Star,
  Award
} from 'lucide-react';

const RunnerEarnings = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const earningsData = {
    today: { amount: 8500, jobs: 6, hours: 7.5 },
    week: { amount: 45000, jobs: 28, hours: 35 },
    month: { amount: 185000, jobs: 120, hours: 150 },
    total: { amount: 850000, jobs: 580, hours: 720 }
  };

  const currentData = earningsData[selectedPeriod];

  const recentEarnings = [
    {
      id: 1,
      type: 'Grocery Shopping',
      customer: 'Sarah M.',
      amount: 1200,
      date: '2024-01-15',
      time: '2:30 PM',
      rating: 5,
      status: 'completed'
    },
    {
      id: 2,
      type: 'Pharmacy Pickup',
      customer: 'David O.',
      amount: 800,
      date: '2024-01-15',
      time: '1:15 PM',
      rating: 5,
      status: 'completed'
    },
    {
      id: 3,
      type: 'Bill Payment',
      customer: 'Fatima A.',
      amount: 600,
      date: '2024-01-15',
      time: '11:45 AM',
      rating: 4,
      status: 'completed'
    },
    {
      id: 4,
      type: 'Delivery',
      customer: 'John K.',
      amount: 1500,
      date: '2024-01-14',
      time: '4:20 PM',
      rating: 5,
      status: 'completed'
    }
  ];

  const achievements = [
    { title: 'Top Performer', description: 'Completed 100+ errands', icon: '🏆', earned: true },
    { title: 'Speed Demon', description: 'Average completion under 30 mins', icon: '⚡', earned: true },
    { title: 'Customer Favorite', description: '4.9+ rating maintained', icon: '⭐', earned: true },
    { title: 'Reliable Runner', description: '99% completion rate', icon: '✅', earned: false }
  ];

  const handleWithdraw = () => {
    if (withdrawAmount && parseFloat(withdrawAmount) > 0) {
      alert(`Withdrawal request for ₦${parseFloat(withdrawAmount).toLocaleString()} submitted!`);
      setWithdrawAmount('');
      setShowWithdrawModal(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center p-6">
          <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-800">Earnings</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm">Available Balance</p>
              <h2 className="text-3xl font-bold">₦{user?.runnerBalance?.toLocaleString() || '45,000'}</h2>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="flex-1 bg-white text-green-600 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Withdraw Funds
            </button>
            <button className="flex-1 bg-white/20 text-white font-medium py-3 rounded-lg hover:bg-white/30 transition-colors">
              Cash Advance
            </button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
          {[
            { key: 'today', label: 'Today' },
            { key: 'week', label: 'Week' },
            { key: 'month', label: 'Month' },
            { key: 'total', label: 'All Time' }
          ].map(period => (
            <button
              key={period.key}
              onClick={() => setSelectedPeriod(period.key)}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all duration-200 ${
                selectedPeriod === period.key
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="font-bold text-gray-800">₦{currentData.amount.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Earned</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-blue-600" />
            </div>
            <div className="font-bold text-gray-800">{currentData.jobs}</div>
            <div className="text-xs text-gray-600">Jobs Done</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div className="font-bold text-gray-800">{currentData.hours}h</div>
            <div className="text-xs text-gray-600">Hours</div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average per job</span>
              <span className="font-medium text-gray-800">
                ₦{Math.round(currentData.amount / currentData.jobs).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Hourly rate</span>
              <span className="font-medium text-gray-800">
                ₦{Math.round(currentData.amount / currentData.hours).toLocaleString()}/hr
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Success rate</span>
              <span className="font-medium text-green-600">98%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average rating</span>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="font-medium text-gray-800">4.9</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Earnings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Recent Earnings</h2>
            <button className="text-green-600 text-sm font-medium hover:text-green-700 flex items-center gap-1">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            {recentEarnings.map((earning, index) => (
              <div key={earning.id} className={`p-4 ${index !== recentEarnings.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-800">{earning.type}</h4>
                      <div className="font-bold text-green-600">+₦{earning.amount.toLocaleString()}</div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Customer: {earning.customer}</span>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 mr-1" />
                        <span>{earning.rating}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatDate(earning.date)} • {earning.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h2>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <div key={index} className={`p-4 rounded-xl border ${
                achievement.earned 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <h4 className={`font-medium text-sm ${
                  achievement.earned ? 'text-green-800' : 'text-gray-600'
                }`}>
                  {achievement.title}
                </h4>
                <p className={`text-xs ${
                  achievement.earned ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Withdraw Funds</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (₦)
              </label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter amount"
                min="1000"
                step="100"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum withdrawal: ₦1,000</p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Quick amounts:</p>
              <div className="grid grid-cols-3 gap-2">
                {[5000, 10000, 20000].map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setWithdrawAmount(quickAmount.toString())}
                    className="py-2 px-3 border border-gray-200 rounded-lg text-sm hover:border-green-500 hover:text-green-600 transition-colors"
                  >
                    ₦{quickAmount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                disabled={!withdrawAmount || parseFloat(withdrawAmount) < 1000}
                className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default RunnerEarnings;