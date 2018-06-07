import { createCursor, parseCursor } from '../../utils/cursor';

export default class RockModel {
  constructor(context) {
    this.context = context;
  }

  /**
   * When inheriting from a RockModel, be sure to set the `resource` name to the
   * corresponding resource in Rock. Such as `resource = ContentChannels`
   * This directly maps to the API path used for requests: `/api/ContentChannels`
   */
  resource = null;

  /**
   * Initializes a rock request
   * Chain the return with methods available in RockRequest
   *
   * ```
   * this.request().find('id')
   * this.request().filter('SomeFilter eq SomeValue`).top(5).skip(10).get()
   * // ... etc
   * ```
   *
   * @returns {object} Instance of RockRequest
   */
  request() {
    if (!this.resource)
      throw new Error('Please set a resource string on your RockModel');
    return this.context.connectors.Rock.request(this.resource);
  }

  /**
   * paginate a rock request.
   * Returns the shape of the standard connector syntax we use in GraphQL schemas:
   *
   * ```
   * {
   *  edges: [
   *    {
   *      node: { ... },
   *      cursor: Str,
   *    }
   *  ],
   *  # TODO: totalCount: Int
   * }
   * ```
   *
   * @param {object} param Named request parameters
   * @param {object} param.cursor A RequestBuilder cursor to fetch results
   * @param {object} param.input The input supplied to the graphql query
   * @param {string} param.input.after
   * @param {number} param.input.first
   * @returns {object}
   */
  paginate = async ({ cursor, input: { after, first = 20 } = {} }) => {
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
      .top(first)
      .skip(skip)
      .transform((result) =>
        result.map((node, i) => ({
          node,
          cursor: createCursor({ position: i + skip }),
        }))
      )
      .get();

    return {
      edges,
    };
  };
}
