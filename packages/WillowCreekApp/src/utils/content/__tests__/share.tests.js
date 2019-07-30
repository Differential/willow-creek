import { Platform, Share } from 'react-native';
import share from '../share';

jest.mock('Platform');
jest.mock('Share');

describe('the share function', () => {
  beforeAll(() => {
    Share.share = jest.fn();
  });
  test('default arguments', () => {
    Platform.OS = 'ios';
    share({ title: 'title', url: 'http://url.com' });
    expect(Share.share).toBeCalledWith({
      title: 'title',
      message: 'title',
      url: 'http://url.com',
    });
  });
  test('android arguments', () => {
    Platform.OS = 'android';
    share({ title: 'title', url: 'http://url.com' });
    expect(Share.share).toBeCalledWith({
      title: 'title',
      message: 'title\nhttp://url.com',
      url: 'http://url.com',
    });
  });
});
