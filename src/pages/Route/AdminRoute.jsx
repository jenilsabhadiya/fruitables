import React from "react";
import Categary from "../../Admin/container/Categary/Categary";
import SubCategary from "../../Admin/container/SubCategary/SubCategary";
import NotFound from "../../Admin/container/NotFound/NotFound";
import { Route, Routes } from "react-router-dom";
import Layout from "../../Admin/components/Layout/Layout";
import Products from "../../Admin/container/Products/Products";
import Counter from "../../Admin/container/Counter/Counter";
import Tastimonial from "../../Admin/container/Tastimonial/Tastimonial";

function AdminRoute() {
  return (
    <Layout>
      <Routes>
        <Route path="/categary" element={<Categary />} />
        <Route path="/sub-categary" element={<SubCategary />} />
        <Route path="/products" element={<Products />} />
        <Route path="/tastimonial" element={<Tastimonial />} />

        <Route path="/counter" element={<Counter />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default AdminRoute;
