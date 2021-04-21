import { __abis_directory_path__ } from '../../constants';
import { getERC20DataSource, getERC721DataSource, getMarketplaceDataSource } from './dataSource';

interface SmartContract {
  contractType: string;
  name: string;
  abi: string;
  address: string;
}

const subgraph = {
  specVersion: '0.0.1',
  description: 'Subgraph that indexes Lunary data',
  repository: 'https://github.com/krouspy/the-graph-test',
  schema: {
    file: './schema.graphql',
  },
  dataSources: [],
};

export const getSubgraph = (
  erc20: SmartContract,
  erc721: SmartContract,
  marketplace: SmartContract,
) => {
  const result = subgraph;

  const erc20DataSource = getERC20DataSource(erc20.name, erc20.contractType, erc20.address);
  const erc721DataSource = getERC721DataSource(erc721.name, erc721.contractType, erc721.address);
  const marketplaceDataSource = getMarketplaceDataSource(
    marketplace.name,
    marketplace.contractType,
    marketplace.address,
  );

  result.dataSources.push(erc20DataSource);
  result.dataSources.push(erc721DataSource);
  result.dataSources.push(marketplaceDataSource);
  return result;
};
