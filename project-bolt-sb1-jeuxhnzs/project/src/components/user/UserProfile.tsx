import React, { useState } from 'react';
import { User, Mail, Calendar, Shield, Package, CreditCard } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'security'>('profile');

  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      items: 2,
      total: 159.98,
      status: 'Delivered'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      items: 1,
      total: 79.99,
      status: 'In Transit'
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      items: 3,
      total: 249.97,
      status: 'Processing'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                activeTab === 'profile' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </button>
            
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                activeTab === 'orders' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <Package className="h-5 w-5" />
              <span>Orders</span>
            </button>
            
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                activeTab === 'security' ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'hover:bg-gray-50'
              }`}
            >
              <Shield className="h-5 w-5" />
              <span>Security</span>
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{user?.name}</h3>
                      <p className="text-gray-600">{user?.role === 'admin' ? 'Administrator' : 'Customer'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
                        <User className="h-5 w-5 text-gray-400" />
                        <span>{user?.name}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <span>{user?.email}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Member Since
                      </label>
                      <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <span>{user?.createdAt?.toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Login
                      </label>
                      <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
                        <Calendar className="h-5 w-5 text-gray-400" />
                        <span>{user?.lastLogin?.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order History</h2>
                
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
                          <p className="text-sm text-gray-600">
                            {order.items} item{order.items > 1 ? 's' : ''} • ${order.total}
                          </p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'In Transit'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-6 w-6 text-green-600" />
                      <div>
                        <h3 className="font-medium text-green-800">Account Secure</h3>
                        <p className="text-sm text-green-600">Your account is protected with secure login</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Password</h4>
                      <p className="text-sm text-gray-600 mb-3">Last changed 30 days ago</p>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Change Password
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Two-Factor Auth</h4>
                      <p className="text-sm text-gray-600 mb-3">Not enabled</p>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Enable 2FA
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Login Sessions</h4>
                      <p className="text-sm text-gray-600 mb-3">1 active session</p>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        View Sessions
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Account Activity</h4>
                      <p className="text-sm text-gray-600 mb-3">Last login: Today</p>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Activity
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;