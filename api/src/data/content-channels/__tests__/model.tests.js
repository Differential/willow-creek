import fetch from 'isomorphic-fetch';
import ContentChannelModel from '../model';
import RockConnector from '../../../connectors/rock';

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
