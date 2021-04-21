import { SmartContract } from './models';

export const getAllSmartContractRecords = () => {
  return SmartContract.findAll();
};

export const getMarketplaceRecord = () => {
  return SmartContract.findMarketplace();
};

export const getERC20Record = () => {
  return SmartContract.findERC20();
};

export const getERC721Record = () => {
  return SmartContract.findERC721();
};

export const updateOneSmartContractRecord = async (contractType, name, address, abi) => {
  if (contractType !== 'marketplace' && contractType !== 'erc20' && contractType !== 'erc721') {
    throw new Error(
      'UpdateOneSmartContract: contract type must be equal to marketplace, erc20 or erc721',
    );
  }

  const data = {
    name,
    address,
    abi,
  };

  await SmartContract.findOneAndUpdate({ contractType }, data, { upsert: true });
  return true;
};
