import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "../../components/User/Title";
import ProductItem from "../../components/User/ProductItem";
import axiosInstance from "../../Utils/axiosInstance";

const RelatedProducts = ({ id }) => {
  const [related, setRelated] = useState([]);

  const getRelated = () => {
    axiosInstance.get(`/products/${id}/related`).then((res) => {
      setRelated(res.data);
    });
  };

  useEffect(() => {
    getRelated();
  }, []);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-5">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
