import React from "react";
import { Home, Product, Cart, Login, Register, ProductList } from "./pages";

import { Route, Routes } from 'react-router-dom';
import { Announcement, Footer, NavBar, OurNewsletter } from "./components";


const App = () => {
  return (
    <>
      <Announcement />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product-list" element={<ProductList />} />
      </Routes>
      <OurNewsletter />
      <Footer />
    </>
    
  );
};

export default App;