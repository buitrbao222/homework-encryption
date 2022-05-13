// init_key() -> public_key, private_key
// encrypt(msg, public_key) -> en_msg
// decrypt(en_msg, private_key) -> msg

const BigInt = require('big-integer');

function gcd(a, b) {
  return BigInt.gcd(a, b);
}

function gen_key(q) {
  let key = random(BigInt(10).pow(20), q);
  while (parseInt(gcd(q, key)) != 1) {
    key = random(BigInt(10).pow(20), q);
  }
  return key;
}

export function generateKeys() {
  let q = random(BigInt(10).pow(20), BigInt(10).pow(50));
  let g = random(2, q);
  let k1 = gen_key(q); // private
  let h = power(g, k1, q);
  let k2 = gen_key(q); // public
  let p = power(g, k2, q);

  return {
    publicKey: `${q}.${h}.${g}.${k2}`,
    privateKey: `${p}.${k1}.${q}`,
  };
}

function power(a, b, c) {
  return BigInt(a).modPow(b, c);
}

export function encrypt(msg, public_key) {
  let [q, h, g, k] = public_key.split('.').map(i => BigInt(i));
  let en_msg = [];
  let s = power(h, k, q);

  for (let i = 0; i < msg.length; i++) {
    en_msg.push(msg[i]);
  }

  for (let i = 0; i < en_msg.length; i++) {
    en_msg[i] = s.multiply(en_msg[i].charCodeAt());
  }
  return en_msg;
}

export function decrypt(en_msg, private_key) {
  let [p, key, q] = private_key.split('.').map(i => BigInt(i));
  let dr_msg = '';
  let h = power(p, key, q);
  for (let i = 0; i < en_msg.length; i++) {
    dr_msg += String.fromCharCode(BigInt(en_msg[i]).divide(h));
  }
  return dr_msg;
}

function main() {
  let msg = 'encryption';
  console.log('Original message: ', msg);

  let { publicKey, privateKey } = generateKeys();
  console.log('Public Key: ', publicKey);
  console.log('Private Key: ', privateKey);
  let en_msg = encrypt(msg, publicKey);
  let dr_msg = decrypt(en_msg, privateKey);
  console.log('Decrypted Message: ', dr_msg);
}

function random(min, max) {
  return BigInt.randBetween(min, max);
}

main();
