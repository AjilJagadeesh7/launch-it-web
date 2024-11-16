import { FaAlignJustify } from "react-icons/fa6";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import useStore from "../lib/store";
import { useLocation, useNavigate } from "react-router-dom";
import { FiImage } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";

export const Header = ({
  windowWidth,
  handleDrawer,
}: {
  windowWidth: number;
  handleDrawer: (bool: boolean) => void;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname; // Get the current path
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { gamesList, setGamesList, isIconOnly, setIsIconOnly } = useStore();
  const search = (e: any) => {
    e.preventDefault();
    if (searchTerm.length) {
      setGamesList(
        gamesList.filter((el) => el.name.toLowerCase().includes(searchTerm))
      );
      setSearchTerm("");
    } else {
      const games = localStorage.getItem("myGames");
      if (games?.length) {
        const parsedGames = JSON.parse(games) ?? [];
        setGamesList(parsedGames);
        setSearchTerm("");
      }
    }
  };
  const clear = (e: any) => {
    e.preventDefault();
    setSearchTerm("");
    const games = localStorage.getItem("myGames");
    if (games?.length) {
      const parsedGames = JSON.parse(games) ?? [];
      setGamesList(parsedGames);
    }
  };

  return (
    <div className="w-full dark:bg-bgDarkHighlight bg-bgPrimary dark:text-bgText justify-between text-bgDarkText flex items-center px-5 py-2 h-20 border-b border-solid border-white">
      {windowWidth < 700 ? (
        <IconButton aria-label="Menu" onClick={() => handleDrawer(true)}>
          <FaAlignJustify className="dark:text-bgPrimary text-bgDarkPrimary" />
        </IconButton>
      ) : null}

      <div className="self-center w-1/2 hidden md:flex items-center gap-2">
        {currentPath !== "/" ? (
          <div className="w-20">
            <button
              className="action "
              onClick={() => {
                navigate("/");
              }}
            >
              Back
            </button>
          </div>
        ) : null}

        <input
          type="text"
          className="input  mt-5 text-bgDarkText"
          placeholder="Search Games"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div>
          <button className="action" onClick={search}>
            Search
          </button>
        </div>
        <div>
          <button className="action-clear" onClick={clear}>
            Clear
          </button>
        </div>
      </div>
      <div
        className="dark:text-bgPrimary text-bgDarkPrimary text-3xl mt-2 cursor-pointer"
        onClick={() => {
          setIsIconOnly(!isIconOnly);
        }}
      >
        {isIconOnly ? (
          <Tooltip title="Show Details" placement="left">
            <TbListDetails />
          </Tooltip>
        ) : (
          <Tooltip title="Show Icons" placement="left">
            <FiImage />
          </Tooltip>
        )}
      </div>
    </div>
  );
};
