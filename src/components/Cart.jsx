//import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/useCart";

export default function Cart({ isOpen, onClose }) {
  const { cartItems, addToCart, decreaseQuantity, clearCart } = useCart();

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 p-4 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-black">
                ✕
              </button>
            </div>

            {/* Cart Items */}
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">Your cart is empty 🍽️</p>
            ) : (
              <div className="flex-1 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-3 border-b"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 bg-gray-300 rounded"
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        –
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 bg-orange-500 text-white rounded"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>₹{total}</span>
                </div>
                <button
                  onClick={clearCart}
                  className="w-full mt-3 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
