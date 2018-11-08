import { fetch } from 'apollo-server-env';
import ApollosConfig from '@apollosproject/config';
import { buildGetMock } from '../../../utils/testUtils';

import ContentItemsDataSource from '../data-source';

ApollosConfig.loadJs({
  ROCK: {
    API_URL: 'https://apollosrock.newspring.cc/api',
    API_TOKEN: 'some-rock-token',
    IMAGE_URL: 'https://apollosrock.newspring.cc/GetImage.ashx',
  },
});

describe('ContentItemsModel', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it('constructs', () => {
    expect(new ContentItemsDataSource()).toBeTruthy();
  });
  it('filters by content channel id', () => {
    const dataSource = new ContentItemsDataSource();
    dataSource.get = buildGetMock([{ Id: 1 }, { Id: 2 }], dataSource);
    const result = dataSource.byContentChannelId(1).get();
    expect(result).resolves.toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });

  it('gets by id', () => {
    const dataSource = new ContentItemsDataSource();
    dataSource.get = buildGetMock({ Id: 1 }, dataSource);
    const result = dataSource.getFromId(1);
    expect(result).resolves.toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });

  it('gets a cursor finding child content items of a provided parent', async () => {
    const dataSource = new ContentItemsDataSource();
    dataSource.get = buildGetMock(
      [
        [
          { ChildContentChannelItemId: 101 },
          { ChildContentChannelItemId: 201 },
        ],
        [{ Id: 1 }, { Id: 2 }],
      ],
      dataSource
    );
    const cursor = await dataSource.getCursorByParentContentItemId(1);
    expect(cursor.get()).resolves.toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });

  it('returns null when there are no child content items', async () => {
    const dataSource = new ContentItemsDataSource();
    dataSource.get = buildGetMock([], dataSource);
    const cursor = await dataSource.getCursorByParentContentItemId(1);
    expect(cursor).toBe(null);
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });

  it('gets a cursor finding parent content items of a provided child', async () => {
    const dataSource = new ContentItemsDataSource();
    dataSource.get = buildGetMock(
      [
        [{ ContentChannelItemId: 101 }, { ContentChannelItemId: 201 }],
        [{ Id: 1 }, { Id: 2 }],
      ],
      dataSource
    );
    const cursor = await dataSource.getCursorByChildContentItemId(1);
    expect(cursor.get()).resolves.toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });

  it('gets a cursor finding sibling content items of a provided item', async () => {
    const dataSource = new ContentItemsDataSource();
    dataSource.get = buildGetMock(
      [
        [{ ContentChannelItemId: 101 }],
        [
          { ContentChannelId: 201, ChildContentChannelItemId: 1 },
          { ContentChannelId: 202, ChildContentChannelItemId: 2 },
        ],
        [{ Id: 1 }, { Id: 2 }],
      ],
      dataSource
    );
    const cursor = await dataSource.getCursorBySiblingContentItemId(1);
    expect(cursor.get()).resolves.toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });

  it('returns null when there are no parent content items', async () => {
    const dataSource = new ContentItemsDataSource();
    dataSource.get = buildGetMock([], dataSource);
    const cursor = await dataSource.getCursorByChildContentItemId(1);
    expect(cursor).toBe(null);
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });
});
