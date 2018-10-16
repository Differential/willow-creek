import { createCursor } from '../../../utils/cursor';
import RestDataSource from '../data-source';
import RequestBuilder from '../RequestBuilder';

describe('RestDataSource', () => {
  it('constructs', () => {
    expect(new RestDataSource()).toBeTruthy();
  });

  describe('the paginate method', () => {
    let get;
    let dataSource;
    beforeEach(() => {
      get = jest.fn();
      get.mockReturnValue(new Promise((resolve) => resolve([1, 2, 3])));
      dataSource = new RestDataSource();
      dataSource.request = (resource) =>
        new RequestBuilder({
          resource,
          connector: { get },
        });
    });

    it('paginates a cursor', () => {
      const cursor = dataSource.request('TestResource');
      const result = dataSource.paginate({ cursor });
      expect(result).toBeTruthy();
      expect(get.mock.calls[0][0]).toBe('TestResource?%24top=20&%24skip=0');
    });

    it('skips pages', () => {
      const cursor = dataSource.request('TestResource');
      const after = createCursor({ position: 25 });
      const result = dataSource.paginate({ cursor, args: { after } });
      expect(result).toBeTruthy();
      expect(get.mock.calls[0][0]).toBe('TestResource?%24top=20&%24skip=26');
    });

    it('throws on an invalid `after` cursor', () => {
      const cursor = dataSource.request('TestResource');
      const after = createCursor({ position: 25 });
      const result = dataSource.paginate({ cursor, args: { after } });
      expect(result).rejects.toThrow();
    });

    it('sets page size', () => {
      const cursor = dataSource.request('TestResource');
      const result = dataSource.paginate({ cursor, args: { first: 2 } });
      expect(result).toBeTruthy();
      expect(get.mock.calls[0][0]).toBe('TestResource?%24top=2&%24skip=0');
    });
  });
});
