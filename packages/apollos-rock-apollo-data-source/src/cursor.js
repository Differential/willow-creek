import Crypto from 'crypto';

const secret = process.env.SECRET || 'SEfjsvoSDFnvblaE';

function createCursor(obj) {
  const str = JSON.stringify(obj);
  const cipher = Crypto.createCipher('aes192', secret);
  let encrypted = cipher.update(str, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encodeURI(encrypted);
}

function parseCursor(str) {
  try {
    const decipher = Crypto.createDecipher('aes192', secret);

    let decrypted = decipher.update(decodeURI(str), 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
  } catch (e) {
    throw new Error('Error parsing cursor');
  }
}

export { createCursor, parseCursor };
