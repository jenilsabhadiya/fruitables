import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserRoute from "./pages/Route/UserRoute";
import AdminRoute from "./pages/Route/AdminRoute";
import PrivateRoute from "./pages/Route/PrivateRoute";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import CStore from "./redux/store";

function App() {
  const { store, persistor } = CStore();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route path="/*" element={<UserRoute />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin/*" element={<AdminRoute />} />
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
