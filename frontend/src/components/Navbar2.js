import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar csm:w-full">
      <div className="relative w-full text-yellow-400 bg-gray-900 text-center text-bold mx-0 p-6 cxl:text-6xl cmd:text-5xl csm:text-3xl">
        Yellow Umbrella ☂
      </div>
      <div className="links flex  justify-center m-auto cmd:w-full csm:w-2/12">
        <button className=" rounded-full m-5 p-3 px-6 csm:p-2  cxl:m-5 csm:m-1 csm:text-sm cmd:text-base clg:text-lg baseline hover:bg-yellow-100 hover:duration-300 ">
          <Link to="/">Home</Link>
        </button>
        <button className=" rounded-full m-5 p-3 px-6 csm:p-2  cxl:m-5 csm:m-1 csm:text-sm cmd:text-base clg:text-lg baseline hover:bg-lime-1000 hover:duration-300 ">
          <Link to="/ancestry">Ancestry</Link>
        </button>
        <button className=" rounded-full m-5 p-3 px-6 csm:p-2  cxl:m-5 csm:m-1 csm:text-sm cmd:text-base clg:text-lg baseline hover:bg-gray-1000 hover:duration-300">
          <Link to="/23andme">23andMe</Link>
        </button>
        <button className=" rounded-full m-5 p-3 px-6 csm:p-2  cxl:m-5 csm:m-1 csm:text-sm cmd:text-base clg:text-lg baseline hover:bg-pink-1000 hover:duration-300 ">
          <Link to="/myheritage">MyHeritage</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
