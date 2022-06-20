import { useEffect, useState } from 'react'
import { Contract, ethers } from 'ethers'
import Web3Modal from "web3modal"
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NFTdisplay from './components/NFTdisplay';
import CreateNFT from './components/CreateNFT';
import Navbar from './components/Navbar';
import Home from './components/Home';
import './styles/main.css'

import {
    geneticNFTAddress
} from './config'

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
                darkMode: false // Optional. Use dark theme, defaults to false
            }
            },
        };

    const web3Modal = new Web3Modal({
        network: "mainnet", 
        cacheProvider: false, 
        providerOptions
    });

    async function connect() {
        const web3Provider = await web3Modal.connect();
        
        web3Provider.on("disconnect", reset); // not currently used

        const accounts = await web3Provider.request({ method: 'eth_requestAccounts' });
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
        <div className="flex-col mx-auto">
            {/* TODO: add a logo here */}
            <div className="relative text-yellow-400 bg-darkGray text-center text-bold mx-0 p-6 text-7xl">
                Yellow Umbrella ☂
            </div>

            <section id="walletButton">
                <div className="container flex flex-col items-center px-6 mx-auto mt-10">
                    <div className="flex pb-4">
                        {!currentAccount && (
                            <>
                            <button className="flex rounded-full p-3 px-6 text-lightGray bg-midGray baseline hover:bg-gray-200" onClick={connect}>Connect your wallet</button>
                            </>
                        )}
                        
                        {currentAccount && (
                        <>
                        <button className="flex rounded-full p-3 px-6 text-lightGray bg-midGray baseline hover:bg-gray-200" onClick={reset}>Disconnect wallet</button>
                        </>
                        )}
                    </div>
                </div>
            </section>
        </div>

        <div>
            <section id="nftCreation">
                <CreateNFT provider={provider} geneticNFTAddress={geneticNFTAddress} GeneticNFT={GeneticNFT} currentAccount={currentAccount}/>
            </section>

                
                {/* <Route path="/my-nfts" element={<NFTdisplay provider={provider} geneticNFTAddress={geneticNFTAddress} GeneticNFT={GeneticNFT}/>}></Route> */}



        </div>
    </>
    )
}
