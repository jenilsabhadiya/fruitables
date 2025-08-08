import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Herder from "./components/Herder/Herder";
import NotFound from "./pages/404/NotFound";
import Cart from "./pages/Cart/Cart";
import Chackout from "./pages/Chackout/Chackout";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import ShopDetail from "./pages/Shop-Detail/ShopDetail";
import Shop from "./pages/Shop/Shop";
import Testimonial from "./pages/Testimonial/Testimonial";

function App() {
  return (
    <>
      <Herder />
      {/* <Home /> */}
      {/* <NotFound /> */}
      {/* <Cart /> */}
      {/* <Chackout /> */}
      {/* <Contact /> */}
      {/* <ShopDetail /> */}
      {/* <Shop /> */}
      {/* <Testimonial /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shopDetail" element={<ShopDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/chackout" element={<Chackout />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
