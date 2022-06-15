// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";
  
contract GeneticNFTFactory is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter _tokenIds;

    address payable owner;

    mapping(uint256 => GeneticNFT) idToGeneticNFT;

    struct GeneticNFT {
      uint256 tokenId;
      uint256 geneticHash;
      address owner;
    }

    event GeneticNFTCreated (
      uint256 indexed tokenId,
      uint256 geneticHash,
      address owner
    );

    constructor() ERC721("Genetic Mandala NFTs", "MAND") {}

    /* Mints a genetic NFT */
    function createNFT(string memory tokenURI, uint256 geneticHash) public payable returns (uint) {

      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);

      idToGeneticNFT[newTokenId] = GeneticNFT({
        tokenId: newTokenId,
        geneticHash: geneticHash,
        owner: msg.sender
    });

      emit GeneticNFTCreated(newTokenId, geneticHash, msg.sender);

      return newTokenId;
    }

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

    // TODO: add function for recombining with others, if required.
    // (note: logic may take place in frontend)

}