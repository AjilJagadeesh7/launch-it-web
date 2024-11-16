import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Header } from "./component/Header";
import SideBar from "./component/SideBar";
import { useWindowWidth } from "@react-hook/window-size";
import useStore from "./lib/store";
import { Alert } from "@mui/material";
import AddApp from "./component/AddAppModal";
import Home from "./component/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function useThemeInitializer() {
  useEffect(() => {
    const isDarkMode =
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
}

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const windowWidth = useWindowWidth();
  const { isModalOpen, setIsModalOpen, showAlert } = useStore();
  useThemeInitializer();

  useEffect(() => {
    if (windowWidth > 700) {
      setIsDrawerOpen(true);
    }
    if (windowWidth < 700 && isModalOpen) {
      setIsModalOpen(false);
    }
  }, [windowWidth]);

  const handleDrawer = (bool: boolean) => {
    if (bool !== isDrawerOpen) {
      setIsDrawerOpen(bool);
    }
  };

  return (
    <Router>
      <div className="dark:bg-bgDarkPrimary bg-bgHighlight flex h-screen">
        {isDrawerOpen ? (
          <SideBar isDrawerOpen={isDrawerOpen} handleDrawer={handleDrawer} />
        ) : null}
        <div
          className={`w-full h-full flex flex-col ${
            windowWidth > 700 ? "ml-52" : ""
          }`}
        >
          <Header windowWidth={windowWidth} handleDrawer={handleDrawer} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddApp />} />
          </Routes>

          {/* {filePath && (
          <div>
            <p>Selected File: {filePath}</p>
            <button onClick={handleLaunch}>Launch Executable</button>
          </div>
        )} */}
          {showAlert.show ? (
            <Alert
              className="w-[500px] absolute bottom-5 right-5"
              //@ts-ignore
              severity={showAlert.severity}
            />
          ) : null}
        </div>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
