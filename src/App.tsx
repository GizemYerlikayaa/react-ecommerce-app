import { useState } from "react";
import "./App.css";
import RouterConfig from "./config/RouterConfig";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./components/Spinner";
import Navbar from "./components/Navbar";
import Toolbar from "@mui/material/Toolbar"; // MUI Toolbar
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";

function App() {
  const { currentUser } = useSelector((state: RootState) => state.app);

  return (
    <div>
      {currentUser && (
        <>
          {/* Navbar yalnızca kullanıcı varsa */}
          <Navbar />

          {/* Navbar yüksekliği kadar boşluk */}
          <Toolbar />
        </>
      )}

      {/* RouterConfig her zaman render edilir */}
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
