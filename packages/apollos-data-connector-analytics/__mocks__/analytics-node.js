export const mockTrack = jest.fn();
export const mockIdentify = jest.fn();
const mock = jest
  .fn()
  .mockImplementation(() => ({ track: mockTrack, identify: mockIdentify }));

export default mock;
