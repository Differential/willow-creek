import withQuery from 'with-query';

// Simple request builder for querying the Rock API.
// Would probably work against most OData APIs, but built to just
// tackle the specific needs of Apollos on top of Rock.
export default class RockRequestBuilder {
  constructor({ connector, resource, defaultOptions = null }) {
    this.connector = connector;
    this.resource = resource;
    if (defaultOptions) {
      this.query = defaultOptions;
    }
  }

  query = {};
  transforms = [];

  get path() {
    let path = [this.resource];
    if (this.resourceId) path.push(this.resourceId);
    path = path.join('/');
    path = withQuery(path, this.query);
    return path;
  }

  /**
   * Sends a GET request to the server, resolves with results
   * @returns promise
   */
  get = ({ options = {}, body = {} } = {}) =>
    this.connector.get(this.path, body, options).then((results) => {
      if (this.transforms.length)
        return this.transforms.reduce(
          (current, transformer) => transformer(current),
          results
        );
      return results;
    });

  /**
   * Find a single resource by ID
   */
  find = (id) => {
    this.resourceId = id;
    return this;
  };

  /**
   * Filter resources by an odata string
   */
  filter = (filter) => {
    const key = '$filter';
    if (this.query[key]) {
      this.query[key] = `(${this.query[key]}) or (${filter})`;
    } else {
      this.query[key] = filter;
    }
    return this;
  };

  /**
   * Expands resources inline
   */
  expand = (expand) => {
    let { $expand } = this.query;
    if (!$expand) {
      $expand = [];
    } else {
      $expand = $expand.split(',');
    }
    $expand.push(expand);
    this.query.$expand = $expand.join(',');
    return this;
  };

  /**
   * Order resources by a given attribute and direction
   * @param {string} name The name of the attribute to order by
   * @param {string} direction The direction to order results by. Defaults to 'asc'
   */
  orderBy = (name, direction = 'asc') => {
    this.query.$orderby = `${name} ${direction}`;
    return this;
  };

  /**
   * Only return the top N results. Used for pagination
   * @param {number} top
   */
  top = (top) => {
    this.query.$top = top;
    return this;
  };

  /**
   * Skip the first N results. Used for pagination
   * @param {number} skip
   */
  skip = (skip) => {
    this.query.$skip = skip;
    return this;
  };

  /**
   * Transform the shape of the results.
   * This is ran _after_ data is requested and not
   * affected by other methods that are chained to the request
   */
  transform = (func) => {
    this.transforms.push(func);
    return this;
  };
}
