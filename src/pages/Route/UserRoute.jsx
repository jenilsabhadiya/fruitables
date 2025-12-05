import React, { useEffect, useState } from "react";
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

import { Route, Routes, useNavigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import Favorite from "../Favorite/Favorite";
import Auth from "../Auth/Auth";
import { useDispatch } from "react-redux";
import { chackAuth } from "../../redux/slice/auth.slice";
import Chat from "../Chat/Chat";

function UserRoute() {
  const theme = useContext(ThemeContext);

  const [lodging, setLodging] = useState(true);

  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(chackAuth());
      } catch (error) {
        nav("/");
        console.log(error);
      } finally {
        setLodging(false);
      }
    };

    checkAuth();
  }, [dispatch, nav]);

  if (lodging) {
    return (
      <>
        <div
          id="spinner"
          className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center"
        >
          <div className="spinner-grow text-primary" role="status" />
        </div>
      </>
    );
  }

  return (
    <div className={theme.theme}>
      <Herder />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shopDetail/:id" element={<ShopDetail />} />

        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/chackout" element={<Chackout />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/favorite" element={<Favorite />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default UserRoute;
