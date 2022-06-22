import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    // <div className="not-found">
    //   <h2>Sorry</h2>
    //   <p>That page cannot be found</p>
    //   <Link to="/">Back to the homepage...</Link>
    // </div>
    <div className="flex flex-col justify-center sm:p-0 sm:justify-start bg-pink-1000 md:w-full xl:text-lg px-24 xl:px-64">
      <section className="top my-10 ">
        <h1 className="text-4xl xl:text-5xl sm:text-2xl font-extrabold text-gray-800 m-10 px-2 sm:m-0">
          Sorry, That page cannot be found...
        </h1>
      </section>
      <section className=" content-center px-100">
        <div className=" content-center m-auto">
          <div className="flex flex-col  mx-auto xl:w-5/12">
            <button className=" rounded-full m-5 sm:text-xs sm:p-2 md:p-2 md:text-md xl:text-lg xl:p-3 px-6 text-white bg-orange-400 baseline transition delay-150 ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  border-2">
              <Link to="/">Back to the homepage...</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
