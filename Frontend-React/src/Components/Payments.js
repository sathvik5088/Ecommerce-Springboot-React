import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState("UPI"); 
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart || cart.length === 0) {
      alert("Cart is empty!");
      navigate("/cart");
      return;
    }

    // Calculate total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setAmount(total);
    
    // Generate fake orderId for now
    const randomOrderId = "ORD-" + Math.floor(Math.random() * 1000000);
    setOrderId(randomOrderId);
  }, [navigate]);

  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem("user")); 
    const cart = JSON.parse(localStorage.getItem("cart")); 

    if (!user || !user.email) {
      alert("User not logged in.");
      navigate("/signin");
      return;
    }
    try {
      for (let item of cart) {
        const orderId = "ORD-" + Math.floor(Math.random() * 1000000);
  
        await axios.post("http://localhost:8083/api/payments/initiate", {
          orderId: orderId,
          amount: item.price,
          method: method,
          email: user.email,
          productName: item.productName,
          quantity: item.quantity,
        });

        await axios.post("http://localhost:8084/api/purchase/item", { 
          orderId: orderId,
          amount: item.price,
          method: method,
          userEmail: user.email,
          productName: item.productName,
          quantity: item.quantity,
        });
      }
  
      alert("Payment successful!");
      localStorage.removeItem("cart");
      navigate("/orders");

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed");

    }

  };

  return (
    <div className="container mt-5 pt-5">
      <h2>💳 Payment</h2>
      <p><strong>Order ID:</strong> {orderId}</p>
      <p><strong>Amount:</strong> ₹{amount}</p>

      <div className="mb-3">
        <label>Select Payment Method:</label>
        <select className="form-select" value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="COD">Cash on Delivery</option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
