import { Api, FileManager } from '@project/helpers';
import { getSubgraph } from './subgraph';
import {
  __server_base_uri__,
  __base_directory_path__,
  __abis_directory_path__,
} from '../constants';

const api = new Api(__server_base_uri__);
const fileManager = new FileManager(__base_directory_path__, __abis_directory_path__);

async function main() {
  const erc20 = await api.getERC20ContractInfo();
  const erc721 = await api.getERC721ContractInfo();
  const marketplace = await api.getMarketplaceContractInfo();

  fileManager.createDirectory(__abis_directory_path__);

  fileManager.writeAbiToJsonFile(erc20.contractType, erc20.abi);
  fileManager.writeAbiToJsonFile(erc721.contractType, erc721.abi);
  fileManager.writeAbiToJsonFile(marketplace.contractType, marketplace.abi);

  const subgraph = getSubgraph(erc20, erc721, marketplace);

  fileManager.writeSubgraphToYamlFile('subgraph', subgraph);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
