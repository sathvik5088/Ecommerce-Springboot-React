import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const Home = () => {

  const [products,setProducts] = useState([]);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 👋 Load user for greeting
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() =>{
    const fetchData = async() => {
      try{
        const response = await axios.get("http://localhost:8080/api/products");
        setProducts(response.data)
        console.log(response.data)
      }
      catch (error){
        console.error("Error fetching data",error);
        setIsError(true);
      }
    };

    fetchData();
  }, []);

  if(isError){
    return(
      <h2 className="text-center" style={{padding: "10rem" }}></h2>
    )
  }

  const handleDelete = async (prodId) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;
  
    try {
      await axios.delete(`http://localhost:8080/api/products/${prodId}`);
      setProducts(products.filter((p) => p.prodId !== prodId));
    } catch (err) {
      alert("Failed to delete the product.");
      console.error(err);
    }
  };
  

  return (
    <>
      {/* 👋 Greet the user */}
      {user && (
        <h3 className=" pt-5" style={{paddingLeft:"10px", marginBottom:"80px"}}>
          Welcome, <strong>{user.email.split("@")[0]}</strong>! 👋
        </h3>
      )}
  
      <div className="container mt-3">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.prodId}>
              <Link
                to={`/product/${product.prodId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">
                        {product.prodName.toUpperCase()}
                      </h5>
                      <p className="card-text">
                        <i>Type: {product.category}</i>
                      </p>
                    </div>
                    <h6 className="text-success">₹{product.price}</h6>
                  </div>
                </div>
              </Link>
            {/* <div className="mt-2 d-flex justify-content-between">
                  <Link to={`/edit/${product.prodId}`}>
                    <button className="btn btn-sm btn-warning">Edit</button>
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(product.prodId)}
                  >
                    Delete
                  </button>
                </div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
  

  
};

export default Home