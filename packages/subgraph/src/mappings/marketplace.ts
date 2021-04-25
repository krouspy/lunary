import { NFTCreated, Marketplace, NFTBought } from '../types/schema';
import { NFTCreated as NFTCreatedEvent } from '../types/NFT/erc721';
import { NFTBought as NFTBoughtEvent } from '../types/Lunary/marketplace';
import { addERC721 } from './tokens';

function addMarketplace(event: NFTCreatedEvent): void {
  let address = event.transaction.to.toHex();
  let marketplace = Marketplace.load(address);
  if (marketplace != null) {
    return;
  }

  marketplace = new Marketplace(address);
  marketplace.erc20Address = '0';
  marketplace.erc721Address = '1';
  marketplace.save();
}

export function handleCreateNFT(event: NFTCreatedEvent): void {
  let transactionHash = event.transaction.hash.toHex();
  let nft = new NFTCreated(transactionHash);
  nft.tokenId = event.params.tokenId;
  nft.owner = event.params.owner.toHex();
  nft.category = event.params.category.toString();
  nft.price = event.params.price;
  nft.tokenURI = event.params.tokenURI.toString();
  nft.description = event.params.description.toString();
  nft.save();
  addERC721(event.transaction.to.toHex());
  addMarketplace(event);
}

export function handleNFTBought(event: NFTBoughtEvent): void {
  let transactionHash = event.transaction.hash.toHex();
  let nftBought = new NFTBought(transactionHash);
  nftBought.seller = event.params.seller.toHex();
  nftBought.buyer = event.params.buyer.toHex();
  nftBought.price = event.params.tokenId;
  nftBought.save();
}
