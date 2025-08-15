'use client';

import { useState } from 'react';
import Image from 'next/image';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: 'specials' | 'breakfast' | 'lunch' | 'dinner' | 'desserts';
}

const menuData: MenuItem[] = [
  // Specials
  { id: 'bruschetta', name: 'Bruschetta', description: 'Toasted bread topped with tomatoes, garlic, and fresh basil', price: '$8.99', image: 'images/bruschetta.jpg', category: 'specials' },
  { id: 'calamari', name: 'Calamari Fritti', description: 'Crispy fried squid served with marinara sauce', price: '$12.99', image: 'images/calamari.jpg', category: 'specials' },
  { id: 'caprese', name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, and basil with balsamic glaze', price: '$10.99', image: 'images/caprese.jpg', category: 'specials' },

  // Breakfast
  { id: 'pancakes', name: 'Pancakes', description: 'Fluffy pancakes with syrup', price: '$7.99', image: 'images/pancakes.jpg', category: 'breakfast' },
  { id: 'omelette', name: 'Omelette', description: 'Three-egg omelette with cheese', price: '$9.99', image: 'images/omelette.jpg', category: 'breakfast' },

  // Lunch
  { id: 'margherita', name: 'Margherita Pizza', description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil', price: '$18.99', image: 'images/pizza.jpg', category: 'lunch' },
  { id: 'carbonara', name: 'Spaghetti Carbonara', description: 'Pasta with eggs, cheese, pancetta, and black pepper', price: '$16.99', image: 'images/carbonara.jpg', category: 'lunch' },
  { id: 'risotto', name: 'Mushroom Risotto', description: 'Creamy risotto with wild mushrooms and parmesan', price: '$19.99', image: 'images/risotto.jpg', category: 'lunch' },

  // Dinner
  { id: 'roast-chicken', name: 'Roast Chicken', description: 'Tender chicken with herbs', price: '$21.99', image: 'images/roast-chicken.jpg', category: 'dinner' },
  { id: 'beef-stew', name: 'Beef Stew', description: 'Slow-cooked beef with vegetables', price: '$24.50', image: 'images/beef-stew.jpg', category: 'dinner' },
  { id: 'grilled-salmon', name: 'Grilled Salmon', description: 'Fresh salmon with lemon butter sauce', price: '$26.00', image: 'images/salmon.jpg', category: 'dinner' },
  { id: 'vegetable-lasagna', name: 'Vegetable Lasagna', description: 'Layers of pasta, vegetables, and cheese', price: '$18.99', image: 'images/vegetable-lasagna.jpg', category: 'dinner' },
  { id: 'lamb-chops', name: 'Lamb Chops', description: 'Juicy lamb chops with rosemary and garlic', price: '$28.50', image: 'images/lamb-chops.jpg', category: 'dinner' },
  { id: 'stuffed-peppers', name: 'Stuffed Peppers', description: 'Bell peppers filled with rice, beef, and herbs', price: '$19.50', image: 'images/stuffed-peppers.jpg', category: 'dinner' },

  // Desserts
  { id: 'tiramisu', name: 'Tiramisu', description: 'Classic Italian dessert with coffee-soaked ladyfingers', price: '$9.99', image: 'images/tiramisu.jpg', category: 'desserts' },
  { id: 'gelato', name: 'Artisan Gelato', description: 'Handcrafted gelato in vanilla, chocolate, or caramel', price: '$7.99', image: 'images/gelato.jpg', category: 'desserts' },
  { id: 'cannoli', name: 'Sicilian Cannoli', description: 'Crispy shells filled with sweet ricotta and chocolate chips', price: '$8.99', image: 'images/cannoli.jpg', category: 'desserts' },
];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<MenuItem['category']>('specials');
  const [activeCategory, setActiveCategory] = useState('specials');

  const navItems = [
    { id: 'specials', label: 'Specials', category: 'specials' },
    { id: 'breakfast', label: 'Breakfast', category: 'breakfast' },
    { id: 'lunch', label: 'Lunch', category: 'lunch' },
    { id: 'dinner', label: 'Dinner', category: 'dinner' },
    { id: 'desserts', label: 'Desserts', category: 'desserts' }
  ] as const;

  const filteredItems = menuData.filter(item => item.category === selectedCategory);

  return (
    <section id="menu" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Our Menu</h2>
          <p className="font-body text-xl text-gray-600">Discover our delicious dishes</p>
        </div>

        {/* Category Navigation */}
        <nav className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
          {navItems.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <div key={item.id} className="relative flex flex-col items-center">
                <button
                  onClick={() => {
                    setActiveCategory(item.id);
                    setSelectedCategory(item.category);
                  }}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'bg-orange-600 text-white' : 'text-gray-500 hover:text-orange-600'
                  }`}
                >
                  {item.label}
                </button>
                {isActive && (
                  <span
                    className="pointer-events-none absolute -bottom-2 w-0 h-0 border-l-transparent border-r-transparent border-t-orange-600"
                    style={{ borderLeftWidth: '6px', borderRightWidth: '6px', borderTopWidth: '6px' }}
                  />
                )}
              </div>
            );
          })}
        </nav>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative h-80 rounded-xl overflow-hidden shadow-lg cursor-pointer"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay with Info */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4">
                <h3 className="text-white font-display text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-white text-sm mb-4">{item.description}</p>
                <span className="bg-orange-600 text-white px-4 py-1 rounded-lg font-semibold">{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}