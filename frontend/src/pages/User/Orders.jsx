import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import Title from "../../components/User/Title";
import axiosInstance from "../../Utils/axiosInstance";

const Orders = () => {
  const { currency } = useContext(ShopContext); // Assuming currency context exists
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/orders/myorders");
        setOrders(response.data); // API returns an array of orders
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching orders:",
          error.response?.data || error.message
        );
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        <p className="ml-4 text-gray-700">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-16 px-4 lg:px-16">
      <div className="text-2xl mb-8">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div className="grid grid-cols-1 gap-8">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-6 shadow-md bg-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-bold text-gray-800">
                    Order ID: {order._id}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Total:</span> {currency}
                    {order.total}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Status:</span> {order.status}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-sm text-gray-500 text-right">
                  <p>
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state}, {order.address.country} -{" "}
                    {order.address.postal_code}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-gray-800 font-medium mb-2">Products:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50"
                    >
                      <img
                        src={product.productId.image}
                        alt={product.productId.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div>
                        <p className="text-gray-800 font-medium">
                          {product.productId.name}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Price:</span> {currency}
                          {product.productId.price}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Quantity:</span>{" "}
                          {product.quantity}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Size:</span>{" "}
                          {product.size || "N/A"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-center">
            No orders found. Start shopping now!
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;
