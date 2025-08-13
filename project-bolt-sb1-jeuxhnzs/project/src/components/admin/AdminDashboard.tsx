import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  ShoppingBag, 
  AlertTriangle, 
  BarChart3, 
  DollarSign,
  Activity,
  TrendingUp,
  Eye,
  Lock
} from 'lucide-react';
import { useSecurity } from '../../contexts/SecurityContext';
import SecurityPanel from './SecurityPanel';
import AnalyticsPanel from './AnalyticsPanel';
import FinancialPanel from './FinancialPanel';
import UserManagement from './UserManagement';

type AdminView = 'dashboard' | 'security' | 'analytics' | 'financial' | 'users';

const AdminDashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const { getSecurityStats, logs, alerts } = useSecurity();
  const stats = getSecurityStats();

  const dashboardStats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Total Orders',
      value: '5,678',
      change: '+8%',
      icon: ShoppingBag,
      color: 'green'
    },
    {
      title: 'Revenue',
      value: '$123,456',
      change: '+15%',
      icon: DollarSign,
      color: 'purple'
    },
    {
      title: 'Security Alerts',
      value: stats.totalAlerts,
      change: stats.totalAlerts > 0 ? 'Active' : 'Clear',
      icon: AlertTriangle,
      color: stats.totalAlerts > 0 ? 'red' : 'green'
    }
  ];

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'users', label: 'Users', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Admin Panel</span>
            </div>
          </div>

          <nav className="p-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as AdminView)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 mb-2 ${
                    currentView === item.id 
                      ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {navigationItems.find(item => item.id === currentView)?.label || 'Dashboard'}
            </h1>
          </header>

          <main className="p-6">
            {currentView === 'dashboard' && (
              <div>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {dashboardStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          </div>
                          <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                            <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                          </div>
                        </div>
                        <div className="mt-4">
                          <span className={`text-sm font-medium ${
                            stat.change.includes('+') ? 'text-green-600' : 
                            stat.change === 'Active' ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {stat.change}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">vs last month</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Security Logs</h3>
                    <div className="space-y-3">
                      {logs.slice(0, 5).map((log) => (
                        <div key={log.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-3 h-3 rounded-full ${
                            log.riskLevel === 'high' ? 'bg-red-500' :
                            log.riskLevel === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{log.action}</p>
                            <p className="text-xs text-gray-500">{log.timestamp.toLocaleString()}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            log.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                            log.riskLevel === 'medium' ? 'bg-orange-100 text-orange-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {log.riskLevel}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">System Health</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Server Status</span>
                        <span className="text-sm font-medium text-green-600">Online</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Security Level</span>
                        <span className="text-sm font-medium text-green-600">Secure</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Backup</span>
                        <span className="text-sm font-medium text-gray-900">2 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Active Users</span>
                        <span className="text-sm font-medium text-gray-900">1,024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentView === 'security' && <SecurityPanel />}
            {currentView === 'analytics' && <AnalyticsPanel />}
            {currentView === 'financial' && <FinancialPanel />}
            {currentView === 'users' && <UserManagement />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;