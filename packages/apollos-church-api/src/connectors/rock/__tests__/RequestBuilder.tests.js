import RequestBuilder from '../RequestBuilder';

describe('RequestBuilder', () => {
  let request;
  let connector;
  let get;

  beforeEach(() => {
    get = jest.fn((...args) => new Promise((resolve) => resolve(args)));
    connector = { get };
    request = new RequestBuilder({
      connector,
      resource: 'SomeResource',
    });
  });

  it('constructs', () => {
    expect(request).toBeTruthy();
  });

  it('gets requests', () => {
    expect(request.get()).resolves.toMatchSnapshot();
  });

  it('finds by id', () => {
    expect(request.find(1).get()).resolves.toMatchSnapshot();
  });

  it('filters', () => {
    expect(
      request.filter('Something eq SomethingElse').get()
    ).resolves.toMatchSnapshot();
  });

  it('chains multiple filters', () => {
    expect(
      request
        .filter('A eq Ab')
        .filter('B eq Bc')
        .get()
    ).resolves.toMatchSnapshot();
  });

  it('expands', () => {
    expect(request.expand('Puppies').get()).resolves.toMatchSnapshot();
  });

  it('chains multiple expands', () => {
    expect(
      request
        .expand('Puppies')
        .expand('Cats')
        .get()
    ).resolves.toMatchSnapshot();
  });

  it('chains mixed-format expands', () => {
    expect(
      request
        .expand('Dogs/Puppies')
        .expand('Cats,Kittens')
        .get()
    ).resolves.toMatchSnapshot();
  });

  it('allows for pagination', () => {
    expect(
      request
        .top(2)
        .skip(5)
        .get()
    ).resolves.toMatchSnapshot();
  });

  it('caches', () => {
    expect(request.cache({ ttl: 20 }).get()).resolves.toMatchSnapshot();
  });

  it('orders', () => {
    expect(request.orderBy('MyField').get()).resolves.toMatchSnapshot();
  });

  it('orders in custom order', () => {
    expect(request.orderBy('MyField', 'desc').get()).resolves.toMatchSnapshot();
  });

  it('transforms result shapes', () => {
    get = jest.fn(() => new Promise((resolve) => resolve({ a: 'yo' })));
    connector = { get };
    request = new RequestBuilder({
      connector,
      resource: 'SomeResource',
    });

    expect(
      request
        .transform((input) => {
          expect(input).toMatchSnapshot();
          return { b: 'neigh' };
        })
        .get()
    ).resolves.toMatchSnapshot();
  });
});
