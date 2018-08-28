import { fetch } from 'apollo-server-env';
import { buildGetMock } from 'apollos-church-api/src/utils/testUtils';

import RockConstants from '../rock-constants';

describe('RockConstants', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });
  it("creates a Channel if it doesn't exist", async () => {
    const dataSource = new RockConstants();
    dataSource.get = buildGetMock([[], { Id: 1 }], dataSource);
    dataSource.post = buildGetMock('1', dataSource);
    const result = await dataSource.interactionChannel();
    expect(result).toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
    expect(dataSource.post.mock.calls).toMatchSnapshot();
  });
  it('finds the Channel if it exists', async () => {
    const dataSource = new RockConstants();
    dataSource.get = buildGetMock([{ Id: 1 }], dataSource);
    dataSource.post = jest.fn();
    const result = await dataSource.interactionChannel();
    expect(result).toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
    expect(dataSource.post.mock.calls.length).toBe(0);
  });
  it("creates a Component if it doesn't exist", async () => {
    const dataSource = new RockConstants();
    dataSource.get = buildGetMock([[], { Id: 1 }], dataSource);
    dataSource.post = buildGetMock('1', dataSource);
    const result = await dataSource.interactionComponent();
    expect(result).toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
    expect(dataSource.post.mock.calls).toMatchSnapshot();
  });
  it('finds the Component if it exists', async () => {
    const dataSource = new RockConstants();
    dataSource.get = buildGetMock([{ Id: 1 }], dataSource);
    dataSource.post = jest.fn();
    const result = await dataSource.interactionComponent();
    expect(result).toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
    expect(dataSource.post.mock.calls.length).toBe(0);
  });
  it('finds a ContentItem model ID', async () => {
    const dataSource = new RockConstants();
    dataSource.get = buildGetMock([{ Id: 1 }], dataSource);
    const result = await dataSource.modelTypeId('ContentItem');
    expect(result).toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });
  it('finds a UniversalContentItem model ID', async () => {
    const dataSource = new RockConstants();
    dataSource.get = buildGetMock([{ Id: 1 }], dataSource);
    const result = await dataSource.modelTypeId('UniversalContentItem');
    expect(result).toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });
  it('Throws when finding an unknown model ', () => {
    const dataSource = new RockConstants();
    dataSource.get = buildGetMock([{ Id: 1 }], dataSource);
    const prom = dataSource.modelTypeId('IDontExist');
    expect(prom).rejects.toEqual(
      new Error('IDontExist has not been mapped into a Rock type!')
    );
  });
});
