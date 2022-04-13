// 𝑒k(𝑥) = (x + k) mod 26
// 𝑑k(𝑦) = (y − k) mod 26

// encode(message, key) -> return cipher
// decode(cipher, key) -> return meassage

// encode("hentoithubay", 1) -> return "ifoupjuivcbz"
// decode("ifoupjuivcbz", 1) -> return "hentoithubay"

let alphabet = 'abcdefghijklmnopqrstuvwxyz';

function shift(n) {
  let newalpha = '';
  for (let i = 0; i < alphabet.length; i++) {
    let offset = (i + n) % alphabet.length;
    newalpha += alphabet[offset];
  }
  return newalpha;
}

export function caesarEncrypt(message, key) {
  const newalpha = shift(key);
  let result = '';
  message = message.toLowerCase();
  for (let i = 0; i < message.length; i++) {
    let index = alphabet.indexOf(message[i]);
    result += newalpha[index];
  }
  return result;
}

export function caesarDecrypt(cipher, key) {
  const newalpha = shift(key);
  let result = '';
  cipher = cipher.toLowerCase();
  for (let i = 0; i < cipher.length; i++) {
    let index = newalpha.indexOf(cipher[i]);
    result += alphabet[index];
  }
  return result;
}
