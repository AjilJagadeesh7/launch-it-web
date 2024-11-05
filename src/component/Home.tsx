import { useEffect } from "react";
import { colors } from "../lib/constants";
import useStore from "../lib/store";
import { FaTrash } from "react-icons/fa6";

function Home() {
  const { gamesList, setGamesList } = useStore();

  useEffect(() => {
    const games = localStorage.getItem("myGames");
    const parsedGames = games?.length ? JSON.parse(games) : [];
    setGamesList(parsedGames);
  }, []);

  const handleLaunch = (filePath: string) => {
    if (filePath) {
      //@ts-ignore
      window?.electron.launchExecutable(filePath);
    }
  };

  const handleOpenLocation = (filePath: string) => {
    if (filePath) {
      //@ts-ignore
      window?.electron.openFileLocation(filePath);
    }
  };

  const getRandomColor = (): string => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <div className="flex flex-wrap gap-10 p-10">
      {gamesList.length ? (
        gamesList.map((el: any) => (
          <div key={el.id} className="rounded-md shadow-md">
            <img
              src={el?.image}
              alt=""
              width={260}
              height={100}
              className="aspect-video rounded-t-md"
            />
            <div className="dark:bg-bgDarkHighlight dark:text-bgText h-48 py-5 px-3 flex flex-col justify-between w-[260px]">
              <p className="text-lg text-center font-medium">{el.name}</p>
              <div className="text-xs text-wrap text-center flex gap-3 mt-2 flex-wrap justify-start">
                {el.genres.length
                  ? el?.genres?.map((item: string) => (
                      <div
                        className={`${getRandomColor()} px-3 py-1 rounded-sm`}
                      >
                        {item}
                      </div>
                    ))
                  : null}
              </div>
              <div className="flex gap-2 text-xs">
                <button
                  className="action-delete flex items-center gap-2"
                  onClick={() => handleOpenLocation(el.path)}
                >
                  <FaTrash /> <span>Remove</span>
                </button>

                <button
                  className="action-secondary"
                  onClick={() => handleOpenLocation(el.path)}
                >
                  Open Folder
                </button>
              </div>
              <button className="action" onClick={() => handleLaunch(el.path)}>
                Launch
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center w-full h-full dark:text-bgText text-bgDarkText">
          <p>Add games to be displayed here !!</p>
        </div>
      )}
    </div>
  );
}

export default Home;
