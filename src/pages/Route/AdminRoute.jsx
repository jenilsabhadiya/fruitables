import React, { useContext } from "react";
import Categary from "../../Admin/container/Categary/Categary";
import SubCategary from "../../Admin/container/SubCategary/SubCategary";
import NotFound from "../../Admin/container/NotFound/NotFound";
import { Route, Routes } from "react-router-dom";
import Layout from "../../Admin/components/Layout/Layout";
import Products from "../../Admin/container/Products/Products";
import Counter from "../../Admin/container/Counter/Counter";
import Tastimonial from "../../Admin/container/Tastimonial/Tastimonial";
import Reviews from "../../Admin/container/Reviews/Reviews";
import { ThemeContext } from "../../Context/ThemeContext";
import { createTheme, ThemeProvider } from "@mui/material";
import { tokensSetting } from "../../Admin/theme";
import Dashboard from "../../Admin/container/Dashboard/Dashboard";
import Coupon from "../../Admin/container/Coupon/Coupon";

function AdminRoute() {
  const theme = useContext(ThemeContext);

  console.log(theme.theme);

  const muiTheme = createTheme(tokensSetting(theme.theme));

  console.log(muiTheme);

  return (
    <ThemeProvider theme={muiTheme}>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/categary" element={<Categary />} />
          <Route path="/sub-categary" element={<SubCategary />} />
          <Route path="/products" element={<Products />} />
          <Route path="/tastimonial" element={<Tastimonial />} />

          <Route path="/counter" element={<Counter />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/coupon" element={<Coupon />} />


          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default AdminRoute;
