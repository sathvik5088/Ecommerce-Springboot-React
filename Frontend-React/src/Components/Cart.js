import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please sign in first.");
      navigate("/signin");
      return;
    }

    setUserEmail(user.email);

    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/orders/user?email=${user.email}`);
        setCart(response.data);

        // ✅ Save cart to localStorage for payment page
        localStorage.setItem("cart", JSON.stringify(response.data));
      } catch (error) {
        console.error("Failed to fetch cart from DB", error);
        alert("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const getTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/api/orders/${id}`);
      const updatedCart = cart.filter(item => item.id !== id);
      setCart(updatedCart);

      // ✅ Update localStorage after deletion
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (err) {
      alert("Failed to remove item.");
    }
  };

  if (loading) {
    return <h3 className="text-center" style={{ paddingTop: "10rem" }}>Loading...</h3>;
  }

  if (cart.length === 0) {
    return <h3 className="text-center" style={{ paddingTop: "10rem" }}>🛒 Your cart is empty</h3>;
  }

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4">🛒 Your Orders</h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.productName}</td>
              <td>₹{item.price}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price * item.quantity}</td>
              <td>
                <button onClick={() => handleDelete(item.id)} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 className="text-end">Total Amount: ₹{getTotal()}</h4>
      <div className="text-end">
        <button className="btn btn-success mt-3" onClick={() => navigate("/payment")}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Cart;
