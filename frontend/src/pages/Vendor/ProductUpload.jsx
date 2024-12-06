import { useState } from "react";

const ProductUpload = ({ onProductUpload }) => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    sizes: [],
    images: [],
  });
  const [sizeInput, setSizeInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleAddSize = () => {
    if (sizeInput) {
      setProduct({ ...product, sizes: [...product.sizes, sizeInput] });
      setSizeInput("");
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProduct({
      ...product,
      images: [
        ...product.images,
        ...files.map((file) => URL.createObjectURL(file)),
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onProductUpload(product);
    setProduct({ name: "", price: "", sizes: [], images: [] });
  };

  return (
    <div className="p-6 sm:p-10 border-t">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
        Product Upload
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="w-full border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Sizes</label>
          <div className="flex items-center">
            <input
              type="text"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              className="w-full border-gray-300 rounded-md focus:ring focus:ring-blue-500 focus:ring-opacity-50 mr-2"
            />
            <button
              type="button"
              onClick={handleAddSize}
              className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <div className="mt-2">
            {product.sizes.map((size, index) => (
              <span
                key={index}
                className="text-sm bg-gray-200 px-2 py-1 rounded-md mr-2"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <div className="mt-2 grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="Preview"
                className="w-full h-20 object-cover rounded-md"
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Upload Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductUpload;
