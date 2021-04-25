import { __abis_directory_path__ } from '../../constants';

const getDataSourceHeader = (name: string, abiName: string, address: string) => {
  return {
    kind: 'ethereum/contract',
    name: name,
    network: 'mainnet',
    source: {
      abi: abiName,
      address,
    },
  };
};

export const getERC20DataSource = (name: string, abiName: string, address: string) => {
  const header = getDataSourceHeader(name, abiName, address);
  const abiFilePath = `${__abis_directory_path__}${abiName}.json`;
  return {
    ...header,
    mapping: {
      kind: 'ethereum/events',
      apiVersion: '0.0.4',
      abis: [
        {
          name: abiName,
          file: abiFilePath,
        },
      ],
      entities: ['ERC20', 'ERC20Transfer'],
      eventHandlers: [
        {
          event: 'Transfer(indexed address,indexed address,uint256)',
          handler: 'handleERC20Transfer',
        },
      ],
      file: './src/mappings/transfers.ts',
      language: 'wasm/assemblyscript',
    },
  };
};

export const getERC721DataSource = (name: string, abiName: string, address: string) => {
  const header = getDataSourceHeader(name, abiName, address);
  const abiFilePath = `${__abis_directory_path__}${abiName}.json`;
  return {
    ...header,
    mapping: {
      kind: 'ethereum/events',
      apiVersion: '0.0.4',
      abis: [
        {
          name: abiName,
          file: abiFilePath,
        },
      ],
      entities: ['ERC721', 'NFTCreated'],
      eventHandlers: [
        {
          event:
            'NFTCreated(indexed uint256,indexed address,indexed bytes32,uint256,string,string)',
          handler: 'handleCreateNFT',
        },
      ],
      file: './src/mappings/marketplace.ts',
      language: 'wasm/assemblyscript',
    },
  };
};

export const getMarketplaceDataSource = (name: string, abiName: string, address: string) => {
  const header = getDataSourceHeader(name, abiName, address);
  const abiFilePath = `${__abis_directory_path__}${abiName}.json`;
  return {
    ...header,
    mapping: {
      kind: 'ethereum/events',
      apiVersion: '0.0.4',
      abis: [
        {
          name: abiName,
          file: abiFilePath,
        },
      ],
      entities: ['Marketplace', 'NFTBought'],
      eventHandlers: [
        {
          event: 'NFTBought(indexed address,indexed address,indexed uint256)',
          handler: 'handleNFTBought',
        },
      ],
      file: './src/mappings/marketplace.ts',
      language: 'wasm/assemblyscript',
    },
  };
};
