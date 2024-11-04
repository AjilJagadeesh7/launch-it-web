import Drawer from "@mui/material/Drawer";
import { useWindowWidth } from "@react-hook/window-size";

import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";

function SideBar({
  isDrawerOpen,
  handleDrawer,
}: {
  isDrawerOpen: boolean;
  handleDrawer: (bool: boolean) => void;
}) {
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();

  const handleFileSelect = () => {
    navigate("/add");
  };
  return (
    <Drawer
      variant={windowWidth < 700 ? "temporary" : "permanent"}
      anchor="left"
      open={isDrawerOpen}
      onClose={() => handleDrawer(false)}
    >
      <div className="flex flex-col bg-bgHighlight dark:bg-bgDarkHighlight h-full border-0 w-52 items-center justify-between py-10">
        <div className="flex flex-col items-center">
          <div className="dark:text-bgText text-bgDarkText w-40 h-40 pt-5 bg-bgText dark:bg-bgDarkPrimary text-center items-center flex-col flex rounded-full">
            <img src={Logo} alt="Logo" className="w-20" />
            <p className="font-bold">LAUNCH IT!</p>
          </div>
          <button className="action" onClick={handleFileSelect}>
            Add Apps
          </button>
        </div>

        <ThemeToggle />
      </div>
    </Drawer>
  );
}

export default SideBar;
