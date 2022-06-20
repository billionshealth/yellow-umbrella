import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="relative text-yellow-400 bg-gray-900 text-center text-bold mx-0 p-6 text-6xl">
        Yellow Umbrella ☂
      </div>
      <div className="links flex flex-row justify-center ">
        <button className=" rounded-full m-5 p-3 px-6 text-lightGray bg-midGray baseline hover:bg-lime-100 hover:duration-300 ">
          <Link to="/">Ancestry</Link>
        </button>
        <button className=" rounded-full m-5 p-3 px-6 text-lightGray bg-midGray baseline hover:bg-lime-100 hover:duration-300">
          <Link to="/23andme">23andMe</Link>
        </button>
        <button className=" rounded-full m-5 p-3 px-6 text-lightGray bg-midGray baseline hover:bg-lime-100 hover:duration-300 ">
          <Link to="/myheritage">MyHeritage</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
