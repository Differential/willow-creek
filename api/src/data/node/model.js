import Crypto from 'crypto';

const secret = process.env.SECRET || 'LZEVhlgzFZKClu1r';

export function createGlobalId(id, type) {
  const cipher = Crypto.createCipher('aes192', secret);

  let encrypted = cipher.update(`${type}:${id}`, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encodeURI(encrypted);
}

export function parseGlobalId(encodedId) {
  try {
    const decipher = Crypto.createDecipher('aes192', secret);

    let decrypted = decipher.update(decodeURI(encodedId), 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    const [__type, id] = decrypted.toString().split(':');
    return {
      __type,
      id,
    };
  } catch (e) {
    throw new Error('Error parsing ID');
  }
}

export default class Node {
  constructor(context) {
    this.models = context.models;
  }

  // TODO: what do we want to do about errors here?
  async get(encodedId) {
    const { __type, id } = parseGlobalId(encodedId);

    if (
      !this.models ||
      !this.models[__type] ||
      !this.models[__type].getFromId
    ) {
      throw new Error(`No model found using ${__type}`);
    }

    const data = await this.models[__type].getFromId(id, encodedId);
    if (data) data.__type = __type;
    return data;
  }
}
