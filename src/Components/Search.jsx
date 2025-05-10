import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ProductData from "../utils/api.js";
import { IoCartOutline } from "react-icons/io5";

const Search = ({ setData, cart }) => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate(); // ✅ For navigation

  useEffect(() => {
    ProductData().then((fetchedData) => {
      setProduct(fetchedData);
    });
  }, []);

  function handleSearch(query) {
    let data = product.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
    setData(data);
    navigate("/product"); // ✅ Redirect to product page
  }

  return (
    <div className="flex gap-4 items-center">
      {/* Search Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const searchValue = e.target.elements.searchInput.value;
          handleSearch(searchValue.toLowerCase().trim());
        }}
        className="flex items-center bg-gray-800 rounded-lg overflow-hidden"
      >
        <input
          type="text"
          name="searchInput"
          placeholder="Search..."
          className="p-2 bg-gray-700 text-white focus:outline-none"
        />
        <button type="submit" className="p-2 bg-gray-700 hover:bg-gray-600 text-white">
          <i className="fa-solid fa-magnifying-glass" />
        </button>
      </form>

      {/* Cart Icon with Counter */}
      <div className="relative">
        <NavLink to="/cart" className="text-5xl">
          <IoCartOutline />
        </NavLink>
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold py-1 px-2 rounded-full">
            {cart.length}
          </span>
        )}
      </div>
    </div>
  );
};

export default Search;
