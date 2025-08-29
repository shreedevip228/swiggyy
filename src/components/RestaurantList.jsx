import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";

export default function RestaurantsList() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState(""); // ⭐ new state

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:3001/restaurants");
        if (!response.ok) throw new Error("Failed to fetch restaurants");
        const data = await response.json();
        setRestaurants(data);
        setFilteredRestaurants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // 🔍 search filter
  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    let results = restaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(lowerQuery) ||
        r.cuisine?.toLowerCase().includes(lowerQuery)
    );

    // 📌 Apply sorting
    if (sortOption === "name") {
      results = [...results].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "rating") {
      results = [...results].sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "time") {
      results = [...results].sort((a, b) => a.deliveryTime - b.deliveryTime);
    }

    setFilteredRestaurants(results);
  }, [searchQuery, sortOption, restaurants]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading restaurants...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">⚠ {error}</p>;
  }

  return (
    <section id="restaurants" className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Restaurants Near You</h2>

      {/* 🔍 Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or cuisine..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Sort by</option>
          <option value="name">Name (A–Z)</option>
          <option value="rating">Rating (High → Low)</option>
          <option value="time">Delivery Time (Fastest)</option>
        </select>
      </div>

      {/* Restaurant Cards */}
      {filteredRestaurants.length === 0 ? (
        <p className="text-center text-gray-500">No restaurants found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </section>
  );
}
