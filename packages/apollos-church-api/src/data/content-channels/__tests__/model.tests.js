import ApollosConfig from '@apolloschurch/config';
import { buildGetMock } from '../../../utils/testUtils';
import ContentChannelDataSource from '../data-source';

ApollosConfig.loadJs({
  ROCK: {
    API_URL: 'https://apollosrock.newspring.cc/api',
    API_TOKEN: 'some-rock-token',
    IMAGE_URL: 'https://apollosrock.newspring.cc/GetImage.ashx',
  },
});

describe('ContentChannelModel', () => {
  it('constructs', () => {
    expect(new ContentChannelDataSource()).toBeTruthy();
  });
  it('gets all', () => {
    const dataSource = new ContentChannelDataSource();
    dataSource.get = buildGetMock([{ Id: 1 }, { Id: 2 }], dataSource);
    const result = dataSource.all();
    expect(result).resolves.toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });

  it('gets by id', () => {
    const dataSource = new ContentChannelDataSource();
    dataSource.get = buildGetMock([{ Id: 1 }], dataSource);
    const result = dataSource.getFromId(1);
    expect(result).resolves.toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });
});
