import { buildGetMock } from '/api/utils/testUtils';
import Person from '../data-source';

describe('Person', () => {
  it('constructs', () => {
    expect(new Person()).toBeTruthy();
  });
  it('gets person from email', () => {
    const dataSource = new Person();
    dataSource.get = buildGetMock(
      { Email: 'isaac.hardy@newspring.cc' },
      dataSource
    );
    const result = dataSource.getFromEmail('isaac.hardy@newspring.cc');
    expect(result).resolves.toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });

  it('gets person from id', () => {
    const dataSource = new Person();
    dataSource.get = buildGetMock({ Id: 51 }, dataSource);
    const result = dataSource.getFromId(51);
    expect(result).resolves.toMatchSnapshot();
    expect(dataSource.get.mock.calls).toMatchSnapshot();
  });
});
