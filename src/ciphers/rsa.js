const bigInt = require('big-integer');

function randomPrime(bits) {
  const min = bigInt.one.shiftLeft(bits - 1);
  const max = bigInt.one.shiftLeft(bits).prev();

  while (true) {
    let p = bigInt.randBetween(min, max);
    if (p.isProbablePrime(256)) {
      return p;
    }
  }
}

export function generateKeys(keysize) {
  const e = bigInt(65537);
  let p;
  let q;
  let totient;

  do {
    p = randomPrime(keysize / 2);
    q = randomPrime(keysize / 2);
    totient = bigInt.lcm(p.prev(), q.prev());
  } while (
    bigInt.gcd(e, totient).notEquals(1) ||
    p
      .minus(q)
      .abs()
      .shiftRight(keysize / 2 - 100)
      .isZero()
  );
  const [n, d] = [p.multiply(q), e.modInv(totient)];
  return {
    publicKey: `${n}.${e}`,
    privateKey: `${n}.${d}`,
  };
}

export function encrypt(msg, publicKey) {
  const [n, e] = publicKey.split('.').map(s => bigInt(s));
  return bigInt(encode(msg)).modPow(e, n);
}

export function decrypt(encryptedMsg, privateKey) {
  const [n, d] = privateKey.split('.').map(s => bigInt(s));
  return decode(bigInt(encryptedMsg).modPow(d, n));
}

function encode(str) {
  const codes = str
    .split('')
    .map(i => i.charCodeAt())
    .join('');

  return bigInt(codes);
}

function decode(code) {
  const stringified = code.toString();
  let string = '';

  for (let i = 0; i < stringified.length; i += 2) {
    let num = Number(stringified.substr(i, 2));

    if (num <= 30) {
      string += String.fromCharCode(Number(stringified.substr(i, 3)));
      i++;
    } else {
      string += String.fromCharCode(num);
    }
  }

  return string;
}

// Message
const message = 'Hello, World!';

// Generate RSA keys
const keys = generateKeys(250);

console.log('Keys');
console.log('Public:', keys.publicKey);
console.log('Private:', keys.privateKey);

const encrypted_message = encrypt(message, keys.publicKey);
const decrypted_message = decrypt(encrypted_message, keys.privateKey);

console.log('Message:', message);
console.log('Encrypted:', encrypted_message.toString());
console.log('Decrypted:', decrypted_message.toString());
