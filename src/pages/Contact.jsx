import React from 'react'

const Contact = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-10">
      <h2 className="text-4xl font-bold text-amber-500 text-center">Contact Us</h2>
      <p className="text-gray-400 mt-6 text-center">Have questions? We're here to help!</p>
      <form className="max-w-lg mx-auto mt-8">
        <input type="text" placeholder="Your Name" className="block w-full p-3 bg-gray-800 text-white rounded-md mb-4" />
        <input type="email" placeholder="Your Email" className="block w-full p-3 bg-gray-800 text-white rounded-md mb-4" />
        <textarea placeholder="Your Message" className="block w-full p-3 bg-gray-800 text-white rounded-md mb-4"></textarea>
        <button className="w-full bg-amber-600 p-3 rounded-md text-lg font-semibold hover:bg-amber-500 transition">Send Message</button>
      </form>
    </div>
  )
}

export default Contact
