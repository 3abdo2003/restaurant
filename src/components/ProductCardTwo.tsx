'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  reviews: string;
}

const products: Product[] = [
  {
    id: 'caprese',
    name: 'Caprese Salad',
    description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze',
    price: '10.99 USD',
    image: 'images/caprese.jpg',
    rating: 4.1,
    reviews: '(1.5k)',
  },
  {
    id: 'bruschetta',
    name: 'Bruschetta',
    description: 'Toasted bread with fresh tomatoes and basil.',
    price: '8.99 USD',
    image: 'images/bruschetta.jpg',
    rating: 4.2,
    reviews: '(1.2k)',
  },
  {
    id: 'calamari',
    name: 'Calamari Fritti',
    description: 'Crispy fried squid served with marinara.',
    price: '12.99 USD',
    image: 'images/calamari.jpg',
    rating: 4.8,
    reviews: '(900)',
  },
    {
    id: 'pancakes',
    name: 'Pancakes',
    description: 'Fluffy pancakes with maple syrup.',
    price: '7.99 USD',
    image: 'images/pancakes.jpg',
    rating: 4.5,
    reviews: '(1.1k)',
    },
    {
    id: 'omelette',
    name: 'Omelette',
    description: 'Three-egg omelette with cheese and herbs.',
    price: '9.99 USD',
    image: 'images/omelette.jpg',
    rating: 4.3,
    reviews: '(800)',
  },
];

const ProductCardTwo = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.2em] text-gray-400">PRODUCTS</p>
          <h2 className="mt-2 font-display text-4xl font-bold text-gray-900">
            Our <span className="text-orange-500">Products</span>
          </h2>
          <p className="font-body text-xl text-gray-600 mt-4">
            Discover our delicious dishes
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => {
            const [amount, currency] = product.price.split(' ');

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm p-4 flex flex-col relative"
              >
                
                {/* Image Container */}
                <div className="relative w-full h-56 rounded-2xl overflow-hidden">
                  <Image
                    src={`/${product.image}`}
                    alt={product.name}
                    fill
                    className="object-cover rounded-2xl"
                  />

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full border shadow-sm transition-all duration-200 ease-in-out hover:scale-110 hover:bg-red-100 hover:text-red-500 ${
                      wishlist.includes(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-500'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{product.description}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-500 fill-yellow-500'
                            : i < product.rating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-gray-500 text-xs">{product.reviews}</span>
                  </div>

                  {/* Price */}
                  <div className="mt-3 font-bold text-lg text-gray-900">
                    {amount} <sup>{currency}</sup>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCardTwo;
