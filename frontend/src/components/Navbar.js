import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
        <nav>
            <Link to="/">Home |</Link>
            <Link to="/create"> Create your NFT |</Link>
            <Link to="/my-nfts"> View your NFTs |</Link>
            <Link to="/recombine"> Recombine your NFT</Link>
        </nav>
    </>
  )
}
