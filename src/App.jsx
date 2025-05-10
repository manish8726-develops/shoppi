import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Product from "./pages/Product";
import ErrorPage from "./pages/Error";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./Components/Search";
import ProductDetails from "./pages/ProductDetails";
import ProductData from "./utils/api.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

const App = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    ProductData().then((fetchedData) => {
      setData(fetchedData);
    });
  }, []); // Runs only once on mount

  return (
    <>
      <Router>
        <Navbar cart={cart} setData={setData} items={data} />

        {/* ToastContainer should only appear once at the root level */}
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover={false} // Prevents it from sticking
          pauseOnFocusLoss={false} // Dismiss even if user switches tab
          draggable
          theme="dark"
        />

        <Routes>
          <Route element={<Home cart={cart} setCart={setCart} items={data} />} path="/" />
          <Route element={<Product cart={cart} setCart={setCart} items={data} />} path="/product" />
          <Route element={<ProductDetails cart={cart} setCart={setCart} />} path="/productDetails/:id" />
          <Route element={<Search cart={cart} setCart={setCart} />} path="/search/:term" />
          <Route element={<Cart cart={cart} setCart={setCart} />} path="/cart" />
          <Route element={<ErrorPage />} path="*" />
          <Route element={<About />} path="/about" />
          <Route element={<Contact />} path="/contact" />
        </Routes>

        <Footer />
      </Router>
    </>
  );
};

export default App;
