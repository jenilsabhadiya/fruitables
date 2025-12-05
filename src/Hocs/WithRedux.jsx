import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function WithRedux(Component, fetchAction, state) {
  console.log(Component, fetch, state);
  //   console.log(fetch);
  //   console.log(state);

  return function ComponentWithRedux(props) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchAction());
    }, []);

    const { isLongin, error, ...data } = useSelector(state);

    if (isLongin) {
      <div
        id="spinner"
        className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center"
      >
        <div className="spinner-grow text-primary" role="status" />
      </div>;
    }

    if (error) {
      <p className="error"> {error} </p>;
    }

    console.log(data);

    return <Component {...props} {...data} />;
  }
}

export default WithRedux;
