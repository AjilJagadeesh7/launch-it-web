import { FaAlignJustify } from "react-icons/fa6";
import { IconButton } from "@mui/material";
import { useState } from "react";
import useStore from "../lib/store";

export const Header = ({
  windowWidth,
  handleDrawer,
}: {
  windowWidth: number;
  handleDrawer: (bool: boolean) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { gamesList, setGamesList } = useStore();
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
    <div className="w-full dark:bg-bgDarkHighlight bg-bgPrimary dark:text-bgText text-bgDarkText flex items-center px-5 py-2 h-20">
      <div>
        {windowWidth < 700 ? (
          <IconButton aria-label="Menu" onClick={() => handleDrawer(true)}>
            <FaAlignJustify className="dark:text-bgPrimary text-bgDarkPrimary" />
          </IconButton>
        ) : null}
      </div>
      <div className="self-center w-1/2 flex items-center gap-2">
        <input
          type="text"
          className="input w-full mt-5 text-bgDarkText"
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
    </div>
  );
};
