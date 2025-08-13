import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SecurityAlert {
  id: string;
  type: 'warning' | 'danger' | 'info';
  message: string;
  timestamp: Date;
  userId?: string;
  resolved: boolean;
}

export interface SecurityLog {
  id: string;
  userId: string;
  action: string;
  ip: string;
  timestamp: Date;
  riskLevel: 'low' | 'medium' | 'high';
  details: string;
}

interface SecurityContextType {
  alerts: SecurityAlert[];
  logs: SecurityLog[];
  isBlocked: boolean;
  addAlert: (alert: Omit<SecurityAlert, 'id' | 'timestamp' | 'resolved'>) => void;
  addLog: (log: Omit<SecurityLog, 'id' | 'timestamp'>) => void;
  resolveAlert: (id: string) => void;
  blockUser: (userId: string) => void;
  getSecurityStats: () => {
    totalAlerts: number;
    resolvedAlerts: number;
    highRiskLogs: number;
    blockedUsers: number;
  };
}

const SecurityContext = createContext<SecurityContextType | null>(null);

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};

interface SecurityProviderProps {
  children: ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [logs, setLogs] = useState<SecurityLog[]>([]);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    // Initialize with sample security data
    const sampleLogs: SecurityLog[] = [
      {
        id: '1',
        userId: 'user123',
        action: 'Failed login attempt',
        ip: '192.168.1.100',
        timestamp: new Date(Date.now() - 3600000),
        riskLevel: 'medium',
        details: 'Multiple failed login attempts detected'
      },
      {
        id: '2',
        userId: 'user456',
        action: 'Suspicious product search',
        ip: '10.0.0.1',
        timestamp: new Date(Date.now() - 1800000),
        riskLevel: 'low',
        details: 'Rapid product searches detected'
      }
    ];

    setLogs(sampleLogs);

    // Check for blocked status
    const blockedStatus = localStorage.getItem('isBlocked');
    if (blockedStatus === 'true') {
      setIsBlocked(true);
    }
  }, []);

  const addAlert = (alert: Omit<SecurityAlert, 'id' | 'timestamp' | 'resolved'>) => {
    const newAlert: SecurityAlert = {
      ...alert,
      id: Date.now().toString(),
      timestamp: new Date(),
      resolved: false
    };
    
    setAlerts(prev => [newAlert, ...prev].slice(0, 10)); // Keep only latest 10 alerts
  };

  const addLog = (log: Omit<SecurityLog, 'id' | 'timestamp'>) => {
    const newLog: SecurityLog = {
      ...log,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    
    setLogs(prev => [newLog, ...prev].slice(0, 100)); // Keep only latest 100 logs

    // Auto-generate alerts for high-risk activities
    if (log.riskLevel === 'high') {
      addAlert({
        type: 'danger',
        message: `High-risk activity detected: ${log.action}`,
        userId: log.userId
      });
    }
  };

  const resolveAlert = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id ? { ...alert, resolved: true } : alert
      )
    );
  };

  const blockUser = (userId: string) => {
    setIsBlocked(true);
    localStorage.setItem('isBlocked', 'true');
    addAlert({
      type: 'danger',
      message: `User ${userId} has been blocked due to security violations`,
      userId
    });
  };

  const getSecurityStats = () => {
    return {
      totalAlerts: alerts.length,
      resolvedAlerts: alerts.filter(alert => alert.resolved).length,
      highRiskLogs: logs.filter(log => log.riskLevel === 'high').length,
      blockedUsers: isBlocked ? 1 : 0
    };
  };

  return (
    <SecurityContext.Provider value={{
      alerts: alerts.filter(alert => !alert.resolved),
      logs,
      isBlocked,
      addAlert,
      addLog,
      resolveAlert,
      blockUser,
      getSecurityStats
    }}>
      {children}
    </SecurityContext.Provider>
  );
};