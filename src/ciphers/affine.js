// 𝑒k(𝑥) = ax + b mod 26
// 𝑑k(𝑦) = 𝑎 −1 (y-b) mod 26

// encipherString(plainText, a, b, 26) -> return cipherText
// decipherString(cihpherText, a, b, 26) -> return message

// encipherString("hentoithubay", 5, 6, 26) -> return "patxyuxpclgw"
// decipherString("patxyuxpclgw", 5, 6, 26) -> return "hentoithubay"

const LOWERCASE_ASCII_A = 97;

function mod(a, b) {
  return ((a % b) + b) % b;
}

function egcd(a, b) {
  if (a === 0) {
    return [b, 0, 1];
  }
  if (b === 0) {
    return [a, 1, 0];
  }
  let quotient = Math.floor(b / a);
  let remainder = b % a;
  let [g, x, y] = egcd(remainder, a);
  return [g, y - quotient * x, x];
}

function mmi(a, b) {
  let [gcd, v] = egcd(a, b);
  if (gcd === 1) {
    return mod(v, b);
  } else {
    throw new Error(`Key a: ${a} and alphabet length m: ${b} are not coprime`);
  }
}

function encipherChar(plainchar, a, b, m) {
  let plaincharNum = plainchar.charCodeAt(0) - LOWERCASE_ASCII_A;
  let ciphercharNum = a * plaincharNum + b;
  ciphercharNum = mod(ciphercharNum, m);
  return String.fromCharCode(ciphercharNum + LOWERCASE_ASCII_A);
}

function decipherChar(cipherchar, inverse, b, m) {
  let ciphercharNum = cipherchar.charCodeAt(0) - LOWERCASE_ASCII_A;
  let plaincharNum = inverse * (ciphercharNum - b);
  plaincharNum = mod(plaincharNum, m);
  return String.fromCharCode(plaincharNum + LOWERCASE_ASCII_A);
}

export function affineEncrypt(plaintext, a, b, m) {
  // check if an inverse to a exists
  mmi(a, m);

  return plaintext
    .split('')
    .map(char => encipherChar(char, a, b, m))
    .join('');
}

export function affineDecrypt(ciphertext, a, b, m) {
  const inverse = mmi(a, m);

  return ciphertext
    .split('')
    .map(char => decipherChar(char, inverse, b, m))
    .join('');
}
