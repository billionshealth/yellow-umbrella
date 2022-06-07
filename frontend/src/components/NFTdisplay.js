import React from 'react'

export default function NFTdisplay({ hasNfts, nfts }) {
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
