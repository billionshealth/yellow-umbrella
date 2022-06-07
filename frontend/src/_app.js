import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'
import { Contract, ethers } from 'ethers'
import Web3Modal from "web3modal"
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { Link } from 'react-router-dom';

import {
    geneticNFTAddress
} from './config'

import GeneticNFT from './artifacts/contracts/GeneNFTFactory.sol/GeneticNFTFactory.json'

const providerOptions = {
    coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
          appName: "My Awesome App", // Required
          infuraId: process.env.REACT_APP_INFURA_ID,
          rpc: "", // Optional if `infuraId` is provided; otherwise it's required
          chainId: 1, // Optional. It defaults to 1 if not provided
          darkMode: false // Optional. Use dark theme, defaults to false
        }
      },
  };


export default function App() {
    const [file, setFile] = useState()
    const [currentAccount, setCurrentAccount] = useState("");
    const [provider, setProvider] = useState();
    const [nfts, setNfts] = useState([])
    const [hasNfts, setHasNfts] = useState(false);

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

    async function loadNFTs() {
        const signer = provider.getSigner()
        const geneticNFTcontract = new ethers.Contract(geneticNFTAddress, GeneticNFT.abi, signer)
        const geneticNFTdata = await geneticNFTcontract.fetchMyNFTs()

        const items = await Promise.all(geneticNFTdata.map(async i => {
        // TODO: add loading of IPFS metadata and image using tokenURI. template code below:
            //     const tokenUri = await geneticNFTcontract.tokenURI(i.tokenId)
            //     const meta = await axios.get(tokenUri)
            let item = {
              tokenId: i.tokenId.toNumber(),
              geneticHash: i.geneticHash.toNumber(),
              owner: i.owner,
        //       image: meta.data.image,
        //       name: meta.data.name,
        //       description: meta.data.description,
            }
            return item
          }))
          setNfts(items)
          
          if (items.length > 0) {
            setHasNfts(true)
          }
          
        console.log("NFTs loaded. Details: ", items)
    }

    async function mintNFT() {
        const signer = provider.getSigner()
        const geneticNFTcontract = new ethers.Contract(geneticNFTAddress, GeneticNFT.abi, signer)
        let transaction = await geneticNFTcontract.createNFT("https://add-address-here.com", 1050)
        await transaction.wait()
        console.log("NFT has been minted. Transaction hash: ", transaction.hash)
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

    // useEffect(() => {
    //     loadNFTs()
    // }, [])

    const submit = async event => {
        event.preventDefault()

        const formData = new FormData()
        formData.append("file", file, `${currentAccount}.txt`)

        const result = await axios.post('/api/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        console.log(result.data)
    }

  return (
        <div className="mainContainer">
            <div className="dataContainer">
                <div className="header">
                    Yellow Umbrella ☂ 
                </div>

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

                {/* Temporary functions to support development */}
                <button onClick={checkProvider}>Check current provider</button>

                <div className="text-block">
                    Upload your DNA sequence to get a unique bio NFT
                </div>

                <div className="text-block">
                    Select a .txt or .vcf file:
                </div>

                <div className="submit-block">
                    <form onSubmit={submit}>
                        <input className="file-upload" filename={file} onChange={e => setFile(e.target.files[0])} 
                        type="file" accept=".txt"></input> 
                        {/* TODO: modify to accept other file types, such as VCF */}

                        <button className="submitButton" type="submit">Submit genetic data</button>
                    </form>
                </div>

                <button className="submitButton" onClick={mintNFT}>Mint my NFT</button>
                <button className="submitButton" onClick={loadNFTs}>Load my NFTs</button>

                <div className="header">
                    Your genetic NFTs 
                </div>

                <div className="text-block">
                    If you have any genetic NFTs, they'll appear here. <br/><br/>(Make sure you're connected with
                    the same wallet you minted your NFTs with.)
                </div>

                {hasNfts && (
                    <div className="to-style">
                    {
                    nfts.map((nft, i) => (
                        <>
                        <p>TokenID: {nft.tokenId}</p>
                        <p>Genetic Hash: {nft.geneticHash}</p>
                        {/* TO DO: add the image itself here */}
                        <p>Owner address: {nft.owner}</p>
                        </>
                    ))
                    }   
                    </div>
                )}

                {/* {loadingState === 'loaded' && nfts.length &&  (
                    <>
                        We're showing the NFTs here.
                        {nfts}
                    </>
                )} */}


                <div className='text-block'>
                        Links to other pages below:
                </div>
                <ul>
                    <li><Link to="/my-nfts">View your NFTs</Link></li>
                    <li><Link to="/recombine">Recombine your NFT with others</Link></li>

                </ul>

            </div>
        </div>
    )
  }