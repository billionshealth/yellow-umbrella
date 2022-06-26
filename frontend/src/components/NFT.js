import { useEffect, useState } from "react";
import { Contract, ethers } from "ethers";
import axios from "axios";
import { uploadIPFS } from "../helper/uploadIPFS";
import { ReactP5Wrapper } from "react-p5-wrapper";
import sketch from "../helper/sketch";
import baseline from "../helper/baseline";


export default function NFT({
  provider,
  geneticNFTAddress,
  GeneticNFT,
  currentAccount,
}) {
  const [file, setFile] = useState();
  const [fileHash, setFileHash] = useState(ethers.utils.id("placeholderHash"));
  const [fileUploaded, setFileUploaded] = useState(false);
  const [nftLocation, setNftLocation] = useState("");
  const [awaitingMinting, setAwaitingMinting] = useState(false);
  const [mintingFinished, setMintingFinished] = useState(false);
  const [transactionId, setTransactionId] = useState("");


  const submit = async (event) => {
    event.preventDefault();

    var fr = new FileReader();
    fr.onload = function (text) {
      console.log("file contents are:", text.target.result);
      const new_file_hash = ethers.utils.id(text.target.result);
      console.log("The file hash is:", new_file_hash);
      setFileHash(new_file_hash);
    };
    fr.readAsText(file);

    // FILE UPLOAD - TEMPORARILY COMMENTED
    // const formData = new FormData();
    // formData.append("file", file, `${currentAccount}.txt`);

    // const result = await axios.post("/api/images", formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });
    // console.log(result.data);

    setFileUploaded(true); // TODO: move this to after successful file upload, once
    // added appropriate error handling
  };

  async function mintNFT() {
    const signer = provider.getSigner();
    const geneticNFTcontract = new ethers.Contract(
      geneticNFTAddress,
      GeneticNFT.abi,
      signer
    );

    setAwaitingMinting(true);

    console.log("The current file hash is ", fileHash);
    console.log("Uploading to IPFS now... Time taken can vary.");

    const metadata = await uploadIPFS();

    console.log("metadata for NFT is:", metadata);

    const tokenURI = `https://ipfs.io/ipfs/${metadata.ipnft}/metadata.json`;
    setNftLocation(tokenURI)

    let transaction = await geneticNFTcontract.createNFT(tokenURI, fileHash);

    await transaction.wait();
    console.log("NFT has been minted. Transaction hash: ", transaction.hash);
    setTransactionId(transaction.hash);
    setAwaitingMinting(false);
    setMintingFinished(true);
  }

  return (
    <div className="cmd:px-10 cmd:my-10 csm:w-[180%]">
      <div className="shadow-bshadow rounded-3xl p-5 m-5 ">
        <section id="dataUpload" className="w-full">
          <div className="container flex flex-col items-center justify-center px-6 mx-auto">
            <form className="mt-6" onSubmit={submit}>
              <input
                filename={file}
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                accept=".txt, .vcf"
                className="flex justify-center items-center
                            rounded-full 
                            text-ctext mx-auto
                            hover:duration-300 shadow-btns hover:border-1 
                            file:text-lightGray file:bg-darkGray
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:hover:duration-300 file:shadow-btns file:hover:ease duration-300 file:hover:text-midGray
                            file:hover:border-1 file:hover:shadow-btna file:hover:border-[#444]"
              />

              {file && (
                <div className="neumorphic-switch-1">
                  <input id="switch-1" type="checkbox" checked readOnly />
                  <label htmlFor="switch-1"></label>
                </div>
              )}

              {!file && (
                <div className="neumorphic-switch">
                  <input id="switch-1" type="checkbox" />
                  <label htmlFor="switch-1"></label>
                </div>
              )}

              <div className="flex pt-10 pb-2 mx-auto justify-center text-lightGray w-full">
                <em>Need to download your DNA file?</em>
              </div>

              <div className="container flex-row space-x-6 mt-4 text-center text-lightGray">
                <a
                  href="/ancestry"
                  target="_blank"
                  className="p-3 hover:text-midGray"
                >
                  Ancestry
                </a>
                <a
                  href="/23andme"
                  target="_blank"
                  className="p-3 hover:text-midGray"
                >
                  23andMe
                </a>
                <a
                  href="/myheritage"
                  target="_blank"
                  className="p-3 hover:text-midGray"
                >
                  MyHeritage
                </a>
              </div>

              <div className="flex pt-10 pb-2 mx-auto justify-center text-lightGray w-full">
                Your DNA sequence will be hashed to generate your unique NFT. Your DNA data never leaves your device and will not be stored.
              </div>


              {file && (
              <div className="flex mx-auto justify-center align-content">
                <button
                  className="rounded-full p-3
                                    px-6 mt-9 bg-darkGray baseline text-lightGray 
                                    hover:duration-300 shadow-btns hover:ease duration-300 hover:text-midGray  
                                    hover:border-1 hover:shadow-btna hover:border-[#444]"
                  type="submit"
                >
                  Hash my DNA sequence
                </button>
              </div>
              )}

              {!file && (
              <div className="flex mx-auto justify-center align-content">
                <button
                  className="rounded-full p-3 px-6 mt-9 bg-darkGray baseline text-lightGray shadow-btns"
                >
                  Hash my DNA sequence
                </button>
              </div>
              )}
            </form>

            
          </div>
        </section>

        <section id="mintNFT" className="flex justify-center">
          <div className="container flex flex-col justify-center items-center px-6 mx-auto csm:!px-[0%] min-w-full">
            {!fileUploaded && (
              <div id="canvas" className="flex mx-auto mt-8 ">
                <ReactP5Wrapper
                  sketch={baseline}
                  hash={fileHash}
                ></ReactP5Wrapper>
              </div>
            )}
            {fileUploaded && (
              <div id="canvas" className="flex mx-auto mt-8 ">
                <ReactP5Wrapper
                  sketch={sketch}
                  hash={fileHash}
                ></ReactP5Wrapper>
              </div>
            )}

            {awaitingMinting && (
               <div className="flex pt-10 pb-2 mx-auto justify-center text-center text-lightGray w-full">
                  NFT minting in progress... may take a few minutes.<br/><br/>
                  (Must await IPFS upload - see browser console for status)
               </div>

            )}

            {!fileUploaded && (
              <button
                className="flex mx-auto mt-6 rounded-full p-3
                        px-6 bg-darkGray baseline text-lightGray shadow-btns"
              >
                Mint my NFT
              </button>
            )}

            {fileUploaded && (
              <button
                className="flex mx-auto mt-6 rounded-full p-3
                        px-6 bg-darkGray baseline text-lightGray 
                        hover:duration-300 shadow-btns hover:ease duration-300 hover:text-midGray  
                        hover:border-1 hover:shadow-btna hover:border-[#444]"
                onClick={mintNFT}
              >
                Mint my NFT
              </button>
            )}

            {mintingFinished && (
              <>
                <div className="flex pt-10 pb-2 mx-auto text-center justify-center items-center text-lightGray w-full">
                  Minting complete! View your NFT metadata on IPFS:{" "}
                </div>
                  <a href={nftLocation} className="flex mx-auto mt-6 rounded-full p-3
                      px-6 bg-darkGray baseline text-lightGray 
                      hover:duration-300 shadow-btns hover:ease duration-300 hover:text-midGray  
                      hover:border-1 hover:shadow-btna hover:border-[#444]"
                      >
                      View NFT metadata
                  </a>
              
                <div className="flex pt-10 pb-2 mx-auto text-center justify-center items-center text-lightGray w-full">
                  View the transaction on the block explorer:
                </div>

                <a href={`https://mumbai.polygonscan.com/tx/${transactionId}`} 
                // <a href={`https://testnet.explorer.emerald.oasis.dev/tx/${transactionId}`} 
                      className="flex mx-auto mt-6 rounded-full p-3
                      px-6 bg-darkGray baseline text-lightGray 
                      hover:duration-300 shadow-btns hover:ease duration-300 hover:text-midGray  
                      hover:border-1 hover:shadow-btna hover:border-[#444]"
                      >
                      View transaction
                  </a>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
