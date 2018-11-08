/* eslint-disable class-methods-use-this */
import { RESTDataSource } from 'apollo-datasource-rest';
import ApollosConfig from '@apollosproject/config';

import { mapKeys, mapValues, camelCase } from 'lodash';
import { fetch } from 'apollo-server-env';
import { createCursor, parseCursor } from './cursor';

import RequestBuilder from './request-builder';

const { ROCK } = ApollosConfig;

export default class RockApolloDataSource extends RESTDataSource {
  // Subclasses can set this to true to force all requests to turn extended responses.
  expanded = false;

  baseURL = ROCK.API_URL;

  rockToken = ROCK.API_TOKEN;

  nodeFetch = fetch;

  didReceiveResponse(response, request) {
    // Can't use await b/c of `super` keyword
    return super
      .didReceiveResponse(response, request)
      .then((parsedResponse) => this.normalize(parsedResponse));
  }

  willSendRequest(request) {
    request.headers.set('Authorization-Token', this.rockToken);
    request.headers.set('user-agent', 'Apollos');
    request.headers.set('Content-Type', 'application/json');
  }

  normalize = (data) => {
    if (Array.isArray(data)) return data.map(this.normalize);
    if (typeof data !== 'object') return data;
    const normalizedValues = mapValues(data, this.normalize);
    return mapKeys(normalizedValues, (value, key) => camelCase(key));
  };

  request(resource = this.resource) {
    return new RequestBuilder({
      resource,
      connector: this,
      defaultOptions: this.expanded ? { loadAttributes: 'expanded' } : null,
    });
  }

  async paginate({ cursor, args: { after, first = 20 } = {} }) {
    let skip = 0;
    if (after) {
      const parsed = parseCursor(after);
      if (parsed && Object.hasOwnProperty.call(parsed, 'position')) {
        skip = parsed.position + 1;
      } else {
        throw new Error(`An invalid 'after' cursor was provided: ${after}`);
      }
    }

    const edges = cursor
      ? cursor
          .top(first)
          .skip(skip)
          .transform((result) =>
            result.map((node, i) => ({
              node,
              cursor: createCursor({ position: i + skip }),
            }))
          )
          .get()
      : [];

    return {
      edges,
    };
  }
}
