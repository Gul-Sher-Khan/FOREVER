import React, { useState } from "react";

const ProductUpload = () => {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    sizes: [],
    images: [],
  });

  const [sizeInput, setSizeInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleAddSize = () => {
    if (sizeInput && !productData.sizes.includes(sizeInput)) {
      setProductData({
        ...productData,
        sizes: [...productData.sizes, sizeInput],
      });
      setSizeInput("");
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setProductData({
      ...productData,
      images: [...productData.images, ...imagePreviews],
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = productData.images.filter((_, i) => i !== index);
    setProductData({ ...productData, images: updatedImages });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted product data: ", productData);
    // Clear form after submission
    setProductData({
      name: "",
      category: "",
      price: "",
      description: "",
      sizes: [],
      images: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 sm:p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-4 sm:p-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center">
          Upload a New Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 mt-1 text-xs sm:text-base focus:ring focus:ring-black focus:outline-none"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Category and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 mt-1 text-xs sm:text-base focus:ring focus:ring-black focus:outline-none"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Clothing">Clothing</option>
                <option value="Electronics">Electronics</option>
                <option value="Home Appliances">Home Appliances</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 mt-1 text-xs sm:text-base focus:ring focus:ring-black focus:outline-none"
                placeholder="Enter price"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 mt-1 text-xs sm:text-base focus:ring focus:ring-black focus:outline-none"
              placeholder="Write a brief description"
              rows={4}
            />
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Available Sizes
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 mt-2">
              <input
                type="text"
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
                className="w-full sm:flex-1 border border-gray-300 rounded-lg p-2 sm:p-3 text-xs sm:text-base focus:ring focus:ring-black focus:outline-none"
                placeholder="Add a size (e.g., S, M, L)"
              />
              <button
                type="button"
                onClick={handleAddSize}
                className="w-full sm:w-auto bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-600 text-xs sm:text-base"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {productData.sizes.map((size, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg shadow"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700">
              Product Images
            </label>
            <div className="mt-2">
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="block w-full text-xs sm:text-sm text-gray-500 
                file:mr-2 sm:file:mr-4 
                file:py-1 sm:file:py-2 
                file:px-2 sm:file:px-4 
                file:rounded-lg file:border-0 
                file:bg-blue-50 file:text-blue-700 
                hover:file:bg-blue-100"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mt-4">
              {productData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt="Product"
                    className="w-full h-20 sm:h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 sm:top-2 right-1 sm:right-2 
                    bg-red-500 text-white p-1 text-xs rounded-full hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-600 text-xs sm:text-base"
            >
              Upload Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductUpload;
