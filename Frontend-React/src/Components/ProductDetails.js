import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ProductDetails = () => {
  const { prodid } = useParams(); // Get the dynamic route ID
  const [product, setProduct] = useState(null);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${prodid}`); // Corrected here
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product", error);
        setIsError(true);
      } 
    };

    fetchProduct();
  }, [prodid]);

  const handleBuyNow = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!user) {
      alert("Please sign in to place an order.");
      navigate("/signin");
      return;
    }
  
    try {
      await axios.post("http://localhost:8082/api/orders", {
        productName: product.prodName,
        quantity: 1,
        price: product.price,
        userEmail: user.email
      });
  
      alert("✅ Added To Cart successfully!");
      navigate("/cart"); // or navigate to orders page
    } catch (error) {
      console.error("Failed to Add to Cart", error);
      alert("❌ Failed to place order");
    }
  };

  if (isError) {
    return <h2 style={{ padding: "10rem", textAlign: "center" }}>Product Not Found</h2>;
  }

  if (!product) {
    return <h2 style={{ padding: "10rem", textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "5rem", maxWidth: "600px", margin: "auto" }}>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2>{product.prodName?.toUpperCase()}</h2>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Description:</strong> {product.description || "No description available."}</p>
        {/* <button style={{ padding: "8px 20px", marginTop: "20px", backgroundColor: "#333", color: "#fff", border: "none", borderRadius: "5px" }}>
          Add to Cart
        </button> */}
         <button
          onClick={handleBuyNow}
          style={{
            padding: "10px 20px",
            marginTop: "20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          🛒 Add to Cart
        </button>
        <button
        onClick={() => navigate("/home")}
        style={{
          padding: "8px 20px",
          marginTop: "10px",
          backgroundColor: "#777",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        ← Back to Home
      </button>
      </div>
    </div>
  );
};

export default ProductDetails;
