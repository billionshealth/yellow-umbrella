import React, { useEffect, useState } from 'react'
import { Contract, ethers } from 'ethers'


export default function NFTdisplay({ provider, geneticNFTAddress, GeneticNFT }) {
  const [nfts, setNfts] = useState([])
  const [hasNfts, setHasNfts] = useState(false);

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

  useEffect(() => {
      loadNFTs()
    }, [])

  return (
    <>
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
              <div key={i}>
              <p>TokenID: {nft.tokenId}</p>
              <p>Genetic Hash: {nft.geneticHash}</p>
              {/* TO DO: add the image itself here */}
              <p>Owner address: {nft.owner}</p>
              </div>
          ))
          }
          </div>
        )}
  </>
)}
