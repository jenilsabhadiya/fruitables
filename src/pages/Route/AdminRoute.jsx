import React from "react";
import Categary from "../../Admin/container/Categary/Categary";
import SubCategary from "../../Admin/container/SubCategary/SubCategary";
import NotFound from "../../Admin/container/NotFound/NotFound";
import { Route, Routes } from "react-router-dom";
import Layout from "../../Admin/components/Layout/Layout";

function AdminRoute() {
  return (
    <Layout>
      <Routes>
        <Route path="/categary" element={<Categary />} />
        <Route path="/sub-categary" element={<SubCategary />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default AdminRoute;
