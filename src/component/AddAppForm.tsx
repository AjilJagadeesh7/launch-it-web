import { CircularProgress } from "@mui/material";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import ImageView from "./ImageView";
import { useNavigate } from "react-router-dom";

export default function AddAppForm() {
  const [filePath, setFilePath] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openViewer, setOpenViewer] = useState<{ image: any; open: boolean }>();
  const [seacrhResult, setSearchResult] = useState<any[]>([]);
  const [selectedGame, setSelectedGame] = useState<any>(null);

  const navigate = useNavigate();

  const addGame = () => {
    if (selectedGame) {
      const games = localStorage.getItem("myGames");
      const parsedGames: any[] = games?.length ? JSON.parse(games) : [];

      parsedGames.push({
        image: selectedGame?.background_image,
        name: selectedGame?.name,
        id: selectedGame?.id,
        genres: selectedGame?.genres?.map((item: any) => item.name) ?? [],
        path: filePath,
      });

      localStorage.setItem("myGames", JSON.stringify(parsedGames));
      navigate("/");
    } else {
      //Todo
    }
  };

  const handleFileSelect = async () => {
    try {
      //@ts-ignore
      const path = await window?.electron.openFileDialog();
      if (path) {
        setFilePath(path);
      }
    } catch (error) {}
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsLoading(true);
      setSearchResult([]);
      if (!searchText.length) {
        setSearchText("");
        return;
      }
      try {
        const data = await axios.get(
          `https://api.rawg.io/api/games?key=${
            import.meta.env.VITE_APP_API_URL
          }&search=${searchText}`
        );
        if (data?.data) {
          setSearchResult(data.data?.results);
          setSearchText("");
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setSearchText("");
      }
    }
  };

  const handleSelection = (game: any) => {
    setSelectedGame(game);
  };

  return (
    <div className="flex gap-5 h-full ">
      <div className="w-1/2 h-full flex flex-col  ">
        <h3 className="text-left text-2xl font-semibold uppercase mb-10">
          Add Apps
        </h3>
        <button
          className="w-full border-bgDarkPrimary dark:border-bgPrimary border-dashed border py-3 mb-5 active:opacity-20"
          onClick={handleFileSelect}
        >
          {filePath?.length
            ? filePath
            : "Select the application execution file"}
        </button>
        <div className="mb-5">
          <p className="dark:text-bgText text-bgDarkText mb-2">Seacrh Game</p>
          <input
            className="input text-bgDarkText"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 p-3 overflow-y-auto h-full dark:bg-bgDarkHighlight bg-bgPrimary rounded-md shadow-sm">
          {seacrhResult?.length ? (
            seacrhResult.map((el: any) => {
              return (
                <div
                  className="w-full p-2 dark:bg-bgDarkPrimary bg-bgHighlight flex gap-5 rounded-sm cursor-pointer active:opacity-15 select-none"
                  key={el?.id}
                  onClick={() => handleSelection(el)}
                >
                  <img
                    src={el?.background_image}
                    alt={el.name}
                    width={150}
                    height={100}
                    className="object-cover aspect-video"
                  />
                  <div className="text-sm font-medium">
                    <p>Title: {el.name}</p>
                    <p>
                      Release Date: {moment(el.released).format("DD-MMM-yyyy")}
                    </p>
                    <p>Rating: {el.rating}</p>
                    <p>
                      Genre:{" "}
                      {el.genres.map((item: any) => item.name).join(", ")}
                    </p>
                  </div>
                </div>
              );
            })
          ) : isLoading ? (
            <div className="self-center">
              <CircularProgress color="success" />
            </div>
          ) : (
            <div className="self-center text-center w-full">
              <p className="font-medium">Empty list!</p>
              Search for games to add
            </div>
          )}
        </div>

        <button className="action self-center" onClick={addGame}>
          Add Game
        </button>
      </div>
      <div className="w-1/2 dark:bg-bgDarkHighlight bg-bgPrimary mb-4 h-full p-4 rounded-md">
        {selectedGame ? (
          <div>
            <img
              src={selectedGame?.background_image}
              alt={selectedGame.name}
              className="object-cover aspect-video w-full rounded-md"
            />
            <h3 className="text-center mt-5 text-xl font-medium text-wrap">
              {selectedGame?.name}
            </h3>
            <div className="my-5 flex gap-2 flex-wrap justify-center">
              {selectedGame?.short_screenshots?.map((item: any) => (
                <img
                  src={item?.image}
                  alt={item?.id + selectedGame?.name}
                  onClick={() =>
                    setOpenViewer({ image: item?.image, open: true })
                  }
                  className="object-cover aspect-video w-20 h-15 rounded-md cursor-pointer"
                />
              ))}
            </div>
            {selectedGame?.genres?.length ? (
              <p>
                <span className="font-medium underline underline-offset-2">
                  Genres
                </span>
                :{" "}
                {selectedGame?.genres
                  ?.map((item: any) => item?.name)
                  .join(", ")}
              </p>
            ) : null}
            {selectedGame?.platforms?.length ? (
              <p className="mt-5">
                <span className="font-medium underline underline-offset-2">
                  Platforms
                </span>
                :{" "}
                {selectedGame?.platforms
                  ?.map((item: any) => item?.platform?.name)
                  .join(", ")}
              </p>
            ) : null}
            {selectedGame?.ratings?.length ? (
              <div className="mt-5">
                <span className="font-medium underline underline-offset-2">
                  Ratings
                </span>{" "}
                <div className="flex gap-5 flex-wrap">
                  {selectedGame?.ratings?.map((item: any) => (
                    <div>
                      <p>
                        <span className="font-medium">{item?.title}</span>:{" "}
                        {item?.percent}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <ImageView
        image={openViewer?.image}
        open={openViewer?.open}
        handleClose={() => setOpenViewer({ image: null, open: false })}
      />
    </div>
  );
}
