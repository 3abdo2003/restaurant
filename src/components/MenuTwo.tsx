'use client';

import { useEffect, useRef, useState } from 'react';
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

const MenuTwo = () => {
  const [selectedCategory, setSelectedCategory] = useState<MenuItem['category']>('specials');
  const [activeCategory, setActiveCategory] = useState('specials');
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const navScrollRef = useRef<HTMLDivElement | null>(null);

  const navItems = [
    { id: 'specials', label: 'Specials', category: 'specials' },
    { id: 'breakfast', label: 'Breakfast', category: 'breakfast' },
    { id: 'lunch', label: 'Lunch', category: 'lunch' },
    { id: 'dinner', label: 'Dinner', category: 'dinner' },
    { id: 'desserts', label: 'Desserts', category: 'desserts' }
  ] as const;

  const filteredItems = menuData.filter(item => item.category === selectedCategory);

  const handleItemClick = (id: string) => {
    setActiveItem(prev => (prev === id ? null : id));
  };

  const handleCategoryClick = (category: string, categoryType: MenuItem['category']) => {
    setActiveCategory(category);
    setSelectedCategory(categoryType);
    setActiveItem(null);
  };

  // Auto-center active pill
  useEffect(() => {
    const container = navScrollRef.current;
    if (!container) return;
    const activeEl = container.querySelector<HTMLButtonElement>(`#cat-${activeCategory}`);
    if (!activeEl) return;
    activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeCategory]);

  return (
    <section id="menu-two" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.2em] text-gray-400">MENU</p>
          <h2 className="mt-2 font-display text-4xl font-bold text-gray-900">
            Our <span className="text-orange-500">Menu</span>
          </h2>
          <p className="font-body text-xl text-gray-600 mt-4">Hover to preview the dish card</p>
        </div>

        {/* Category Navigation — horizontal only, no vertical scroll */}
        <div
          ref={navScrollRef}
          className="
            mb-12
            overflow-x-auto md:overflow-x-visible
            overflow-y-hidden md:overflow-y-visible
            whitespace-nowrap
            [touch-action:pan-x]  /* lock touch to horizontal */
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            snap-x snap-mandatory md:snap-none
            px-1 md:px-0 pb-3   /* pb gives room for the arrow so it doesn't trigger Y-scroll */
          "
          role="tablist"
          aria-label="Menu categories"
        >
          <nav className="flex md:flex-wrap justify-start md:justify-center gap-4 md:gap-6 w-max md:w-auto">
            {navItems.map((item) => {
              const isActive = activeCategory === item.id;
              return (
                <div key={item.id} className="relative flex flex-col items-center flex-shrink-0 snap-start">
                  <button
                    id={`cat-${item.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${item.id}`}
                    onClick={() => handleCategoryClick(item.id, item.category)}
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
        </div>

        {/* Menu Items */}
        <div
          id={`panel-${activeCategory}`}
          role="tabpanel"
          aria-labelledby={`cat-${activeCategory}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item, index) => {
            const isActiveCard = activeItem === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="group relative h-80 rounded-xl overflow-hidden shadow-lg cursor-pointer"
              >
                {/* Background Image */}
                <Image
                  src={`/${item.image}`}
                  alt={item.name}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Dim/blur layer */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 backdrop-blur-[2px] ${
                    isActiveCard ? 'opacity-100 bg-black/40' : 'opacity-0 group-hover:opacity-100 bg-black/30'
                  }`}
                />

                {/* Clean Product Card */}
                <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
                  <div
                    className={`
                      w-full max-w-xs rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 p-5 text-left
                      transition-all duration-300 transform
                      ${isActiveCard
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0'}
                    `}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold text-gray-900">{item.name}</h3>
                      <span className="shrink-0 rounded-lg bg-orange-600 px-2.5 py-1 text-sm font-semibold text-white">
                        {item.price}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuTwo;
