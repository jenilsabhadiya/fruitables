import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { chackAuth } from "../../redux/slice/auth.slice";
import Auth from "../Auth/Auth";

function PrivateRoute() {
  const [lodging, setLodging] = useState(true);

  const auth = useSelector((state) => state.auth);
  console.log(auth, "auth");

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

  return auth?.auth?.isVarifind ? <Outlet /> : <Navigate to={"/"} replace />;
}

export default PrivateRoute;
