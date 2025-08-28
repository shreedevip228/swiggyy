import { useState } from "react";
import MenuModal from "./MenuModal";

export default function RestaurantCard({ restaurant }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
  <img
    src={restaurant.image}
    alt={restaurant.name}
    className="w-full h-40 object-cover rounded-t-xl"
    onError={(e) => (e.target.src = "/images/placeholder.png")}
  />
  <div className="p-4">
    <h3 className="text-lg font-bold">{restaurant.name}</h3>
    <p className="text-sm text-gray-600">{restaurant.cuisines?.join(", ")}</p>
    <p className="mt-2 text-orange-500 font-semibold">⭐ {restaurant.rating}</p>
    <p className="text-sm text-gray-500">
      ⏱ {restaurant.deliveryTime} mins • 💰 ₹{restaurant.costForTwo} for two
    </p>
    <button
      className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
      onClick={() => setOpen(true)}
    >
      View Menu
    </button>
  </div>

  {open && <MenuModal restaurant={restaurant} onClose={() => setOpen(false)} />}
</div>


  );
}
