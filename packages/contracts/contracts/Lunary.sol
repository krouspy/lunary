//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Luna.sol";
import "./NFT.sol";


contract Lunary is Ownable {
    event NFTBought(address indexed seller, address indexed buyer, uint256 indexed tokenId);

    Luna private _luna;
    NFT private _nft;

    constructor(Luna luna, NFT nft) {
        _luna = luna;
        _nft = nft;
    }

    function createNFT(string memory title, uint256 price, bytes32 category, string memory tokenURI, string memory description) public returns (bool) {
        _nft.createItem(msg.sender, title, price, category, tokenURI, description);
        return true;
    }

    function buyNFT(uint256 tokenId) public returns (bool) {
        address owner = _nft.ownerOf(tokenId);
        uint256 price = _nft.getItemPrice(tokenId);
        _nft.safeTransferFrom(owner, msg.sender, tokenId);
        _luna.transferFrom(msg.sender, owner, price);

        emit NFTBought(owner, msg.sender, tokenId);
        return true;
    }
}
