import React from "react";
import ProductCard from "../Components/ProductCard";
import { h1 } from "framer-motion/client";

const Product = ({ items, setCart, cart }) => {
  return (
    <>
      {items && items.length > 0 ? (
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {items.map((product) => (
                <ProductCard
                  setCart={setCart}
                  cart={cart}
                  key={product.id}
                  id={product.id}
                  image={product.thumbnail}
                  category={product.category}
                  title={product.title}
                  price={product.price}
                />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <p className="text-center text-3xl bg-[#101828] text-white pt-7 pb-[100vh]">
          Loading...
        </p>
      )}
    </>
  );
};

export default Product;
