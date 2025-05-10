import React, { useState, useEffect } from "react";
import { useLocation, NavLink, Link } from "react-router-dom";
import Search from "./Search";
import ProductData from "../utils/api.js";
import { useParams } from "react-router-dom";
const Navbar = ({ cart, setData, items }) => {
  const { id } = useParams();
  const location = useLocation(); // Get current route
  const [product, setProduct] = useState([]);

  useEffect(() => {
    ProductData().then((fetchedData) => {
      setProduct(fetchedData);
    });
  }, []);

  function convertToDays(isoString) {
    const givenDate = new Date(isoString);
    const currentDate = new Date();
    return Math.floor((currentDate - givenDate) / (1000 * 60 * 60 * 24));
  }

  function HandlingCategoryDropdown(query) {
    let filteredData = product.filter((item) => item.category === query);
    setData(query !== "all" ? filteredData : product);
  }

  function HandlingSortingDropdown(query) {
    let sortedData = [...product];
    if (query === "price: high to low") {
      sortedData.sort((a, b) => b.price - a.price);
    } else if (query === "price: low to high") {
      sortedData.sort((a, b) => a.price - b.price);
    } else if (query === "newest") {
      sortedData.sort(
        (a, b) =>
          convertToDays(a.meta.createdAt) - convertToDays(b.meta.createdAt)
      );
    } else if (query === "best rated") {
      sortedData.sort((a, b) => b.rating - a.rating);
    }
    setData(sortedData);
  }

  function HandlingPriceRangeDropdown(query) {
    let data = [...product];
    if (query === "under $50") setData(data.filter((item) => item.price < 50));
    if (query === "$50 - $100")
      setData(data.filter((item) => item.price >= 50 && item.price <= 100));
    if (query === "$100 - $500")
      setData(data.filter((item) => item.price >= 100 && item.price <= 500));
    if (query === "above $500")
      setData(data.filter((item) => item.price > 500));
  }

  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-10 h-10 text-white p-2 bg-purple-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl cursor-pointer">Shoppi</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <NavLink className="mr-5 hover:text-white cursor-pointer" to={"/"}>
            Home
          </NavLink>
          <NavLink
            className="mr-5 hover:text-white cursor-pointer"
            to={"/product"}
          >
            Product
          </NavLink>
          <NavLink className="mr-5 hover:text-white cursor-pointer" to={"/about"}>
            About Us
          </NavLink>
          <NavLink className="mr-5 hover:text-white cursor-pointer" to={"/contact"}>
            Contact Us
          </NavLink>
        </nav>
      <Search setData={setData} cart={cart} />
      </div>

      {/* Hide Filter Buttons on Cart Page */}
      {!(
        location.pathname === "/cart" ||
        location.pathname === "/" ||
        location.pathname === "/about" ||
        location.pathname === "/contact" ||
        location.pathname.includes("/productDetails")
      ) && (
        <div className="flex px-20 items-center flex-wrap justify-between gap-4 p-4 bg-gray-900 rounded-xl shadow-md text-white">
          {/* Category Dropdown */}
          <div className="flex gap-2 items-center">
            <label htmlFor="category" className="text-sm">
              Category:
            </label>
            <select
              id="category"
              onChange={(e) =>
                HandlingCategoryDropdown(e.target.value.toLowerCase().trim())
              }
              className="p-2 rounded-lg bg-gray-700 text-white"
            >
              <option>All</option>
              <option>Beauty</option>
              <option>Fragrances</option>
              <option>Furniture</option>
              <option>Groceries</option>
            </select>
          </div>

          {/* Sorting Dropdown */}
          <div className="flex gap-2 items-center">
            <label htmlFor="sorting" className="text-sm">
              Sort By:
            </label>
            <select
              id="sorting"
              onChange={(e) =>
                HandlingSortingDropdown(e.target.value.toLowerCase().trim())
              }
              className="p-2 rounded-lg bg-gray-700 text-white"
            >
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
              <option>Best Rated</option>
            </select>
          </div>

          {/* Price Range Dropdown */}
          <div className="flex gap-2 items-center">
            <label htmlFor="price" className="text-sm">
              Price Range:
            </label>
            <select
              id="price"
              onChange={(e) =>
                HandlingPriceRangeDropdown(e.target.value.toLowerCase().trim())
              }
              className="p-2 rounded-lg bg-gray-700 text-white"
            >
              <option>Under $50</option>
              <option>$50 - $100</option>
              <option>$100 - $500</option>
              <option>Above $500</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
