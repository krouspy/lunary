import { ERC20, ERC721 } from '../types/schema';

export function addERC20(address: string): void {
  let token = ERC20.load(address);
  if (token != null) {
    return;
  }

  token = new ERC20(address);
  token.decimals = 18;
  token.name = 'Luna';
  token.symbol = 'Luna';
  token.save();
}

export function addERC721(address: string): void {
  let token = ERC721.load(address);
  if (token != null) {
    return;
  }

  token = new ERC721(address);
  token.name = 'NFT';
  token.symbol = 'NFT';
  token.save();
}
