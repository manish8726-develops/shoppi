import { FaTrash } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import React, { useState, useEffect } from "react";

const Cart = ({ cart, setCart }) => {
  // ✅ Store cart total in state
  const [cartTotal, setCartTotal] = useState(0);

  // ✅ Ensure totalAmt is properly initialized on page load
  useEffect(() => {
    const updatedCart = cart.map((item) => ({
      ...item,
      quantity: item.quantity || 1, // Default quantity = 1 if not set
      totalAmt: (item.price || 0) * (item.quantity || 1), // Ensure totalAmt is valid
    }));
    setCart(updatedCart); // Update cart state
  }, []); // Run only once on mount

  // ✅ Update cart total whenever cart changes
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.totalAmt || 0), 0);
    setCartTotal(total);
  }, [cart]); // Depend on cart changes

  // ✅ Delete item from cart
  function deleteItem(product) {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
  }

  // ✅ Handle quantity changes safely
  function handleQuantityChange(product, qty) {
    qty = Number(qty);

    const updatedCart = cart.map((item) => {
      if (item.id === product.id) {
        const price = item.price || 0;
        return {
          ...item,
          quantity: qty || 1, // Ensure at least 1
          totalAmt: price * (qty || 1),
        };
      }
      return item;
    });

    setCart(updatedCart);
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 lg:px-12 bg-white">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">🛒 Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* ✅ Cart Items Section */}
        <div className="lg:col-span-2 space-y-8">
          {cart.length > 0 ? (
            cart.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-24 h-24 rounded-lg object-cover border-2 border-amber-500"
                  />
                  <div className="ml-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <p className="text-base font-bold text-amber-600 mt-2">
                      ${product.price}
                    </p>
                    <div className="flex items-center mt-2">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span className="text-sm text-gray-500">
                        {product.availabilityStatus || "In Stock"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <select
                    value={product.quantity || 1}
                    onChange={(e) =>
                      handleQuantityChange(product, e.target.value)
                    }
                    className="border border-gray-300 rounded-md p-2 text-gray-900 bg-white shadow-md"
                  >
                    {[...Array(10).keys()].map((n) => (
                      <option key={n + 1} value={n + 1}>
                        {n + 1}
                      </option>
                    ))}
                  </select>
                  <FaTrash
                    onClick={() => deleteItem(product)}
                    className="text-red-500 hover:text-red-700 ml-4 cursor-pointer text-xl transition"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>

        {/* ✅ Order Summary */}
        <div className="bg-amber-100 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900 font-bold">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Shipping Estimate</span>
              <span className="text-gray-900 font-bold">$5.00</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Tax Estimate</span>
              <span className="text-gray-900 font-bold">$8.32</span>
            </div>

            <div className="flex justify-between border-t border-gray-300 pt-4">
              <span className="text-xl font-bold text-gray-900">Total</span>
              <span className="text-xl font-bold text-amber-600">
                ${(cartTotal + 5 + 8.32).toFixed(2)}
              </span>
            </div>
          </div>

          <button className="w-full mt-6 bg-amber-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-amber-500 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
