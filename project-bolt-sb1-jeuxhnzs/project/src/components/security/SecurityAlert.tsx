import React, { useEffect, useState } from 'react';
import { AlertTriangle, X, Shield, Info } from 'lucide-react';
import { SecurityAlert as SecurityAlertType } from '../../contexts/SecurityContext';

interface SecurityAlertProps {
  alert: SecurityAlertType;
}

const SecurityAlert: React.FC<SecurityAlertProps> = ({ alert }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000); // Auto-hide after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const getAlertIcon = () => {
    switch (alert.type) {
      case 'danger':
        return <AlertTriangle className="h-5 w-5" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getAlertStyles = () => {
    switch (alert.type) {
      case 'danger':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className={`border rounded-lg p-4 shadow-lg max-w-sm ${getAlertStyles()}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getAlertIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium mb-1">Security Alert</h4>
          <p className="text-sm">{alert.message}</p>
          <p className="text-xs mt-2 opacity-75">
            {alert.timestamp.toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-current opacity-50 hover:opacity-75"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default SecurityAlert;