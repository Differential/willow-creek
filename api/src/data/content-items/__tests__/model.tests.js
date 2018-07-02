import fetch from 'isomorphic-fetch';
import ContentItemsModel from '../model';
import RockConnector from '../../../connectors/rock';

describe('ContentItemsModel', () => {
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
    expect(new ContentItemsModel()).toBeTruthy();
  });
  it('filters by content channel id', () => {
    fetch.mockResponse(JSON.stringify([{ Id: 1 }, { Id: 2 }]));
    const model = new ContentItemsModel(context);
    const result = model.byContentChannelId(1).get();
    expect(result).resolves.toMatchSnapshot();
    expect(fetch.mock.calls).toMatchSnapshot();
  });

  it('gets by id', () => {
    fetch.mockResponse(JSON.stringify({ Id: 1 }));
    const model = new ContentItemsModel(context);
    const result = model.getFromId(1);
    expect(result).resolves.toMatchSnapshot();
    expect(fetch.mock.calls).toMatchSnapshot();
  });

  it('gets a cursor finding child content items of a provided parent', async () => {
    fetch.mockResponseOnce(
      JSON.stringify([
        { ChildContentChannelItemId: 101 },
        { ChildContentChannelItemId: 201 },
      ])
    );
    fetch.mockResponseOnce(JSON.stringify([{ Id: 1 }, { Id: 2 }]));
    const model = new ContentItemsModel(context);
    const cursor = await model.getCursorByParentContentItemId(1);
    expect(cursor.get()).resolves.toMatchSnapshot();
    expect(fetch.mock.calls).toMatchSnapshot();
  });

  it('returns null when there are no child content items', async () => {
    fetch.mockResponseOnce(JSON.stringify([]));
    const model = new ContentItemsModel(context);
    const cursor = await model.getCursorByParentContentItemId(1);
    expect(cursor).toBe(null);
    expect(fetch.mock.calls).toMatchSnapshot();
  });

  it('gets a cursor finding parent content items of a provided child', async () => {
    fetch.mockResponseOnce(
      JSON.stringify([
        { ContentChannelItemId: 101 },
        { ContentChannelItemId: 201 },
      ])
    );
    fetch.mockResponseOnce(JSON.stringify([{ Id: 1 }, { Id: 2 }]));
    const model = new ContentItemsModel(context);
    const cursor = await model.getCursorByChildContentItemId(1);
    expect(cursor.get()).resolves.toMatchSnapshot();
    expect(fetch.mock.calls).toMatchSnapshot();
  });

  it('returns null when there are no parent content items', async () => {
    fetch.mockResponseOnce(JSON.stringify([]));
    const model = new ContentItemsModel(context);
    const cursor = await model.getCursorByChildContentItemId(1);
    expect(cursor).toBe(null);
    expect(fetch.mock.calls).toMatchSnapshot();
  });
});
