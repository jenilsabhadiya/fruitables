import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserRoute from "./pages/Route/UserRoute";
import AdminRoute from "./pages/Route/AdminRoute";
import PrivateRoute from "./pages/Route/PrivateRoute";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/*" element={<UserRoute />} />

        <Route element={<PrivateRoute />}>
          <Route path="/admin/*" element={<AdminRoute />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
