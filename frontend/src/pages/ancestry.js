export default function Ancestry() {
  return (
    <div className="flex flex-col justify-center csm:p-0 csm:justify-start bg-lime-1000 cmd:w-full cxl:text-lg px-24 cxl:px-64 ">
      <section className="top my-10 ">
        <h1 className="text-4xl cxl:text-5xl csm:text-2xl font-extrabold text-gray-800 m-10 px-2 csm:m-0">
          How to download data from Ancestry
        </h1>
        <p className="px-10 w-4/5 my-2 m-auto">
          Get 100 free trait reports based on an extensive analysis of your
          Ancestry raw DNA data. Learn how DNA shapes your nutrition, fitness,
          personality and intelligence traits.
        </p>
      </section>
      <section className="mid flex flex-col justify-center px-100">
        <div className="flex flex-col justify-center m-auto">
          <div className="m-5">
            <div className="flex 2xl:ml-36  cxl:ml-20 ">
              <p className="inline px-3 text-sky-700">1</p>
              <p className="inline">Sign in to Ancestry.</p>
            </div>
            <img
              className="mx-auto my-5 cmd:w-11/12 csm:w-full clg:w-7/12"
              src={process.env.PUBLIC_URL + "images/ancestry/step1.png"}
              alt="Sign In"
            />
          </div>
          <div className="m-5">
            <div className="flex 2xl:ml-36  cxl:ml-20">
              <p className="inline px-3 text-sky-700">2</p>
              <p className="inline">
                Visit the{" "}
                <a
                  href="https://www.ancestry.com/account/signin"
                  className="text-sky-700"
                >
                  Ancestry DNA Setting section
                </a>{" "}
                (Login required). Click ”Settings” in the top-right corner.
              </p>
            </div>
            <img
              className="mx-auto my-5 cmd:w-11/12 csm:w-full clg:w-7/12"
              src={process.env.PUBLIC_URL + "images/ancestry/step2.png"}
              alt="DNA Setting"
            />
          </div>
          <div className="m-5">
            <div className="flex 2xl:ml-36  cxl:ml-20">
              <p className="inline px-3 text-sky-700">3</p>
              <p className="inline">
                Scroll down to the bottom “Actions” and enter your password,
                check the box, and click ”Confirm”.
              </p>
            </div>
            <img
              className="mx-auto my-5 cmd:w-11/12 csm:w-full clg:w-7/12"
              src={process.env.PUBLIC_URL + "images/ancestry/step3.png"}
              alt="password"
            />
          </div>
          <div className="m-5 ">
            <div className="flex 2xl:ml-36  cxl:ml-20">
              <p className="px-3 text-sky-700">4</p>
              <p className="">
                You'll get an email at the email address connected to your
                Ancestry account. It contains a link to download your DNA file
                and usually arrives in about 15 minutes but in some cases could
                take up to a few hours to receive the email.
              </p>
            </div>
          </div>
          <div className="m-5">
            <div className="flex 2xl:ml-36  cxl:ml-20">
              <p className="inline px-3 text-sky-700">5</p>
              <p className="inline">Upload your file here.</p>
            </div>
            <img
              className="mx-auto my-5 cmd:w-11/12 csm:w-full clg:w-7/12"
              src={process.env.PUBLIC_URL + "images/ancestry/step5.png"}
              alt="Upload"
            />
          </div>
          <div className="flex flex-col mx-auto cxl:w-5/12">
            <button
              href="#"
              className=" rounded-full m-5 csm:text-xs csm:p-2 cmd:p-2 cmd:text-md  cxl:text-lg cxl:p-3 px-6 text-white bg-orange-400 baseline transition delay-150 ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  border-2"
            >
              GOT IT READY TO UPLOAD
            </button>
            <button
              href="https://www.ancestry.com/account/signin"
              className="rounded-full m-5 csm:text-xs csm:p-2 cmd:p-2 cmd:text-md cxl:text-lg cxl:p-3 px-6 text-gray-800 baseline hover:bg-gray-300 hover:duration-300 duration-300 border-2 border-gray-400"
            >
              GO TO ANCESTRY AND DOWNLOAD
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
