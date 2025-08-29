import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/useCart";
import { ShoppingCart, Home, Utensils } from "lucide-react"; // using lucide-react icons
import { useState } from "react";

export default function Navbar() {
  const { cartItems = [] } = useCart() || {};
  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" alt="logo" className="w-8 h-8" />
          <span className="text-2xl font-bold text-orange-600">Swiggy</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center font-medium">
          <NavLink 
            to="/" 
            className={({ isActive }) =>
              `flex items-center gap-2 hover:text-orange-600 transition ${
                isActive ? "text-orange-600" : "text-gray-700"
              }`
            }
          >
            <Home size={18} /> Home
          </NavLink>

          <NavLink 
            to="/restaurants" 
            className={({ isActive }) =>
              `flex items-center gap-2 hover:text-orange-600 transition ${
                isActive ? "text-orange-600" : "text-gray-700"
              }`
            }
          >
            <Utensils size={18} /> Restaurants
          </NavLink>

          <NavLink 
            to="/cart" 
            className="relative flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            <ShoppingCart size={18} />
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                {totalItems}
              </span>
            )}
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg flex flex-col px-6 py-4 gap-4">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <Link to="/restaurants" className="hover:text-orange-600">Restaurants</Link>
          <Link to="/cart" className="relative hover:text-orange-600">
            Cart
            {totalItems > 0 && (
              <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
}
