import React from "react";
import { Home, Product, Cart, Login, Register, ProductList } from "./pages";

import { Navigate, Route, Routes,  } from 'react-router-dom';
import { Announcement, Footer, NavBar, OurNewsletter } from "./components";


const App = () => {
  const user = false;
  return (
    <>
      <Announcement />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:category" element={<ProductList />} />
      </Routes>
      <OurNewsletter />
      <Footer />
    </>
    
  );
};

export default App;