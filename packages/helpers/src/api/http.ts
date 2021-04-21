import fetch from 'node-fetch';

export class HttpRequest {
  // check that string | undefined
  private readonly baseUri: string | undefined;
  private readonly options: any;

  // check that string | undefined
  constructor(baseUri: string | undefined) {
    this.baseUri = baseUri;
    this.options = {
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    };
  }

  private getFullUri(endpoint: string) {
    return this.baseUri + endpoint;
  }

  async get(endpoint: string) {
    const options = {
      method: 'GET',
      ...this.options,
    };
    const url = this.getFullUri(endpoint);
    return fetch(url, options).then(res => res.json());
  }

  async post(endpoint: string, body: string | object) {
    if (typeof body === 'object') {
      body = JSON.stringify(body);
    }

    const options = {
      method: 'POST',
      body,
      ...this.options,
    };

    const url = this.getFullUri(endpoint);
    return fetch(url, options).then(res => res.json());
  }

  async put(endpoint: string, body: string | object) {
    if (typeof body === 'object') {
      body = JSON.stringify(body);
    }

    const options = {
      method: 'PUT',
      body,
      ...this.options,
    };

    const url = this.getFullUri(endpoint);
    return fetch(url, options).then(res => res.json());
  }

  async delete(endpoint: string) {
    const options = {
      method: 'DELETE',
      ...this.options,
    };

    const url = this.getFullUri(endpoint);
    return fetch(url, options).then(res => res.json());
  }
}
