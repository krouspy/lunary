import { ERC20Transfer } from '../types/schema';
import { Transfer as ERC20TransferEvent } from '../types/Luna/erc20';
import { addERC20 } from './tokens';

export function handleERC20Transfer(event: ERC20TransferEvent): void {
  let transactionHash = event.transaction.hash.toHex();
  let transfer = new ERC20Transfer(transactionHash);
  transfer.from = event.params.from.toHex();
  transfer.to = event.params.to.toHex();
  transfer.value = event.params.value;
  transfer.save();
  addERC20(event.transaction.to.toHex());
}
