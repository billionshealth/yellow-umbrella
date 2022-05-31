// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

// TODO: add ability to 'recombine' with others

contract GeneticNFTFactory is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address payable owner;

    mapping(uint256 => GeneticNFT) private idToGeneticNFT;

    struct GeneticNFT {
      uint256 tokenId;
      address payable seller;
      address payable owner;
      uint256 price;
      bool sold;
    }

    event GeneticNFTCreated (
      uint256 indexed tokenId,
      address seller,
      address owner,
      uint256 price,
      bool sold
    );

    constructor() ERC721("Genetic Mandala NFTs", "MAND") {}

    /* Mints a genetic NFT */
    function createNFT(string memory tokenURI) public payable returns (uint) {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      return newTokenId;
    }


    /* 
    TODO: update so just returns all the NFTs from a particular address / owner (ie. msg.sender)
     */
    function fetchMyNFTs() public view returns (GeneticNFT[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToGeneticNFT[i + 1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      GeneticNFT[] memory items = new GeneticNFT[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToGeneticNFT[i + 1].owner == msg.sender) {
          uint currentId = i + 1;
          GeneticNFT storage currentItem = idToGeneticNFT[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }
}