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

  // Used with DataLoader to fetch resources with eTag support
  fetchWithCacheForDataLoader = (urlInput = []) => {
    let urls = urlInput;
    if (!Array.isArray(urls)) urls = [urls];

    const options = {
      ...this.defaultRequestOptions,
    };

    return Promise.all(
      urls.map(async (url) => {
        const cachedRes = eTagCache[url];
        if (cachedRes && cachedRes.etag) {
          options.headers['If-None-Match'] = cachedRes.etag;
        }

        const response = await fetch(url, options);

        const { status, statusText } = response;

        if (status === 304) {
          return cachedRes.result;
        }

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
          eTagCache[url] = {
            result: body,
            etag,
          };
        }
        return body;
      })
    );
  };

  get = (path) => this.loader.load(urlJoin(this.baseUrl, path));
}
