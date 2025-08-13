import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Heart, ShoppingCart, Shield, Truck, RotateCcw } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useSecurity } from '../../contexts/SecurityContext';

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
}

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviews: number;
  seller: string;
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  badge?: string;
  inStock: number;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId, onBack }) => {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();
  const { addLog } = useSecurity();

  useEffect(() => {
    // Mock product detail data
    const mockProduct: ProductDetail = {
      id: productId,
      name: 'Wireless Bluetooth Headphones Premium',
      price: 79.99,
      originalPrice: 99.99,
      images: [
        'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
        'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg',
        'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg'
      ],
      rating: 4.5,
      reviews: 2340,
      seller: 'TechStore Official',
      description: 'Experience premium audio quality with our wireless Bluetooth headphones. Featuring advanced noise cancellation, 30-hour battery life, and comfortable over-ear design perfect for all-day listening.',
      features: [
        'Active Noise Cancellation (ANC)',
        '30-hour battery life',
        'Quick charge: 5 mins = 3 hours playback',
        'Premium leather ear cushions',
        'Multipoint Bluetooth connection',
        'Built-in microphone for calls',
        'Foldable design for travel'
      ],
      specifications: {
        'Driver Size': '40mm',
        'Frequency Response': '20Hz - 20kHz',
        'Impedance': '32 Ohm',
        'Battery Life': '30 hours',
        'Charging Time': '2 hours',
        'Weight': '250g',
        'Connectivity': 'Bluetooth 5.0, 3.5mm jack',
        'Warranty': '2 years'
      },
      badge: 'Best Seller',
      inStock: 47
    };
    
    setProduct(mockProduct);

    // Log product view
    addLog({
      userId: 'current_user',
      action: 'Product viewed',
      ip: '192.168.1.1',
      riskLevel: 'low',
      details: `Product ${productId} viewed`
    });
  }, [productId, addLog]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        seller: product.seller
      }, quantity);

      addLog({
        userId: 'current_user',
        action: 'Product added to cart',
        ip: '192.168.1.1',
        riskLevel: 'low',
        details: `Product ${product.name} added to cart (qty: ${quantity})`
      });
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          {product.badge && (
            <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-4 ${
              product.badge === 'Best Seller' 
                ? 'bg-orange-100 text-orange-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {product.badge}
            </span>
          )}

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          <div className="flex items-center mb-4">
            {renderStars(product.rating)}
            <span className="ml-2 text-lg text-gray-600">
              {product.rating} ({product.reviews.toLocaleString()} reviews)
            </span>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                <span className="text-lg font-medium text-green-600">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

          {/* Stock Status */}
          <div className="mb-6">
            <p className="text-green-600 font-medium">✓ In stock ({product.inStock} available)</p>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center">
              <label htmlFor="quantity" className="text-sm font-medium text-gray-700 mr-3">
                Qty:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {[...Array(Math.min(10, product.inStock))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Heart className={`h-6 w-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
            </button>
          </div>

          {/* Seller Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-600">
              Sold by: <span className="font-medium text-gray-900">{product.seller}</span>
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-5 w-5 text-green-500" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Truck className="h-5 w-5 text-blue-500" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <RotateCcw className="h-5 w-5 text-purple-500" />
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-200 mb-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Specifications</h3>
              <dl className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1">
                    <dt className="text-gray-600">{key}:</dt>
                    <dd className="text-gray-900 font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;