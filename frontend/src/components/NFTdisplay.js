import React, { useEffect, useState } from 'react'
import { Contract, ethers } from 'ethers'
import axios from 'axios'


export default function NFTdisplay({ provider, geneticNFTAddress, GeneticNFT }) {
  const [nfts, setNfts] = useState([])
  const [hasNfts, setHasNfts] = useState(false);

  async function loadNFTs() {
    const signer = provider.getSigner()
    const geneticNFTcontract = new ethers.Contract(geneticNFTAddress, GeneticNFT.abi, signer)
    const geneticNFTdata = await geneticNFTcontract.fetchMyNFTs()

    const items = await Promise.all(geneticNFTdata.map(async i => {
        const tokenUri = await geneticNFTcontract.tokenURI(i.tokenId)
        const meta = await axios.get(tokenUri)
        const image = `https://ipfs.io/ipfs/${meta.data.image.substring(7)}` // parse out the IPFS.IO link

        let item = {
          tokenId: i.tokenId.toNumber(),
          geneticHash: i.geneticHash,
          owner: i.owner,
          tokenUri: tokenUri,
          image: image,
          name: meta.data.name,
          description: meta.data.description
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
                <img src={nft.image}/>
                {/* <p>Genetic Hash: {nft.geneticHash}</p> */}
                <p>Owner address: {nft.owner}</p>
                <p>Name: {nft.name}</p>
                <p>Description: {nft.description}</p>
              </div>
          ))
          }
          </div>
        )}

      {!hasNfts && (
        <div className="to-style">
          <p>Looks like either your wallet isn't connected or you don't have any NFTs connected to this wallet.</p>
        </div>
      )}
  </>
)}
