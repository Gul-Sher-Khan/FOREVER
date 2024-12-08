import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "../../components/User/Title";
import ProductItem from "../../components/User/ProductItem";
import { products } from "../../assets/assets";
import axiosInstance from "../../Utils/axiosInstance";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  const getProducts = () => {
    axiosInstance.get("/wishlist").then(
      (res) => {
        setWishlist(res.data.products);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const removeFromWishlist = (id) => {
    axiosInstance.patch("/wishlist/remove", { productId: id }).then(
      (res) => {
        getProducts();
      },
      (error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="pt-10 border-t">
      {/* Page Header */}
      <div className="flex justify-between text-base sm:text-2xl mb-4">
        <Title text1={"YOUR"} text2={"WISHLIST"} />
      </div>

      {/* Wishlist Items */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div key={item.id} className="relative">
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
              {/* Remove Button */}
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-center col-span-full">
            Your wishlist is empty.
          </p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
