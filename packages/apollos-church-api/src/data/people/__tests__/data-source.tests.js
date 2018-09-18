import { buildGetMock } from 'apollos-church-api/src/utils/testUtils';
import Person from '../data-source';

const auth = (dataSource) => ({
  getCurrentPerson: buildGetMock(
    { Id: 51, FirstName: 'Vincent', LastName: 'Wilson' },
    dataSource
  ),
});
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

  it("updates a user's profile attributes", () => {
    const dataSource = new Person();
    const Auth = auth(dataSource);
    dataSource.context = {
      rockCookie: 'fakeCookie',
      dataSource: { Auth },
    };
    dataSource.patch = buildGetMock({}, dataSource);
    const result = dataSource.updateProfile({
      field: 'FirstName',
      value: 'Nick',
    });
    expect(result).resolves.toMatchSnapshot();
    expect(Auth.getCurrentPerson.mock.calls).toMatchSnapshot();
    expect(dataSource.patch.mock.calls).toMatchSnapshot();
  });

  it("uploads a user's profile picture", async () => {
    const dataSource = new Person();
    dataSource.context = { rockCookie: 'fakeCookie' };
    dataSource.updateProfile = buildGetMock(
      { Id: 51, FirstName: 'Vincent', LastName: 'Wilson' },
      dataSource
    );
    dataSource.nodeFetch = buildGetMock({ text: () => '245' }, dataSource);

    const result = await dataSource.uploadProfileImage({ stream: '123' }, 456);
    expect(result).toMatchSnapshot();
    const nodeFetchCalls = dataSource.nodeFetch.mock.calls;
    // Remove randomly generated multipart boundary.
    nodeFetchCalls[0][1].body._boundary = nodeFetchCalls[0][1].body._boundary.replace(
      /\d+/,
      ''
    );
    nodeFetchCalls[0][1].body._streams[0] = nodeFetchCalls[0][1].body._streams[0].replace(
      /\d+/,
      ''
    );
    nodeFetchCalls[0][1].headers['content-type'] = nodeFetchCalls[0][1].headers[
      'content-type'
    ].replace(/\d+/, '');
    expect(nodeFetchCalls).toMatchSnapshot();
    expect(dataSource.updateProfile.mock.calls).toMatchSnapshot({});
  });
});
