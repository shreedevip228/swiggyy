import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/useCart";

export default function MenuModal({ restaurant, onClose }) {
  const [items, setItems] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { cartItems, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!restaurant) return;
    
    setIsLoading(true);
    fetch(`http://localhost:3001/menu?restaurantId=${restaurant.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (isMounted) {
          setItems(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setItems([]);
          setIsLoading(false);
        }
      });
  }, [restaurant, isMounted]);

  if (!restaurant) return null;

  // Filter
  let filteredItems = [...items];
  if (categoryFilter) {
    filteredItems = filteredItems.filter(
      (item) => item.category?.toLowerCase() === categoryFilter.toLowerCase()
    );
  }

  // Sort
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOption === "priceLow") return a.price - b.price;
    if (sortOption === "priceHigh") return b.price - a.price;
    if (sortOption === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  // Categories
  const categories = [...new Set(items.map((i) => i.category))];

  return (
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="w-full max-w-2xl rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 border-b flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">{restaurant.name}</h2>
              <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
              <p className="mt-1 text-xs text-gray-400">
                {items.length} items available
              </p>
            </div>
            <button
              className="text-gray-400 hover:text-black text-xl transition-colors"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-3 p-4 border-b bg-gray-50">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
            >
              <option value="">Sort</option>
              <option value="priceLow">Price (Low → High)</option>
              <option value="priceHigh">Price (High → Low)</option>
              <option value="name">Name (A → Z)</option>
            </select>
          </div>

          {/* Menu List */}
          <div className="overflow-y-auto flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-pulse text-gray-500">Loading menu...</div>
              </div>
            ) : (
              <ul className="p-4 grid gap-4">
                {sortedItems.map((m) => {
                  const inCart = cartItems.some((c) => c.id === m.id);

                  return (
                    <motion.li
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-4 p-4 rounded-xl shadow-sm border hover:shadow-md transition"
                    >
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{m.name}</p>
                        <p className="text-sm text-gray-500">
                          {m.category} • ₹{m.price}
                        </p>
                      </div>

                      {inCart ? (
                        <button
                          className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors flex-shrink-0"
                          onClick={() => removeFromCart(m.id)}
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          className="px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors flex-shrink-0"
                          onClick={() =>
                            addToCart({
                              id: m.id,
                              name: m.name,
                              price: m.price,
                              image: m.image,
                            })
                          }
                        >
                          Add
                        </button>
                      )}
                    </motion.li>
                  );
                })}

                {sortedItems.length === 0 && !isLoading && (
                  <li className="p-6 text-center text-gray-500">
                    No items in this category
                  </li>
                )}
              </ul>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}