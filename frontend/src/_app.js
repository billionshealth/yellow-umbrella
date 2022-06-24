import { useEffect, useState } from "react";
import { Contract, ethers } from "ethers";
import Web3Modal from "web3modal";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import NFTdisplay from "./components/NFTdisplay";
import CreateNFT from "./components/CreateNFT";
import { geneticNFTAddress } from "./config";
import "./styles/main.css";

import GeneticNFT from './artifacts/contracts/GeneNFTFactory.sol/GeneticNFTFactory.json'

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [provider, setProvider] = useState();

  const providerOptions = {
    coinbasewallet: {
      package: CoinbaseWalletSDK, // Required
      options: {
        appName: "Yellow Umbrella", // Required
        infuraId: process.env.REACT_APP_INFURA_ID,
        rpc: "", // Optional if `infuraId` is provided; otherwise it's required
        chainId: 1, // Optional. It defaults to 1 if not provided
        darkMode: false, // Optional. Use dark theme, defaults to false
      },
    },
  };

  const web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: false,
    providerOptions,
  });

  async function connect() {
    const web3Provider = await web3Modal.connect();

    web3Provider.on("disconnect", reset); // not currently used

    const accounts = await web3Provider.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(accounts[0]);

    const provider = new ethers.providers.Web3Provider(web3Provider);
    setProvider(provider);
  }

  function reset() {
    console.log("reset");
    setCurrentAccount("");
    web3Modal.clearCachedProvider();
  }

  return (
    <>
      <div className="flex-col w-full csm:!w-[180%]">
        {/* TODO: add a logo here */}
        <div className="relative w-full text-yellow-400 bg-gray-900 text-center text-bold mx-0 p-6 cxl:text-6xl cmd:text-5xl csm:text-3xl">
          Yellow Umbrella ☂
        </div>

        <section id="walletButton">
          <div className="container flex flex-col items-center px-6 mx-auto mt-10">
            <div className="flex pb-4">
              {!currentAccount && (
                <>
                  <button
                    className="flex rounded-full p-3 px-6 text-base text-lightGray bg-darkGray baseline 
                                hover:duration-300 shadow-btns hover:ease duration-300 hover:text-midGray 
                                hover:border-1 hover:shadow-btna hover:border-[#444]"
                    onClick={connect}
                  >
                    Connect your wallet
                  </button>
                </>
              )}

              {currentAccount && (
                <>
                  <button
                    className="flex rounded-full p-3 px-6 text-base text-lightGray bg-darkGray baseline 
                                    hover:duration-300 shadow-btns hover:ease duration-300 hover:text-midGray 
                                    hover:border-1 hover:shadow-btna hover:border-[#444]"
                    onClick={reset}
                  >
                    Disconnect wallet
                  </button>
                </>
              )}
            </div>
          </div>
        </section>
      </div>

      <div>
        <section id="nftCreation">
          <CreateNFT
            provider={provider}
            geneticNFTAddress={geneticNFTAddress}
            GeneticNFT={GeneticNFT}
            currentAccount={currentAccount}
          />
        </section>
      </div>
    </>
  );
}
