import fetch from 'isomorphic-fetch';
import DataLoader from 'dataloader';
import urlJoin from 'url-join';
import { merge, mapKeys, mapValues, camelCase } from 'lodash';

export const eTagCache = {};

/**
 * A base-level connector for wrapping JSON-based rest APIs
 *
 * Extend from this class when creating Connectors to other APIs:
 *
 * ```
 * class RockConnector extends RestConnector {
 *   constructor() {
 *     super({
 *       baseUrl: 'https://my-awesome-rock.church.com/api',
 *     });
 *   }
 * }
 * ```
 */
export default class RestConnector {
  constructor({
    baseUrl = '',
    batch = false,
    defaultRequestOptions = {},
  } = {}) {
    this.baseUrl = baseUrl;

    this.loader = new DataLoader(this.fetchWithCacheForDataLoader, {
      batch,
    });

    this.defaultRequestOptions = merge(
      {
        headers: {
          'user-agent': 'Apollos',
          'Content-Type': 'application/json',
        },
      },
      defaultRequestOptions
    );
  }

  // Normalize a data response from the rest endpoint.
  // By default, just makes sure all keys are camelCased
  normalize = (data) => {
    if (Array.isArray(data)) return data.map(this.normalize);
    if (typeof data !== 'object') return data;
    const normalizedValues = mapValues(data, this.normalize);
    return mapKeys(normalizedValues, (value, key) => camelCase(key));
  };

  handleResponse = async ({ path, response }) => {
    const { status, statusText } = response;

    if (status === 204) {
      return null; // todo: how best to handle?
    }

    if (status >= 400) {
      const err = new Error(statusText);
      err.code = status;
      throw err;
    }

    const body = this.normalize(await response.json());
    const etag = response.headers.get('etag');
    if (etag) {
      eTagCache[path] = {
        result: body,
        etag,
      };
    }
    return body;
  };

  // Used with DataLoader to fetch resources with eTag support
  fetchWithCacheForDataLoader = (urlInput = []) => {
    let paths = urlInput;
    if (!Array.isArray(paths)) paths = [paths];

    const options = {
      headers: {},
    };

    return Promise.all(
      paths.map(async (path) => {
        const cachedRes = eTagCache[path];
        if (cachedRes && cachedRes.etag) {
          options.headers['If-None-Match'] = cachedRes.etag;
        }

        const response = await this.fetch(path, options);
        if (response.status === 304) {
          return cachedRes.result;
        }
        return this.handleResponse({ path, response });
      })
    );
  };

  fetch = (path, options) => {
    const url = urlJoin(this.baseUrl, path);
    console.log('fetching', url);
    return fetch(
      url,
      merge(
        {
          ...this.defaultRequestOptions,
        },
        options
      )
    );
  };

  get = (path) => this.loader.load(path);

  post = async (path, data, config) => {
    const response = await this.fetch(path, {
      method: 'POST',
      body: JSON.stringify(data),
      ...config,
    });
    return this.handleResponse({ path, response });
  };

  put = async (path, data, config) => {
    const response = await this.fetch(path, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...config,
    });
    return this.handleResponse({ path, response });
  };

  patch = async (path, data, config) => {
    const response = await this.fetch(path, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...config,
    });
    return this.handleResponse({ path, response });
  };
}
