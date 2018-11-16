export const mockUA = jest.fn();
export const mockEvent = jest.fn();
export const mockSend = jest.fn();

function event(...args) {
  mockEvent(args);
  return { send: mockSend };
}

export default function(...args) {
  mockUA(args);
  return {
    event,
  };
}
