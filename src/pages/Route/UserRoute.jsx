import React, { useEffect, useState } from "react";
import NotFound from "../404/NotFound";
import Cart from "../Cart/Cart";
import Chackout from "../Chackout/Chackout";
import Contact from "../Contact/Contact";
import Home from "../Home/Home";
import ShopDetail from "../Shop-Detail/ShopDetail";
import Shop from "../Shop/Shop";
import Testimonial from "../Testimonial/Testimonial";

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
import Herder from "../../components/Herder/Herder";

function UserRoute() {
  const theme = useContext(ThemeContext);

  const [cartData, setCartData] = useState({});

  const handleCartData = (data) => {
    const cartDataD = { ...cartData };

    console.log(data);

    const index = cartDataD?.cart?.cart?.findIndex(
      (v) => v.id === data.cart.id
    );

    console.log(index);

    if (index === -1 || index === undefined) {
      if (!cartDataD.cart?.cart) {
        cartDataD.cart = {
          userId: data.userId,
          cart: [data.cart],
        };
      } else {
        cartDataD.cart.cart.push(data.cart);
      }
    } else {
      let sumQty = cartDataD.cart.cart[index].qty + data.cart.qty;
      if (sumQty <= 10) {
        cartDataD.cart.cart[index].qty += data.cart.qty;
      } else {
        alert("Minimum 10 items allows");
      }
    }

    console.log(cartDataD);
    setCartData(cartDataD);
  };

  console.log(cartData);

  const [lodging, setLodging] = useState(true);

  const dispatch = useDispatch();
  const nav = useNavigate();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       await dispatch(chackAuth());
  //     } catch (error) {
  //       nav("/");
  //       console.log(error);
  //     } finally {
  //       setLodging(false);
  //     }
  //   };

  //   checkAuth();
  // }, [dispatch, nav]);

  // if (lodging) {
  //   return (
  //     <>
  //       <div
  //         id="spinner"
  //         className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center"
  //       >
  //         <div className="spinner-grow text-primary" role="status" />
  //       </div>
  //     </>
  //   );
  // }

  return (
    <div className={theme.theme}>
      <Herder cartData={cartData} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route
          path="/shopDetail/:id"
          element={<ShopDetail setCartData={handleCartData} />}
        />

        <Route path="/cart" element={<Cart cartData={cartData} />} />
        <Route element={<PrivateRoute />}>
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
