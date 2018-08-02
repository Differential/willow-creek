import fetch from 'isomorphic-fetch';
import RockConnector from '/api/connectors/rock';
import ContentChannelModel from '../model';

describe('ContentChannelModel', () => {
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
    expect(new ContentChannelModel()).toBeTruthy();
  });
  it('gets all', () => {
    fetch.mockResponse(JSON.stringify([{ Id: 1 }, { Id: 2 }]));
    const model = new ContentChannelModel(context);
    const result = model.all();
    expect(result).resolves.toMatchSnapshot();
    expect(fetch.mock.calls).toMatchSnapshot();
  });

  it('gets by id', () => {
    fetch.mockResponse(JSON.stringify([{ Id: 1 }]));
    const model = new ContentChannelModel(context);
    const result = model.getFromId(1);
    expect(result).resolves.toMatchSnapshot();
    expect(fetch.mock.calls).toMatchSnapshot();
  });
});
