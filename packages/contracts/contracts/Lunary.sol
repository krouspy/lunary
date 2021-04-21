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

    function createNFT(uint256 price, string memory category) public returns (bool) {
        _nft.createItem(msg.sender, price, category);
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