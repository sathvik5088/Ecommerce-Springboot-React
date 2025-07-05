import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For redirect

const AddProduct = () => {
  const [formData, setFormData] = useState({
    prodName: "",
    category: "",
    price: "",
    releaseDate: "",
    available: true,
  });

  const navigate = useNavigate(); // For redirecting to home

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format date to dd/MM/yyyy
    const [yyyy, mm, dd] = formData.releaseDate.split("-");
    const formattedDate = `${dd}/${mm}/${yyyy}`;

    const payload = {
      ...formData,
      releaseDate: formattedDate,
    };

    try {
      await axios.post("http://localhost:8080/api/products", payload);
      alert("✅ Product added successfully!");
      navigate("/"); // Redirect to Home
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div style={{ padding: "3rem", maxWidth: "500px", margin: "auto" }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Product Name:</label>
          <input
            type="text"
            name="prodName"
            value={formData.prodName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Release Date:</label>
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            {" "}Available
          </label>
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ➕ Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
