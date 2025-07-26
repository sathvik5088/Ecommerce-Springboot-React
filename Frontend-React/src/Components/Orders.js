import React, { useEffect, useState } from "react";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login to view orders");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8084/api/purchase?userEmail=${user.email}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
        alert("Error loading orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading orders...</p>;

  if (orders.length === 0) return <h4 className="text-center mt-5">No orders found</h4>;

  return (
    <div className="container mt-5 pt-5">
      <h2>Your Orders</h2>
      <table className="table table-bordered mt-4">
        <thead className="table-dark">
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Ordered Date</th>
            <th>Order Id</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <tr key={item.prodid}>
              <td>{item.productName}</td>
              <td>₹{item.amount}</td>
              <td>{item.quantity}</td>
              <td>₹{item.amount * item.quantity}</td>
              <td>{item.purchasedAt}</td>
              <td>{item.orderId}</td>              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
