import { useState } from "react";
import { useCart } from "../context/useCart";

export default function CartPage() {
  const { cartItems, addToCart, decreaseQuantity, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        {/* GIF Animation */}
       <img
  src="/animations/success.gif"
  alt="Order Success"
  className="w-48 h-48 mb-6"
/>
        <h2 className="text-2xl font-bold text-green-600">
          Order Confirmed! 🎉
        </h2>
        <p className="text-gray-600 mt-2">
          Your food is on the way 🚀 <br />
          Sit back and relax while we deliver happiness.
        </p>
        <button
          onClick={() => setOrderPlaced(false)}
          className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Back to Restaurants
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Add some food!</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-4"
              >
                {/* Food Image */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg bg-gray-200"
                    onError={(e) => (e.target.src = "/images/placeholder.png")}
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-3 py-1 bg-gray-300 rounded-lg"
                  >
                    –
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="px-3 py-1 bg-orange-500 text-white rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total and Buttons */}
          <div className="mt-8 text-right">
            <h3 className="text-xl font-bold">
              Total: ₹{totalPrice.toFixed(2)}
            </h3>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={clearCart}
                className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Clear Cart
              </button>
              <button
                onClick={handlePlaceOrder}
                className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
