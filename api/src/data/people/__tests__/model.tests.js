import fetch from 'isomorphic-fetch';
import RockConnector from '/api/connectors/rock';
import Person from '../model';

describe('Person', () => {
  let context;
  beforeEach(() => {
    fetch.resetMocks();
    context = {
      connectors: {
        Rock: new RockConnector(),
      },
    };
  });
  it('constructs', () => {
    expect(new Person()).toBeTruthy();
  });
  it('gets person from email', () => {
    fetch.mockResponse(JSON.stringify({ Email: 'isaac.hardy@newspring.cc' }));
    const model = new Person(context);
    const result = model.getFromEmail('isaac.hardy@newspring.cc');
    expect(result).resolves.toMatchSnapshot();
    expect(fetch.mock.calls).toMatchSnapshot();
  });

  it('gets person from id', () => {
    fetch.mockResponse(JSON.stringify({ Id: 51 }));
    const model = new Person(context);
    const result = model.getFromId(51);
    expect(result).resolves.toMatchSnapshot();
    expect(fetch.mock.calls).toMatchSnapshot();
  });
});
