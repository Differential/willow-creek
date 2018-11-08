import Crypto from 'crypto';

const secret = process.env.SECRET || 'LZEVhlgzFZKClu1r';

export function createGlobalId(id, type) {
  const cipher = Crypto.createCipher('aes192', secret);

  let encrypted = cipher.update(`${id}`, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${type}:${encrypted}`;
}

export function parseGlobalId(encodedId) {
  try {
    const decipher = Crypto.createDecipher('aes192', secret);

    const [__type, encryptedId] = encodedId.split(':');
    let decrypted = decipher.update(encryptedId, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    const id = decrypted.toString();
    return {
      __type,
      id,
    };
  } catch (e) {
    throw new Error('Error parsing ID');
  }
}

export default class Node {
  // eslint-disable-next-line class-methods-use-this
  async get(encodedId, dataSources) {
    const { __type, id } = parseGlobalId(encodedId);
    if (
      !dataSources ||
      !dataSources[__type] ||
      !dataSources[__type].getFromId
    ) {
      throw new Error(`No dataSource found using ${__type}`);
    }

    const data = await dataSources[__type].getFromId(id, encodedId);
    if (data) data.__type = __type;
    return data;
  }
}
