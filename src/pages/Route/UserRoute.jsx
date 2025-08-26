import React from "react";
import NotFound from "../404/NotFound";
import Cart from "../Cart/Cart";
import Chackout from "../Chackout/Chackout";
import Contact from "../Contact/Contact";
import Home from "../Home/Home";
import ShopDetail from "../Shop-Detail/ShopDetail";
import Shop from "../Shop/Shop";
import Testimonial from "../Testimonial/Testimonial";

import Herder from "/src/components/Herder/Herder";
import Footer from "/src/components/Footer/Footer";

import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

function UserRoute() {
  return (
    <>
      <Herder />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shopDetail/:id" element={<ShopDetail />} />

        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/chackout" element={<Chackout />} />
        </Route>
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </>
  );
}

export default UserRoute;
