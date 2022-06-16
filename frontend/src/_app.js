import { useEffect, useState } from 'react'
// import './App.css'
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
        <div>
            <Router>
                <div>
                    <div className="text-4xl">
                        Yellow Umbrella ☂ 
                    </div>

                    <Navbar />

                    {!currentAccount && (
                        <>
                            <button className="walletButton" onClick={connect}>Connect wallet to get started</button>
                        </>
                    )}

                    {currentAccount && (
                        <>
                         <button className="walletButton" onClick={reset}>Disconnect wallet</button>
                        </>
                    )}

                    <Routes>
                        <Route path="/" element={<Home/>} ></Route>
                        <Route path="/create" element={<CreateNFT provider={provider} geneticNFTAddress={geneticNFTAddress} GeneticNFT={GeneticNFT} currentAccount={currentAccount}/>}></Route>
                        <Route path="/my-nfts" element={<NFTdisplay provider={provider} geneticNFTAddress={geneticNFTAddress} GeneticNFT={GeneticNFT}/>}></Route>
                    </Routes>

                </div>
            </Router>

        </div>
    )
  }