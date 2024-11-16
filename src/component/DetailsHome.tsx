import { BsRocketTakeoffFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa6";
import { IoIosFolderOpen } from "react-icons/io";

function DetailsHome({
  element,
  removeApp,
  handleOpenLocation,
  handleLaunch,
}: {
  element: any;
  removeApp: (id: number) => void;
  handleOpenLocation: (filePath: string) => void;
  handleLaunch: (filePath: string) => void;
}) {
  return (
    <div
      key={element.id}
      className="rounded-md shadow-md dark:shadow-gray-700 border-x-stone-300 border-solid py-2 px-1"
    >
      <img
        src={element?.image}
        alt=""
        width={260}
        height={100}
        className="aspect-video rounded-md"
      />
      <div className="dark:bg-bgShadow dark:text-bgText  py-5 px-3 flex flex-col justify-between w-[260px] rounded-md mt-2">
        <p className="text-lg text-center font-medium">{element.name}</p>

        <div className="flex gap-2 text-xs">
          <button
            className="action-delete flex items-center gap-2"
            onClick={() => removeApp(element.id)}
          >
            <FaTrash /> <span>Remove</span>
          </button>

          <button
            className="action-secondary flex items-center gap-2 justify-center"
            onClick={() => handleOpenLocation(element.path)}
          >
            <IoIosFolderOpen /> Open
          </button>
        </div>
        <button
          className="action flex items-center gap-2 justify-center"
          onClick={() => handleLaunch(element.path)}
        >
          <BsRocketTakeoffFill />
          Launch
        </button>
        <div className="text-wrap text-center flex mt-2 gap-2 flex-wrap justify-start">
          {element.genres.length
            ? element?.genres?.map((item: string) => (
                <div
                  className={`dark:bg-black bg-stone-200 text-black dark:text-white px-3 py-1 text-xs font-medium rounded-sm`}
                >
                  {item}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default DetailsHome;
