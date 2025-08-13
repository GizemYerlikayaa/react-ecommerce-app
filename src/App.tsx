import { useState } from "react";
import "./App.css";
import RouterConfig from "./config/RouterConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./components/Spinner";

function App() {
  return (
    <div>
      <RouterConfig />
      <ToastContainer
        autoClose={2500}
        style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px" }}
      />
      <Spinner />
    </div>
  );
}

export default App;
