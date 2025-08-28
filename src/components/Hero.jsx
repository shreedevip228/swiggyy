import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-orange-100 to-orange-50 py-12 md:py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
        
        {/* Left Text Section */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6 }}
          className="max-w-lg text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Craving something? <br />
            <span className="text-orange-600">Order it now!</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Fresh food from top restaurants, delivered lightning fast to your doorstep.
          </p>

          <Link 
            to="/restaurants"
            className="mt-6 inline-block bg-orange-600 text-white px-6 py-3 rounded-xl shadow hover:bg-orange-700 transition"
          >
            Explore Restaurants
          </Link>
        </motion.div>

        {/* Right Image Section */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 md:mt-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80" 
            alt="Delicious food" 
            className="rounded-2xl shadow-lg w-full max-w-md"
          />
        </motion.div>
      </div>
    </section>
  );
}

