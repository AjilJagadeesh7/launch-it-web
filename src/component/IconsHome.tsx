function IconsHome({
  element,
  handleLaunch,
}: {
  element: any;
  handleLaunch: (filePath: string) => void;
}) {
  return (
    <div
      className=" border-solid dark:border-white dark:shadow-md shadow-2xl shadow-gray-600  border-black border rounded-md cursor-pointer"
      onClick={() => handleLaunch(element.path)}
    >
      <img
        src={element?.image}
        alt=""
        width={130}
        height={130}
        className="aspect-square object-cover rounded-md"
      />
    </div>
  );
}

export default IconsHome;
