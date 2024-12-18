import { useContext, useState, useEffect } from "react";
import RelatedProducts from "../../components/User/RelatedProducts";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import { assets } from "../../assets/assets";
import axiosInstance from "../../Utils/axiosInstance";
const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    axiosInstance.get(`/products/${productId}`).then(
      (res) => {
        setProductData(res.data);
        setImage(res.data.image);
        setSize(res.data.sizes[0]);
      },
      [productId]
    );
  };

  const addToWishlist = () => {
    axiosInstance.post("/wishlist", { productId: productId });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 ">
      {/* ----------------- Product Data ----------------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* ----------------- Product Images ----------------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:jusitify-normal sm:w-[18.7%] w-full">
            <img
              onClick={() => setImage(productData.image)}
              src={productData.image}
              alt={productData.title}
              className="w-[24%] sm:w-full  sm:mb-3 flex-shrink-0 cursor-pointer "
            />
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* ----------Product Info--------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-4 ">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4  bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <button
            onClick={addToWishlist}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 ml-10"
          >
            ADD TO WISHLIST
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product </p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex ">
          <b className="border py-3 px-5 text-sm">Description</b>
          <p className="border py-3 px-5 text-sm">Reviews(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 ">
          <p>
            Crafted from soft, breathable cotton, this t-shirt offers a
            comfortable fit perfect for everyday wear. Its minimalist design
            makes it versatile enough to pair with jeans or layer under jackets,
            keeping your style on point effortlessly. Durable stitching ensures
            lasting quality, making it a must-have for your wardrobe.
          </p>
          <p>
            These slim-fit jeans combine modern tailoring with stretch fabric,
            providing comfort and a flattering fit. The classic five-pocket
            design is both stylish and functional, making them suitable for
            casual outings or semi-formal settings.
          </p>
        </div>
      </div>

      {/* ----------------- Related Products ----------------- */}
      <RelatedProducts id={productData._id} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
