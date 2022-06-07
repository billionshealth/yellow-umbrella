import { useEffect, useState } from 'react'
import { Contract, ethers } from 'ethers'
import axios from "axios"


export default function CreateNFT({ provider, geneticNFTAddress, GeneticNFT, currentAccount }) {
    const [file, setFile] = useState();

    const submit = async event => {
        event.preventDefault()

        const formData = new FormData()
        formData.append("file", file, `${currentAccount}.txt`)

        const result = await axios.post('/api/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        console.log(result.data)
    }

    async function mintNFT() {
        const signer = provider.getSigner()
        const geneticNFTcontract = new ethers.Contract(geneticNFTAddress, GeneticNFT.abi, signer)
        let transaction = await geneticNFTcontract.createNFT("https://add-address-here.com", 1050)
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
    </>
  )
}
