import React from 'react'
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
   
    <main className="text-center pt-12">
      <h2 className="text-4xl font-bold text-amber-500">Discover the Best Deals on Your Favorite Products!</h2>
      <p className="text-gray-400 mt-4">Shop the latest trends and get exclusive discounts</p>
      <Link to="/product" className="mt-6 inline-block bg-amber-600 px-6 py-3 rounded-lg text-lg font-semibold hover:bg-amber-500 transition">Shop Now</Link>
    </main>
  </div>
  )
}

export default Home
