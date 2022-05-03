import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import axios from "axios"
import './App.css'


export default function App() {
  const [file, setFile] = useState()
  const [currentAccount, setCurrentAccount] = useState("");

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

    const connectWallet = async () => {
        try {
            const { ethereum } = window;
    
            if (!ethereum) {
            alert("Do you have MetaMask installed? If not, get it here: https://metamask.io/");
            return;
            }
    
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    
            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error)
            }
        }

    useEffect(() => {
    checkIfWalletIsConnected();
    }, [])

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

            {!currentAccount && (
                <>
                <div className='text-block'>
                    Connect your wallet to get started!
                </div>
                <button className="walletButton" onClick={connectWallet}>
                    Click here to connect wallet
                </button>
                </>
            )}

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

                    <button className="submitButton" type="submit">Submit</button>
                </form>
            </div>
        </div>
    </div>

    )
  }