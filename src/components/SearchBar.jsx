import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch, onSort }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-10 px-6">
      
      {/* Search Input */}
      <div className="relative w-full md:w-2/3 lg:w-1/2">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          value={searchText}
          onChange={handleSearch}
          placeholder="Search for restaurants or dishes..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-orange-500 
                     hover:border-orange-400 transition"
        />
      </div>

      {/* Sort Dropdown */}
      <div className="w-full md:w-auto">
        <select
          onChange={(e) => onSort(e.target.value)}
          className="w-full md:w-auto px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-orange-500 
                     hover:border-orange-400 transition cursor-pointer"
        >
          <option value="">Sort By</option>
          <option value="rating">⭐ Rating (High → Low)</option>
          <option value="priceLow">💰 Price (Low → High)</option>
          <option value="priceHigh">💰 Price (High → Low)</option>
        </select>
      </div>
    </div>
  );
}
