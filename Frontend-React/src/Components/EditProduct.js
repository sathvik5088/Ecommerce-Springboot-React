import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EditProduct = () => {
  const { prodid } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    prodId: '',
    prodName: '',
    price: '',
    category: '',
    releaseDate: '',
    available: false
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/products/${prodid}`)
      .then((response) => {
        const prod = response.data;
  
        // Convert dd/MM/yyyy → yyyy-MM-dd for input type="date"
        const [dd, mm, yyyy] = prod.releaseDate.split("/");
        const formattedDate = `${yyyy}-${mm}-${dd}`; // ✅ For input type="date"
  
        setProduct({
          prodId: prod.prodId, 
          prodName: prod.prodName || '',
          category: prod.category || '',
          price: prod.price || '',
          releaseDate: formattedDate,
          available: prod.available || false
        });
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  }, [prodid]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Convert yyyy-MM-dd → dd/MM/yyyy
    const [yyyy, mm, dd] = product.releaseDate.split("-");
    const formattedDate = `${dd}/${mm}/${yyyy}`;
  
    const updatedProduct = {
      ...product,
      releaseDate: formattedDate
    };
  
    axios.put(`http://localhost:8080/api/products`, updatedProduct)
      .then(() => {
        alert("Product updated successfully!");
        navigate('/');
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Failed to update.");
      });
  };
  

  return (
    <div
      style={{
        padding: "3rem",
        maxWidth: "500px",
        margin: "auto",
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
            Product Name:
          </label>
          <input
            type="text"
            name="prodName"
            value={product.prodName}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
  
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
            Category:
          </label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
  
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
            Price:
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
  
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
            Release Date:
          </label>
          <input
            type="date"
            name="releaseDate"
            value={product.releaseDate}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
  
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontWeight: "600" }}>
            <input
              type="checkbox"
              name="available"
              checked={product.available}
              onChange={handleChange}
              style={{ marginRight: "8px" }}
            />
            Available
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
            fontWeight: "600",
          }}
        >
          ✅ Update Product
        </button>
      </form>
    </div>
  );
  
};

export default EditProduct;
