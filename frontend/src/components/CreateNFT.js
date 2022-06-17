import { useEffect, useState } from 'react'
import { Contract, ethers } from 'ethers'
import axios from "axios"
import { uploadIPFS } from '../helper/uploadIPFS';
import P5Wrapper, { ReactP5Wrapper } from 'react-p5-wrapper';
import sketch from '../helper/sketch';

export default function CreateNFT({ provider, geneticNFTAddress, GeneticNFT, currentAccount }) {
    const [file, setFile] = useState();
    const [fileHash, setFileHash] = useState(ethers.utils.id("placeholderHash"));
    
    const submit = async event => {
        event.preventDefault()

        var fr = new FileReader();
        fr.onload=function(text) {
            console.log("file contents are:", text.target.result)
            const new_file_hash = ethers.utils.id(text.target.result);
            console.log("The file hash is:", new_file_hash)
            setFileHash(new_file_hash)
        }
        fr.readAsText(file);

        const formData = new FormData()
        formData.append("file", file, `${currentAccount}.txt`)

        const result = await axios.post('/api/images', formData, { headers: {'Content-Type': 'multipart/form-data'}})
        console.log(result.data)
    }
    

    async function mintNFT() {
        const signer = provider.getSigner()
        const geneticNFTcontract = new ethers.Contract(geneticNFTAddress, GeneticNFT.abi, signer)

        console.log("The current file hash is ", fileHash)
        console.log("Uploading to IPFS now... Time taken can vary.")

        const metadata = await uploadIPFS()

        console.log("metadata for NFT is:", metadata)

        const tokenURI = `https://ipfs.io/ipfs/${metadata.ipnft}/metadata.json`

        let transaction = await geneticNFTcontract.createNFT(tokenURI, fileHash)

        await transaction.wait()
        console.log("NFT has been minted. Transaction hash: ", transaction.hash)

    }

  return (
    <>
        <section id="dataUpload">
            <div className="container flex flex-col items-center px-6 mx-auto">

                    <form className="flex-col items-center space-x-10" onSubmit={submit}>
                        <input filename={file} onChange={e => setFile(e.target.files[0])} 
                        type="file" accept=".txt" className="flex w-full text-center
                        text-midGray pb-6
                        file:text-lightGray file:bg-midGray
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:hover:bg-gray-200"
                         /> 
                        {/* TODO: modify to accept other file types, such as VCF */}
                        <div>
                            <button className="flex rounded-full p-3 px-6 text-lightGray bg-midGray baseline hover:bg-gray-200" type="submit">Upload your DNA file</button>
                        </div>
                    </form>
                 

                <div className="text-block">
                    Select a .txt or .vcf file:
                </div>  


            </div>
        </section>

        <section id="mintNFT">
            <button className="submitButton" onClick={mintNFT}>Mint my NFT</button>
        </section>

        <section id="displayNFT">

            <div id="canvas">
                <ReactP5Wrapper sketch={sketch} hash={fileHash}></ReactP5Wrapper>
            </div>
        </section>

    </>
  )
}
