import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ProductData from '../utils/api.js';
import { toast } from "react-toastify"; // Only import toast, NOT ToastContainer

const ProductDetails = ({ cart, setCart }) => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    ProductData().then((fetchedData) => {
      setData(fetchedData);
    });
  }, []);

  let pageData = data.find(item => item.id == id);

  function handleCart(image, category, title, price, id) {
    let obj = { image, category, title, price, id };

    toast.dismiss(); // Dismiss any existing toast before showing a new one

    if (!cart.some(item => item.id === id)) {
      setCart([...cart, obj]);
      
      toast.success('Item added to cart!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        theme: "dark",
      });
    } else {
      toast.info('Item already in cart!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        theme: "dark",
      });
    }
  }

  return (
    <>
      {pageData ? (
        <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
          <div className="container px-5 py-2 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="product"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={pageData.thumbnail || "https://dummyimage.com/400x400"}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {pageData.category || "Category"}
                </h2>
                <h1 className="text-white text-3xl title-font font-medium mb-1">
                  {pageData.title || "No Title Available"}
                </h1>
                <p className="leading-relaxed">
                  {pageData.description || "No description available."}
                </p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-800 mb-5">
                  <span className="mr-3">Color</span>
                  <button className="border-2 border-gray-800 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-800 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-800 ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none"></button>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-white">
                    ${pageData.price || "0.00"}
                  </span>
                  <button
                    onClick={() => handleCart(pageData.thumbnail, pageData.category, pageData.title, pageData.price, pageData.id)}
                    className={`flex ml-auto text-white border-0 py-2 px-6 focus:outline-none rounded ${
                      cart.some(item => item.id == id) ? "bg-amber-600" : "bg-purple-500 hover:bg-purple-600"
                    }`}
                  >
                    {cart.some(item => item.id == id) ? 'Added to cart' : 'Add to cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p className="text-center text-3xl bg-[#101828] text-white pt-7 pb-[100vh]">Loading...</p>
      )}
    </>
  );
};

export default ProductDetails;
