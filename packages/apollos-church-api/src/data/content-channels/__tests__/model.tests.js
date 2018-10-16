import { buildGetMock } from '../../../utils/testUtils';
import ContentChannelDataSource from '../data-source';

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
