import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserRoute from "./pages/Route/UserRoute";
import AdminRoute from "./pages/Route/AdminRoute";
import PrivateRoute from "./pages/Route/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<UserRoute />} />

      <Route element={<PrivateRoute />}>
        <Route path="/admin/*" element={<AdminRoute />} />
      </Route>
    </Routes>
  );
}

export default App;
