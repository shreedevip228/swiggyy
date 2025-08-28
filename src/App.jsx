import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import RestaurantList from "./components/RestaurantList";
import Footer from "./components/Footer";
import CartPage from "./context/CartPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <RestaurantList />
            </>
          }
        />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
