import casual from 'casual';
import Node, { createGlobalId, parseGlobalId } from '../model';

describe('Node', () => {
  it('`createGlobalId` should take two arguments and return a string', () => {
    const id = casual.word;
    const type = casual.word;

    expect(typeof createGlobalId(id, type)).toEqual('string');
  });

  it('`createGlobalId` should be decodeable by `parseGlobalId`', () => {
    const id = casual.word;
    const __type = casual.word;
    const globalId = createGlobalId(id, __type);

    expect(parseGlobalId(globalId)).toEqual({
      __type,
      id,
    });
  });

  it('`parseGlobalId` should take a global id and return the type and id', () => {
    const id = casual.word;
    const __type = casual.word;
    const globalId = createGlobalId(id, __type);

    expect(parseGlobalId(globalId)).toEqual({
      __type,
      id,
    });
  });

  it('`parseGlobalId` should throw an error if ID is invalid', () => {
    expect(() => parseGlobalId('blah-blah')).toThrow();
  });

  it('Node class should parse an encoded id to get the type to resolve', async () => {
    const id = casual.word;
    const __type = 'Test';
    const globalId = createGlobalId(id, __type);

    const dataSources = {
      Test: {
        getFromId(_id) {
          expect(_id).toEqual(id);
          return {};
        },
      },
    };

    const node = new Node();
    node.get(globalId, dataSources);
  });

  it("Node class should throw error if it can't find a matching model", async () => {
    const id = casual.word;
    const __type = 'NoModel';
    const globalId = createGlobalId(id, __type);

    const node = new Node({});
    expect(node.get(globalId)).rejects.toBeDefined();
  });

  it("Node class doesn't assign __type if model returns falsey", async () => {
    const id = casual.word;
    const __type = 'Test';
    const globalId = createGlobalId(id, __type);

    const dataSources = {
      Test: {
        getFromId() {
          return '';
        },
      },
    };

    const node = new Node(dataSources);
    const record = node.get(globalId);
    expect(record).not.toHaveProperty('__type');
  });

  it('Node class should return data from the models `getFromId` method', async () => {
    const id = casual.word;
    const __type = 'Test';
    const globalId = createGlobalId(id, __type);
    const data = {
      test: casual.word,
    };

    const dataSources = {
      Test: {
        getFromId() {
          return Promise.resolve(data);
        },
      },
    };

    const node = new Node();
    const result = await node.get(globalId, dataSources);

    expect(result.test).toEqual(data.test);
  });

  it('Node class should attach the __type to the resulting data', async () => {
    const id = casual.word;
    const __type = 'Test';
    const globalId = createGlobalId(id, __type);
    const data = {
      test: casual.word,
    };

    const dataSources = {
      Test: {
        getFromId() {
          return Promise.resolve(data);
        },
      },
    };

    const node = new Node();
    const result = await node.get(globalId, dataSources);

    expect(result.__type).toEqual(__type);
  });
});
