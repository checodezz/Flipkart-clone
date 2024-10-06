import { navData } from "../../constants/data";

const Navbar = () => {
  return (
    <div className="flex justify-between bg-white py-3 px-4 lg:px-8 w-full overflow-x-auto ">
      {navData.map((data) => (
        <div key={data.url} className="text-center p-2 flex-shrink-0">
          <img src={data.url} alt="nav" className="w-16" />
          <p className="text-sm font-medium">{data.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Navbar;
