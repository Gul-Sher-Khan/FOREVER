import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "../../components/User/Title";
import ProductItem from "../../components/User/ProductItem";
import { products } from "../../assets/assets";

const Wishlist = () => {
  const wishlist = products.slice(0, 3).map((product, index) => ({
    id: product._id,
    image: product.image,
    name: product.name,
    price: product.price,
  }));

  const removeFromWishlist = (id) => {
    console.log(`Remove item with id: ${id}`);
  };

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
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
              {/* Remove Button */}
              <button
                onClick={() => removeFromWishlist(item.id)}
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
