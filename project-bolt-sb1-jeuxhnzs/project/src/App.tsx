import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { SecurityProvider } from './contexts/SecurityContext';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import MainLayout from './components/layout/MainLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import { useAuth } from './contexts/AuthContext';
import { useSecurity } from './contexts/SecurityContext';
import SecurityAlert from './components/security/SecurityAlert';
import LoadingSpinner from './components/common/LoadingSpinner';
import ErrorBoundary from './components/common/ErrorBoundary';

function AppContent() {
  const { user, loading } = useAuth();
  const { alerts, isBlocked } = useSecurity();
  const [currentView, setCurrentView] = useState<'login' | 'signup' | 'main' | 'admin'>('login');

  useEffect(() => {
    if (user && !isBlocked) {
      if (user.role === 'admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('main');
      }
    } else if (!user) {
      setCurrentView('login');
    }
  }, [user, isBlocked]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isBlocked) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Account Blocked</h2>
          <p className="text-gray-600">Your account has been temporarily blocked due to suspicious activity. Please contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        {alerts.length > 0 && (
          <div className="fixed top-4 right-4 z-50 space-y-2">
            {alerts.map((alert) => (
              <SecurityAlert key={alert.id} alert={alert} />
            ))}
          </div>
        )}

        {currentView === 'login' && (
          <LoginForm onSwitchToSignup={() => setCurrentView('signup')} />
        )}

        {currentView === 'signup' && (
          <SignupForm onSwitchToLogin={() => setCurrentView('login')} />
        )}

        {currentView === 'main' && user && (
          <MainLayout />
        )}

        {currentView === 'admin' && user?.role === 'admin' && (
          <AdminDashboard />
        )}
      </div>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <AuthProvider>
      <SecurityProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </SecurityProvider>
    </AuthProvider>
  );
}

export default App;