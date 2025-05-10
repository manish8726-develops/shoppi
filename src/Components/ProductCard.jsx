import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ image, category, title, price, id, setCart, cart }) => {
  function handleCart(image, category, title, price, id) {
    let obj = { image, category, title, price, id };

    if (!cart.some((item) => item.id === id)) {
      setCart([...cart, obj]);
      toast.success("Item added to cart", {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
      });
    } else {
      toast.info("Item already in cart", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
      });
    }
  }

  return (
    <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
      {/* {console.log(product.thumbnail)} */}
      <div className="bg-gray-900 p-4 rounded-lg shadow-md h-full flex flex-col">
        {/* ✅ Clickable Image */}
        <Link to={`/productDetails/${id}`} className="block relative h-48 rounded overflow-hidden">
          <img
            draggable={false}
            alt={title}
            className="object-contain object-center w-full h-full block bg-white"
            src={image}
          />
        </Link>

        {/* ✅ Product Details (Fixed Height) */}
        <div className="mt-4 flex-grow">
          <Link to={`/productDetails/${id}`}>
            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
              {category}
            </h3>
            <h2 className="text-white text-lg font-medium line-clamp-2 h-12">
              {title}
            </h2>
            <p className="mt-1 text-amber-400 font-bold">${price.toFixed(2)}</p>
          </Link>
        </div>

        {/* ✅ Button (Fixed Position) */}
        <button
          onClick={() => handleCart(image, category, title, price, id)}
          className={`mt-3 px-4 py-2 rounded-lg w-full text-center transition ${
            cart.some((item) => item.id === id)
              ? "bg-amber-600 text-white"
              : "bg-gray-700 hover:bg-gray-600 text-white"
          }`}
        >
          {cart.some((item) => item.id === id) ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
