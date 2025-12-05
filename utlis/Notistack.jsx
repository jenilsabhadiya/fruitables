import { enqueueSnackbar, SnackbarProvider } from "notistack";
import React from "react";

function Notistack() {
  return (
    <div>
      <SnackbarProvider />
      <button onClick={() => enqueueSnackbar("That was easy!")}>
        Show snackbar
      </button>
    </div>
  );
}

export default Notistack;
