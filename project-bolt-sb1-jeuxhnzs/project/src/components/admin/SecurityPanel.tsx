import React, { useState } from 'react';
import { AlertTriangle, Shield, Eye, Lock, Activity, Users } from 'lucide-react';
import { useSecurity } from '../../contexts/SecurityContext';

const SecurityPanel: React.FC = () => {
  const { logs, alerts, getSecurityStats, resolveAlert } = useSecurity();
  const [selectedTab, setSelectedTab] = useState<'alerts' | 'logs' | 'monitoring'>('alerts');
  const stats = getSecurityStats();

  const securityMetrics = [
    {
      title: 'Active Alerts',
      value: stats.totalAlerts,
      status: stats.totalAlerts === 0 ? 'safe' : 'warning',
      icon: AlertTriangle
    },
    {
      title: 'High Risk Events',
      value: stats.highRiskLogs,
      status: stats.highRiskLogs === 0 ? 'safe' : 'danger',
      icon: Activity
    },
    {
      title: 'Blocked Users',
      value: stats.blockedUsers,
      status: 'info',
      icon: Lock
    },
    {
      title: 'Monitoring Status',
      value: 'Active',
      status: 'safe',
      icon: Eye
    }
  ];

  return (
    <div className="space-y-6">
      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
                <div className={`p-3 rounded-full ${
                  metric.status === 'safe' ? 'bg-green-100' :
                  metric.status === 'warning' ? 'bg-orange-100' :
                  metric.status === 'danger' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  <Icon className={`h-6 w-6 ${
                    metric.status === 'safe' ? 'text-green-600' :
                    metric.status === 'warning' ? 'text-orange-600' :
                    metric.status === 'danger' ? 'text-red-600' : 'text-blue-600'
                  }`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'alerts', label: 'Security Alerts', icon: AlertTriangle },
              { id: 'logs', label: 'Activity Logs', icon: Activity },
              { id: 'monitoring', label: 'Live Monitoring', icon: Eye }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors duration-200 ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 'alerts' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Security Alerts</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Live Monitoring Active</span>
                </div>
              </div>

              {alerts.length === 0 ? (
                <div className="text-center py-12">
                  <Shield className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">All Clear!</h4>
                  <p className="text-gray-600">No security alerts at the moment.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`border-l-4 rounded-r-lg p-4 ${
                        alert.type === 'danger' 
                          ? 'border-red-500 bg-red-50'
                          : alert.type === 'warning'
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-blue-500 bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className={`h-5 w-5 ${
                            alert.type === 'danger' 
                              ? 'text-red-600'
                              : alert.type === 'warning'
                              ? 'text-orange-600'
                              : 'text-blue-600'
                          }`} />
                          <div>
                            <h4 className="font-medium text-gray-900">{alert.message}</h4>
                            <p className="text-sm text-gray-600">{alert.timestamp.toLocaleString()}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => resolveAlert(alert.id)}
                          className="px-3 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50"
                        >
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {selectedTab === 'logs' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Security Activity Logs</h3>
              
              <div className="space-y-3">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-4 h-4 rounded-full ${
                      log.riskLevel === 'high' ? 'bg-red-500' :
                      log.riskLevel === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                    }`}></div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{log.action}</h4>
                        <span className="text-sm text-gray-500">{log.timestamp.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-600">{log.details}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">User: {log.userId}</span>
                        <span className="text-xs text-gray-500">IP: {log.ip}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          log.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                          log.riskLevel === 'medium' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {log.riskLevel.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'monitoring' && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Live Security Monitoring</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Threat Detection</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Malware Scanner</span>
                      <span className="text-sm font-medium text-green-600">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">DDoS Protection</span>
                      <span className="text-sm font-medium text-green-600">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Intrusion Detection</span>
                      <span className="text-sm font-medium text-green-600">Monitoring</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">SQL Injection Shield</span>
                      <span className="text-sm font-medium text-green-600">Protected</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Access Control</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Failed Login Attempts</span>
                      <span className="text-sm font-medium text-orange-600">3 (Last Hour)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Blocked IPs</span>
                      <span className="text-sm font-medium text-red-600">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active Sessions</span>
                      <span className="text-sm font-medium text-green-600">1,024</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Suspicious Activity</span>
                      <span className="text-sm font-medium text-green-600">None</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityPanel;