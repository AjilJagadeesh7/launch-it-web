import { useEffect } from "react";
import useStore from "../lib/store";
import { toast } from "react-toastify";
import DetailsHome from "./DetailsHome";
import IconsHome from "./IconsHome";

function Home() {
  const { gamesList, setGamesList, isIconOnly } = useStore();

  useEffect(() => {
    const games = localStorage.getItem("myGames");
    const parsedGames = games?.length ? JSON.parse(games) : [];
    setGamesList(parsedGames);
  }, []);

  const handleLaunch = (filePath: string) => {
    if (filePath) {
      try {
        //@ts-ignore
        window?.electron.launchExecutable(filePath);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  const handleOpenLocation = (filePath: string) => {
    if (filePath) {
      try {
        //@ts-ignore
        window?.electron.openFileLocation(filePath);
      } catch (error: any) {
        toast.error("Failed to open location");
      }
    }
  };

  const removeApp = (id: number) => {
    if (!id) return;
    const data = localStorage.getItem("myGames");
    if (data) {
      const parsedData = JSON.parse(data);
      const removedList = parsedData.filter((el: any) => el.id !== id);
      localStorage.setItem("myGames", JSON.stringify(removedList));
      setGamesList(removedList);
    }
  };

  return (
    <div className="flex flex-wrap gap-10 p-10">
      {gamesList.length ? (
        gamesList.map((el: any, index: number) => {
          if (!isIconOnly) {
            return (
              <DetailsHome
                key={index}
                element={el}
                handleLaunch={handleLaunch}
                handleOpenLocation={handleOpenLocation}
                removeApp={removeApp}
              />
            );
          }
          return (
            <IconsHome
              key={index}
              element={el}
              handleLaunch={handleOpenLocation}
            />
          );
        })
      ) : (
        <div className="flex justify-center w-full mt-20 h-full dark:text-bgText text-bgDarkText">
          <p>Add games to be displayed here !!</p>
        </div>
      )}
    </div>
  );
}

export default Home;
