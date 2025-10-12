import { Route, Routes } from "react-router-dom";
import UserRoute from "./pages/Route/UserRoute";
import AdminRoute from "./pages/Route/AdminRoute";
import PrivateRoute from "./pages/Route/PrivateRoute";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import CStore from "./redux/store";
import { ThemeProvider } from "./Context/ThemeContext";
import { SnackbarProvider } from "notistack";

function App() {
  const { store, persistor } = CStore();

  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Routes>
              <Route path="/*" element={<UserRoute />} />
              <Route element={<PrivateRoute />}>
                <Route path="/admin/*" element={<AdminRoute />} />
              </Route>
            </Routes>
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
