'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: 'bruschetta',
    name: 'Bruschetta',
    description: 'Toasted bread topped with tomatoes, garlic, and fresh basil',
    price: '$8.99',
    image: 'images/bruschetta.jpg',
  },
  {
    id: 'calamari',
    name: 'Calamari Fritti',
    description: 'Crispy fried squid served with marinara sauce',
    price: '$12.99',
    image: 'images/calamari.jpg',
  },
  {
    id: 'caprese',
    name: 'Caprese Salad',
    description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze',
    price: '$10.99',
    image: 'images/caprese.jpg',
  },
  {
    id: 'pancakes',
    name: 'Pancakes',
    description: 'Fluffy pancakes with syrup',
    price: '$7.99',
    image: 'images/pancakes.jpg',
  },
  {
    id: 'omelette',
    name: 'Omelette',
    description: 'Three-egg omelette with cheese',
    price: '$9.99',
    image: 'images/omelette.jpg',
  },
];

const ProductCard = () => {
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-20 bg-gray-50">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col"
            >
              {/* Product Image */}
              <div className="p-4">
                <div className="relative w-full h-64 rounded-xl overflow-hidden">
                  <Image
                    src={`/${product.image}`}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 flex-grow">
                  {product.description}
                </p>

                {/* Price & Icons */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-lg font-semibold">
                    {product.price}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-2 rounded-full border transition-all duration-200 ease-in-out hover:scale-110 hover:bg-red-100 hover:text-red-500 ${
                        wishlist.includes(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-700'
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                    </button>

                    {/* Cart Button */}
                    <button
                      className="p-2 rounded-full border bg-white text-gray-700 transition-all duration-200 ease-in-out hover:scale-110 hover:bg-orange-100 hover:text-orange-500"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
