import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetalert } from "../../redux/slice/alert.slice";

function Alert() {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const alert = useSelector((state) => state.alert);
  console.log(alert);

  useEffect(() => {
    console.log(alert.text);

    if (alert.text) {
      enqueueSnackbar(alert.text, {
        variant: alert.variant,
      });
    }

    dispatch(resetalert());
  }, [alert.text]);

  return <></>;
}

export default Alert;
