import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar csm:w-full">
      <div className="relative w-full text-yellow-400 bg-gray-900 text-center text-bold mx-0 p-6 cxl:text-6xl cmd:text-5xl csm:text-3xl">
        Yellow Umbrella ☂
      </div>
      <div className="links flex  justify-center m-auto cmd:w-full csm:w-2/12">
        <Link to="/">
          <button className=" rounded-full m-5 p-3 px-6 csm:p-2  cxl:m-5 csm:m-1 csm:text-sm cmd:text-base clg:text-lg baseline hover:bg-yellow-100  focus:bg-yellow-100 focus:ring focus:ring-yellow-200 hover:duration-300 duration-300">
            Home
          </button>
        </Link>
        <Link to="/ancestry">
          <button className=" rounded-full m-5 p-3 px-6 csm:p-2  cxl:m-5 csm:m-1 csm:text-sm cmd:text-base clg:text-lg baseline hover:bg-lime-1000 focus:bg-lime-1000 focus:ring focus:ring-lime-200 hover:duration-300 duration-300">
            Ancestry
          </button>
        </Link>
        <Link to="/23andme">
          <button className=" rounded-full m-5 p-3 px-6 csm:p-2  cxl:m-5 csm:m-1 csm:text-sm cmd:text-base clg:text-lg baseline hover:bg-gray-1000 focus:bg-gray-1000 focus:ring focus:ring-gray-300 hover:duration-300 duration-300">
            23andMe
          </button>
        </Link>
        <Link to="/myheritage">
          <button className=" rounded-full m-5 p-3 px-6 csm:p-2  cxl:m-5 csm:m-1 csm:text-sm cmd:text-base clg:text-lg baseline hover:bg-pink-1000 focus:bg-pink-1000 focus:ring focus:ring-orange-200 hover:duration-300 duration-300">
            MyHeritage
          </button>
        </Link>
      </div>
    </nav>
  );
}
