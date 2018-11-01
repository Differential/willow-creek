import ApollosConfig from '@apolloschurch/config';
import { buildGetMock } from '../../../utils/testUtils';
import DataSource from '../data-source';

ApollosConfig.loadJs({
  ROCK: {
    API_URL: 'https://apollosrock.newspring.cc/api',
    API_TOKEN: 'some-rock-token',
    IMAGE_URL: 'https://apollosrock.newspring.cc/GetImage.ashx',
  },
});

describe('Family Data Source', () => {
  it('must fetch a users location w/ family location', async () => {
    const dataSource = new DataSource();
    dataSource.get = buildGetMock(
      [
        {
          GroupLocations: [{ Location: { City: 'Chicago', State: 'IL' } }],
          Campus: { Name: 'Main Campus' },
        },
      ],
      dataSource
    );

    const location = await dataSource.getFamilyLocation({
      userId: 'something',
    });
    expect(location).toEqual('Chicago, IL');
  });
  it('must fetch a users location w/ campus', async () => {
    const dataSource = new DataSource();
    dataSource.get = buildGetMock(
      [
        {
          GroupLocations: [],
          Campus: { Name: 'Main Campus' },
        },
      ],
      dataSource
    );

    const location = await dataSource.getFamilyLocation({
      userId: 'something',
    });
    expect(location).toEqual('Main Campus');
  });
  it('must return null without data', async () => {
    const dataSource = new DataSource();
    dataSource.get = buildGetMock([{ GroupLocations: [] }], dataSource);

    const location = await dataSource.getFamilyLocation({
      userId: 'something',
    });
    expect(location).toEqual(null);
  });
  it('raise an error without a userId', async () => {
    const dataSource = new DataSource();
    await expect(
      dataSource.getFamilyLocation({
        userId: null,
      })
    ).rejects.toThrow();
  });
});
