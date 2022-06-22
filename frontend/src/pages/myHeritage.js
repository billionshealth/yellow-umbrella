export default function MyHeritage() {
  return (
    <div className="flex flex-col justify-center csm:p-0 csm:justify-start bg-pink-1000 cmd:w-full cxl:text-lg px-24 cxl:px-64">
      <section className="top my-10 ">
        <h1 className="text-4xl cxl:text-5xl csm:text-2xl font-extrabold text-gray-800 m-10 px-2 csm:m-0">
          How to download data from MyHeritage
        </h1>
        <p className="px-10 w-4/5 my-2 m-auto">
          Get 100 free trait reports based on an extensive analysis of your
          MyHeritage raw DNA data. Learn how DNA shapes your nutrition, fitness,
          personality and intelligence traits.
        </p>
      </section>
      <section className="mid flex flex-col justify-center px-100">
        <div className="flex flex-col justify-center m-auto">
          <div className="m-5">
            <div className="flex 2xl:ml-36  cxl:ml-20 ">
              <p className="inline px-3 text-sky-700">1</p>
              <p className="inline">
                Login to your{" "}
                <a href="https://www.myheritage.com" className="text-sky-700">
                  MyHeritage
                </a>{" "}
                account first.
              </p>
            </div>
            <img
              className="mx-auto my-5 cmd:w-11/12 csm:w-full clg:w-7/12"
              src={process.env.PUBLIC_URL + "images/myheritage/step1.png"}
              alt="Sign In"
            />
          </div>
          <div className="m-5">
            <div className="flex 2xl:ml-36  cxl:ml-20">
              <p className="inline px-3 text-sky-700">2</p>
              <p className="inline">
                Hover over the <b>DNA</b> tab and go to "<b>Manage DNA kits</b>
                ". On the right-hand side of the MyHeritage kit, click on the
                three dots and choose "<b>Download</b>".
              </p>
            </div>
            <img
              className="mx-auto my-5 cmd:w-11/12 csm:w-full clg:w-7/12"
              src={process.env.PUBLIC_URL + "images/myheritage/step2.png"}
              alt="Raw Data"
            />
          </div>
          <div className="m-5">
            <div className="flex 2xl:ml-36  cxl:ml-20">
              <p className="inline px-3 text-sky-700">3</p>
              <p className="inline">
                A window will pop up with information on what you are about to
                download. Click "<b>Continue</b>". In the next popup you will be
                asked to accept the{" "}
                <b>MyHeritage Terms of Service and the Privacy Policy</b>, then
                click "<b>Continue</b>" again.
              </p>
            </div>
            <img
              className="mx-auto my-5 cmd:w-11/12 csm:w-full clg:w-7/12"
              src={process.env.PUBLIC_URL + "images/myheritage/step3.png"}
              alt="Submit Raw Data Request"
            />
          </div>
          <div className="m-5 content-start">
            <div className="flex 2xl:ml-36  cxl:ml-20 ">
              <p className="inline px-3 text-sky-700">4</p>
              <p className="inline ">
                An email with instructions will be sent to your registered email
                address. Find this email in your mailbox and click on the "
                <b>Download link</b>".
              </p>
            </div>
          </div>
          <div className="m-5 content-start">
            <div className="flex 2xl:ml-36  cxl:ml-20 ">
              <p className="inline px-3 text-sky-700">5</p>
              <p className="inline ">
                Once you have clicked on the download link, you will be
                redirected to the MyHeritage site. Enter your password and click
                the "<b>Download</b>" button. The file will be downloaded to
                your computer.
              </p>
            </div>
          </div>
          <div className="m-5">
            <div className="flex 2xl:ml-36  cxl:ml-20">
              <p className="inline px-3 text-sky-700">6</p>
              <p className="inline">Upload your file here.</p>
            </div>
            <img
              className="mx-auto my-5 cmd:w-11/12 csm:w-full clg:w-7/12"
              src={process.env.PUBLIC_URL + "images/myheritage/step6.png"}
              alt="Upload"
            />
          </div>
          <div className="flex flex-col  mx-auto cxl:w-5/12">
            <button
              href="#"
              className=" rounded-full m-5 csm:text-xs csm:p-2 cmd:p-2 cmd:text-md cxl:text-lg cxl:p-3 px-6 text-white bg-orange-400 baseline transition delay-150 ease-in-out hover:-translate-y-1 hover:scale-110 duration-300  border-2"
            >
              GOT IT READY TO UPLOAD
            </button>
            <button
              href="https://www.myheritage.com"
              className="rounded-full m-5 csm:text-xs csm:p-2 cmd:p-2 cmd:text-md cxl:text-lg cxl:p-3 px-6 text-gray-800 baseline hover:bg-gray-300 hover:duration-300 duration-300 border-2 border-gray-400"
            >
              GO TO MyHeritage AND DOWNLOAD
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
