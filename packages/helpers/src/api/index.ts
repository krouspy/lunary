import { HttpRequest } from './http';

interface SmartContract {
  contractType: string;
  name: string;
  abi: string;
  address: string;
}

export class Api {
  private readonly httpClient: HttpRequest;

  constructor(baseUri: string | undefined) {
    this.httpClient = new HttpRequest(baseUri);
  }

  async getAllSmartContractsInfo(): Promise<SmartContract[]> {
    return this.httpClient
      .get('/api/smart-contracts')
      .then(({ result }) => result)
      .catch(console.error);
  }

  async getERC20ContractInfo(): Promise<SmartContract> {
    return this.httpClient
      .get('/api/smart-contract/erc20')
      .then(({ result }) => result)
      .catch(console.error);
  }

  async getERC721ContractInfo(): Promise<SmartContract> {
    return this.httpClient
      .get('/api/smart-contract/erc721')
      .then(({ result }) => result)
      .catch(console.error);
  }

  async getMarketplaceContractInfo(): Promise<SmartContract> {
    return this.httpClient
      .get('/api/smart-contract/marketplace')
      .then(({ result }) => result)
      .catch(console.error);
  }

  async registerOneContract(contractType: string, name: string, address: string, abi: object) {
    const body = { contractType, name, address, abi: JSON.stringify(abi) };
    return this.httpClient.post('/api/smart-contract', body).catch(console.error);
  }
}
