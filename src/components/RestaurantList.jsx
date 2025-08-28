import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import SearchBar from "./SearchBar"; // ✅ import the new component

export default function RestaurantsList() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");

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

  // apply search, filter, and sort
  useEffect(() => {
    let results = [...restaurants];

    // search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      results = results.filter(
        (r) =>
          r.name.toLowerCase().includes(lowerQuery) ||
          r.cuisine?.toLowerCase().includes(lowerQuery)
      );
    }

    // filter by category
    if (selectedCategory) {
      results = results.filter(
        (r) => r.cuisine?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // sort
    if (sortOption === "rating") {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "priceLow") {
      results.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHigh") {
      results.sort((a, b) => b.price - a.price);
    }

    setFilteredRestaurants(results);
  }, [searchQuery, selectedCategory, sortOption, restaurants]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading restaurants...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">⚠ {error}</p>;
  }

  return (
    <section id="restaurants" className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Restaurants Near You</h2>

      {/* ✅ Use Enhanced SearchBar */}
      <SearchBar
        onSearch={(value) => setSearchQuery(value)}
        onFilter={(value) => setSelectedCategory(value)}
        onSort={(value) => setSortOption(value)}
      />

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
