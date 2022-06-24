import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center csm:p-0 csm:justify-start bg-cbg cmd:w-full cxl:text-lg px-24 cxl:px-64 text-ctext">
      <section className="top my-10 shadow-bshadow rounded-3xl">
        <h1 className="text-4xl cxl:text-5xl csm:text-2xl font-extrabold text-ctitle m-10 px-2 csm:m-0">
          Sorry, Page Cannot Be Found...
        </h1>
      </section>
      <section className=" content-center px-100 mid shadow-bshadow rounded-3xl mb-10">
        <div className=" content-center m-auto">
          <div className="flex flex-col  mx-auto cxl:w-5/12">
            <button
              className=" rounded-full m-5 csm:text-xs csm:p-2 cmd:p-2 cmd:text-md cxl:text-lg 
            cxl:p-3 px-6 text-white bg-orange-400 baseline transition delay-150 ease-in-out
            hover:-translate-y-1 hover:scale-110 duration-300  border-2 shadow-cbshadow
            bg-gradient-to-r from-lgrad to-rgrad"
            >
              <Link to="/">Back to the homepage...</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
