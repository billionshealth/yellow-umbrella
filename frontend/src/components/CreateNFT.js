import { useEffect, useState } from 'react'
import { Contract, ethers } from 'ethers'
import axios from "axios"
import { uploadIPFS } from '../helper/uploadIPFS';
import P5Wrapper, { ReactP5Wrapper } from 'react-p5-wrapper';
import sketch from '../helper/sketch';

export default function CreateNFT({ provider, geneticNFTAddress, GeneticNFT, currentAccount }) {
    const [file, setFile] = useState();
    const [fileHash, setFileHash] = useState("placeholderHash");


    const submit = async event => {
        event.preventDefault()

        // const file_hash = ethers.utils.id('hello world') // temp code for testing
        const new_file_hash = ethers.utils.id(file);

        console.log("The file hash is ", new_file_hash)
        setFileHash(new_file_hash)

        const formData = new FormData()
        formData.append("file", file, `${currentAccount}.txt`)

        const result = await axios.post('/api/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        console.log(result.data)
    }
    

    async function mintNFT() {
        const signer = provider.getSigner()
        const geneticNFTcontract = new ethers.Contract(geneticNFTAddress, GeneticNFT.abi, signer)

        const metadata = await uploadIPFS()

        console.log("metadata for NFT is:", metadata)

        const geneticHash = 1050

        const tokenURI = `https://ipfs.io/ipfs/${metadata.ipnft}/metadata.json`

        let transaction = await geneticNFTcontract.createNFT(tokenURI, geneticHash)

        await transaction.wait()
        console.log("NFT has been minted. Transaction hash: ", transaction.hash)

    }

  return (
    <>
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

        <div id="canvas">
            <ReactP5Wrapper sketch={sketch} hash={fileHash}></ReactP5Wrapper>
        </div>
    </>
  )
}
