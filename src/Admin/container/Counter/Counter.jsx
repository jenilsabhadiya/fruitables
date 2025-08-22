import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../../redux/slice/counter.slice";

function Counter() {
  const counterData = useSelector((state) => state.count);

  console.log(counterData);

  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(increment());
  };

  const handleDecrease = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <button
        onClick={() => {
          handleIncrease();
        }}
      >
        +
      </button>
      <p>{counterData.count}</p>
      <button
        onClick={() => {
          handleDecrease();
        }}
      >
        -
      </button>
    </div>
  );
}

export default Counter;
