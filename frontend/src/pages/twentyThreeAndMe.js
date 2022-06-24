export default function TwentyThreeAndMe() {
  const closeTab = () => window.close(``, `_parent`, ``);

  return (
    <div className="flex flex-col justify-center csm:p-0 csm:justify-start bg-cbg cmd:w-full cxl:text-lg px-24 cxl:px-64 text-ctext">
      <section className="top my-10 shadow-bshadow rounded-3xl">
        <h1 className="text-4xl cxl:text-5xl csm:text-2xl font-extrabold text-ctitle m-10 px-2 csm:m-0">
          How to download data from 23andMe
        </h1>
      </section>
      <section className="mid flex flex-col justify-center px-100 shadow-bshadow rounded-3xl mb-10">
        <div className="flex flex-col justify-center m-auto">
          <div className="m-5">
            <div className="flex 2xl:ml-36  cxl:ml-20 ">
              <p className="inline px-3 text-sky-700">1</p>
              <p className="inline">
                Sign in to{" "}
                <a href="https://www.23andme.com/" className="text-sky-700">
                  23andMe
                </a>
                .
              </p>
            </div>
            <img
              className="mx-auto my-5 cmd:w-11/12 csm:w-full clg:w-7/12 overflow-hidden border-4 border-solid border-bcolor rounded-2xl shadow-cshadow"
              src={process.env.PUBLIC_URL + "images/23andMe/step1.png"}
              alt="Sign In"
            />
          </div>
          <div className="m-5">
            <div className="flex 2xl:ml-36  cxl:ml-20">
              <p className="inline px-3 text-sky-700">2</p>
              <p className="inline">
                Visit the{" "}
                <a
                  href="https://auth.23andme.com/login/"
                  className="text-sky-700"
                >
                  Download Raw Data page
                </a>
                . Or, you can visit the page from your Account tab on top-right
                → "<b>Browse Raw Data</b>" → "<b>Download</b>" too.
              </p>
            </div>
            <img
              className="mx-auto my-5 cmd:w-11/12 csm:w-full clg:w-7/12 overflow-hidden border-4 border-solid border-bcolor rounded-2xl shadow-cshadow"
              src={process.env.PUBLIC_URL + "images/23andMe/step2.png"}
              alt="Raw Data"
            />
          </div>
          <div className="m-5">
            <div className="flex 2xl:ml-36  cxl:ml-20">
              <p className="inline px-3 text-sky-700">3</p>
              <p className="inline">
                Scroll down to the "<b>Request your raw data download</b>"
                section. Tick the consent box and click "<b>Submit request</b>".
              </p>
            </div>
            <img
              className="mx-auto my-5 cmd:w-11/12 csm:w-full clg:w-7/12 overflow-hidden border-4 border-solid border-bcolor rounded-2xl shadow-cshadow"
              src={process.env.PUBLIC_URL + "images/23andMe/step3.png"}
              alt="Submit Raw Data Request"
            />
          </div>
          <div className="m-5 content-start">
            <div className="flex 2xl:ml-36  cxl:ml-20 ">
              <p className="inline px-3 text-sky-700">4</p>
              <p className="inline ">
                You will receive an email from 23andMe in a few minutes.
                Depending on timing, this could take longer than 10 minutes.
                Once you receive the email, download the raw DNA data file. It
                comes as a zip file.
              </p>
            </div>
          </div>
          <div className="m-5">
            <div className="flex 2xl:ml-36  cxl:ml-20">
              <p className="inline px-3 text-sky-700">5</p>
              <p className="inline">
                Click below to return to the Yellow Umbrella home page and
                upload your file.
              </p>
            </div>
          </div>
          <div className="flex flex-col  mx-auto cxl:w-5/12">
            <button
              onClick={closeTab}
              className=" rounded-full m-5 csm:text-xs csm:p-2 cmd:p-2 cmd:text-md  cxl:text-lg 
              cxl:p-3 px-6 text-white bg-orange-400 baseline transition delay-150 ease-in-out 
              hover:-translate-y-1 hover:scale-110 duration-300  border-2 shadow-cbshadow 
              bg-gradient-to-r from-lgrad to-rgrad"
            >
              CLOSE TAB - READY TO UPLOAD
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
