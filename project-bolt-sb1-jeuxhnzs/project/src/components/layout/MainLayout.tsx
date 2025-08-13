import React, { useState } from 'react';
import Header from './Header';
import ProductGrid from '../products/ProductGrid';
import ProductDetail from '../products/ProductDetail';
import Cart from '../cart/Cart';
import UserProfile from '../user/UserProfile';

type View = 'home' | 'product' | 'cart' | 'profile';

const MainLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleViewProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProductId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView} 
      />
      
      <main className="pt-16">
        {currentView === 'home' && (
          <ProductGrid onViewProduct={handleViewProduct} />
        )}
        
        {currentView === 'product' && selectedProductId && (
          <ProductDetail 
            productId={selectedProductId} 
            onBack={handleBackToHome}
          />
        )}
        
        {currentView === 'cart' && (
          <Cart />
        )}
        
        {currentView === 'profile' && (
          <UserProfile />
        )}
      </main>
    </div>
  );
};

export default MainLayout;