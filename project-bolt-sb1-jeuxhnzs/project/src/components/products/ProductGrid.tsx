import React, { useState, useEffect } from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useSecurity } from '../../contexts/SecurityContext';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  seller: string;
  badge?: string;
  category: string;
}

interface ProductGridProps {
  onViewProduct: (productId: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onViewProduct }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { addToCart } = useCart();
  const { addLog } = useSecurity();

  useEffect(() => {
    // Mock products data
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Wireless Bluetooth Headphones',
        price: 79.99,
        originalPrice: 99.99,
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
        rating: 4.5,
        reviews: 2340,
        seller: 'TechStore',
        badge: 'Best Seller',
        category: 'Electronics'
      },
      {
        id: '2',
        name: 'Smartphone 128GB',
        price: 599.99,
        image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
        rating: 4.7,
        reviews: 1856,
        seller: 'MobileWorld',
        badge: "Amazon's Choice",
        category: 'Electronics'
      },
      {
        id: '3',
        name: 'Organic Coffee Beans 1lb',
        price: 24.99,
        originalPrice: 29.99,
        image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg',
        rating: 4.3,
        reviews: 892,
        seller: 'CoffeeLovers',
        category: 'Food & Beverages'
      },
      {
        id: '4',
        name: 'Fitness Tracking Watch',
        price: 199.99,
        image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
        rating: 4.6,
        reviews: 1234,
        seller: 'FitTech',
        badge: 'New Arrival',
        category: 'Sports & Fitness'
      },
      {
        id: '5',
        name: 'Wireless Charging Pad',
        price: 39.99,
        originalPrice: 49.99,
        image: 'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg',
        rating: 4.2,
        reviews: 567,
        seller: 'ChargeHub',
        category: 'Electronics'
      },
      {
        id: '6',
        name: 'Premium Yoga Mat',
        price: 49.99,
        image: 'https://images.pexels.com/photos/3820424/pexels-photo-3820424.jpeg',
        rating: 4.8,
        reviews: 2145,
        seller: 'YogaPlus',
        badge: 'Premium Quality',
        category: 'Sports & Fitness'
      }
    ];
    
    setProducts(mockProducts);
  }, []);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });

    addLog({
      userId: 'current_user',
      action: 'Product favorited',
      ip: '192.168.1.1',
      riskLevel: 'low',
      details: `Product ${productId} added/removed from favorites`
    });
  };

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      seller: product.seller
    });

    addLog({
      userId: 'current_user',
      action: 'Product added to cart',
      ip: '192.168.1.1',
      riskLevel: 'low',
      details: `Product ${product.name} added to cart`
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to SecureShop</h1>
        <p className="text-lg opacity-90 mb-6">Discover amazing products with secure shopping experience</p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur">
            <span className="font-semibold">🔒 Secure Payments</span>
          </div>
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur">
            <span className="font-semibold">🚚 Free Shipping</span>
          </div>
          <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur">
            <span className="font-semibold">🛡️ Buyer Protection</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Products</h2>
        <p className="text-gray-600">Discover our best-selling and most popular items</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-100 overflow-hidden"
            onClick={() => onViewProduct(product.id)}
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {product.badge && (
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.badge === 'Best Seller' 
                      ? 'bg-orange-100 text-orange-800'
                      : product.badge === "Amazon's Choice"
                      ? 'bg-blue-100 text-blue-800'
                      : product.badge === 'New Arrival'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}>
                    {product.badge}
                  </span>
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(product.id);
                }}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <Heart 
                  className={`h-5 w-5 ${
                    favorites.has(product.id) 
                      ? 'text-red-500 fill-current' 
                      : 'text-gray-400'
                  }`} 
                />
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                {product.name}
              </h3>

              <div className="flex items-center mb-2">
                {renderStars(product.rating)}
                <span className="ml-2 text-sm text-gray-600">
                  ({product.reviews.toLocaleString()})
                </span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <span className="text-sm font-medium text-green-600">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-3">by {product.seller}</p>

              <button
                onClick={(e) => handleAddToCart(product, e)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;