//SPDX-License-Identifier: Unlicense

pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "./ERC721Tradable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// TODO: consider adding interface


contract Mandala is Ownable, ERC721 { // ERC721URIStorage
    using Counters for Counters.Counter;
    Counters.Counter public tokenId;

    struct Features {
        uint feat_1;
        uint feat_2;
        uint feat_3;
    }

    address public playerContract;

    modifier onlyPlayerContract(){
        require (msg.sender == playerContract);
        _;
    }

    constructor(address _proxyRegistryAddress) {}

    // function _msgSender() internal view returns (address sender) {
    //     return super.msgSender();
    // }

    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function isApprovedForAll(address owner, address operator) override(ERC721) public view returns (bool ){
        return super.isApprovedForAll(owner, operator);
    }

    function baseTokenURI() public pure returns (string memory) {
        return "ipfs://";
    }

    function mint(address player, string memory _tokenURI) public onlyPlayerContract returns (uint256) {
        tokenId.increment();

        uint256 newItemId = tokenId.current();
        _mint(player, newItemId);
        // _setTokenURI(newItemId, _tokenURI); // TODO: add with ERC721 Storage

        return newItemId;
    }

}

