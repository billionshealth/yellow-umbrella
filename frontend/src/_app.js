import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'
import { Contract, ethers } from 'ethers'
import Web3Modal from "web3modal"
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NFTdisplay from './components/NFTdisplay';
import CreateNFT from './components/CreateNFT';
import Navbar from './components/Navbar';
import Home from './components/Home';


import {
    geneticNFTAddress
} from './config'

import GeneticNFT from './artifacts/contracts/GeneNFTFactory.sol/GeneticNFTFactory.json'

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


export default function App() {
    const [currentAccount, setCurrentAccount] = useState("");
    const [provider, setProvider] = useState();

    const web3Modal = new Web3Modal({
        network: "mainnet", 
        cacheProvider: false, 
        providerOptions
    });

    function reset() {
        console.log("reset");
        setCurrentAccount("");
        web3Modal.clearCachedProvider();
    }

    // TODO: add subscribeProvider function as per example: https://github.com/Web3Modal/web3modal/blob/master/example/src/App.tsx
    // and as explained here: https://github.com/Web3Modal/web3modal#provider-events

    async function connect() {
        const web3Provider = await web3Modal.connect();
        
        web3Provider.on("disconnect", reset);

        const accounts = await web3Provider.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(accounts[0]);
        
        const provider = new ethers.providers.Web3Provider(web3Provider);
        setProvider(provider);
    }


    async function checkProvider() {
        console.log(provider)
    }

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                console.log("Make sure you have metamask!");
                return;
            } else {
                console.log("We have the ethereum object", ethereum);
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log("Found an authorized account:", account);
                setCurrentAccount(account)
            } else {
                console.log("No authorized account found")
            }
            } catch (error) {
            console.log(error);
            }
        }

    useEffect(() => {
    checkIfWalletIsConnected();
    }, [])

  return (
        <div className="mainContainer">
            <Router>
                <div className="dataContainer">
                    <div className="header">
                        Yellow Umbrella ☂ 
                    </div>

                    <Navbar />

                    {!provider && (
                        <>
                        <div className='text-block'>
                            Connect your wallet to get started!
                        </div>
                        <button className="walletButton" onClick={connect}>
                            Click here to connect wallet
                        </button>
                        </>
                        
                    )}

                    <button onClick={checkProvider}>Check current provider (temporary dev button)</button>

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