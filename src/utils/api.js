const fetchProductData = async (category = '') => {
    try {
        let response = await fetch(`https://dummyjson.com/products`);

        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }

        let data = await response.json();
        return data.products; // Return the product array directly
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
        return []; // Return an empty array in case of error
    }
};

export default fetchProductData;
