import React from 'react';
import { TrendingUp, Users, ShoppingBag, Eye, BarChart3, Clock } from 'lucide-react';

const AnalyticsPanel: React.FC = () => {
  // Mock analytics data
  const analyticsData = {
    userGrowth: [
      { month: 'Jan', users: 1200 },
      { month: 'Feb', users: 1350 },
      { month: 'Mar', users: 1500 },
      { month: 'Apr', users: 1400 },
      { month: 'May', users: 1650 },
      { month: 'Jun', users: 1800 }
    ],
    topPages: [
      { page: '/products', views: 15420, bounce: 32 },
      { page: '/login', views: 12340, bounce: 45 },
      { page: '/cart', views: 8760, bounce: 28 },
      { page: '/checkout', views: 5430, bounce: 22 },
      { page: '/profile', views: 3210, bounce: 35 }
    ],
    userActivity: {
      activeUsers: 1024,
      pageViews: 45680,
      avgSessionTime: '4m 32s',
      bounceRate: '28%'
    }
  };

  const metrics = [
    {
      title: 'Total Page Views',
      value: '45,680',
      change: '+12.5%',
      icon: Eye,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: '1,024',
      change: '+8.2%',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      change: '+0.5%',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Avg. Session Time',
      value: '4m 32s',
      change: '+15s',
      icon: Clock,
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-${metric.color}-100`}>
                  <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium text-green-600">{metric.change}</span>
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">User Growth</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {analyticsData.userGrowth.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 w-12">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(data.users / 2000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-gray-900 w-16 text-right">
                  {data.users.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Top Pages</h3>
          
          <div className="space-y-4">
            {analyticsData.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{page.page}</p>
                  <p className="text-sm text-gray-600">Bounce rate: {page.bounce}%</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{page.views.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Real-time Activity</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{analyticsData.userActivity.activeUsers}</div>
            <p className="text-sm text-gray-600">Active Users</p>
            <div className="mt-2">
              <div className="w-3 h-3 bg-green-500 rounded-full mx-auto animate-pulse"></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{analyticsData.userActivity.pageViews.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Page Views</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{analyticsData.userActivity.avgSessionTime}</div>
            <p className="text-sm text-gray-600">Avg. Session</p>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{analyticsData.userActivity.bounceRate}</div>
            <p className="text-sm text-gray-600">Bounce Rate</p>
          </div>
        </div>
      </div>

      {/* User Behavior Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">User Behavior Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Peak Hours</h4>
            <p className="text-2xl font-bold text-blue-700">2PM - 4PM</p>
            <p className="text-sm text-blue-600">Highest user activity</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Top Device</h4>
            <p className="text-2xl font-bold text-green-700">Mobile</p>
            <p className="text-sm text-green-600">68% of traffic</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">Top Browser</h4>
            <p className="text-2xl font-bold text-purple-700">Chrome</p>
            <p className="text-sm text-purple-600">72% of users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;