import '../App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavBar from './Navbar';
import Home from './Home';
import AddProduct from './AddProduct';
import ProductDetails from './ProductDetails';
import EditProduct from './EditProduct';
import SignUp from './Signup';
import SignIn from './SignIn';
import Cart from './Cart';
import Payment from './Payments';
import Order from './Orders';

import { useEffect } from 'react';

function AppLayout() {
  const location = useLocation();
  const hideNavbarRoutes = ['/', '/signin'];

  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0); // Optional: scroll to top on route change
  }, [location]);

  return (
    <>
      {!hideNavbar && <NavBar />}
      <div style={{ paddingTop: !hideNavbar ? "80px" : "0" }}>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add_product" element={<AddProduct />} />
          <Route path="/product/:prodid" element={<ProductDetails />} />
          <Route path="/edit/:prodid" element={<EditProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="orders" element={<Order />}/>
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
