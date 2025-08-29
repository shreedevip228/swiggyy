import { useEffect, useState } from "react";
import { useCart } from "../context/useCart";

export default function MenuModal({ restaurant, onClose }) {
  const [items, setItems] = useState([]);
  const { cartItems, addToCart, removeFromCart } = useCart(); // ✅ use cartItems

  useEffect(() => {
    if (!restaurant) return;
    fetch(`http://localhost:3001/menu?restaurantId=${restaurant.id}`)
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]));
  }, [restaurant]);

  if (!restaurant) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <div>
            <h2 className="text-xl font-semibold">{restaurant.name}</h2>
            <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
          </div>
          <button className="text-gray-500 hover:text-black" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Menu List */}
        <ul className="divide-y">
          {items.map((m) => {
            const inCart = cartItems.some((c) => c.id === m.id); // ✅ fixed

            return (
              <li key={m.id} className="p-4 flex items-center gap-4">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{m.name}</p>
                  <p className="text-sm text-gray-500">₹{m.price}</p>
                </div>

                {inCart ? (
                  <button
                    className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700"
                    onClick={() => removeFromCart(m.id)}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    className="px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700"
                    onClick={() =>
                      addToCart({ id: m.id, name: m.name, price: m.price, image: m.image })
                    }
                  >
                    Add
                  </button>
                )}
              </li>
            );
          })}

          {items.length === 0 && (
            <li className="p-6 text-center text-gray-500">No items</li>
          )}
        </ul>
      </div>
    </div>
  );
}
