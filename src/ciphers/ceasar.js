// 𝑒k(𝑥) = (x + k) mod 26
// 𝑑k(𝑦) = (y − k) mod 26

// encode(message, key) -> return cipher
// decode(cipher, key) -> return meassage

// encode("hentoithubay", 1) -> return "ifoupjuivcbz"
// decode("ifoupjuivcbz", 1) -> return "hentoithubay"

let alphabet = 'abcdefghijklmnopqrstuvwxyz';
let newalpha = '';

function shift(n) {
  for (let i = 0; i < alphabet.length; i++) {
    let offset = (i + n) % alphabet.length;
    newalpha += alphabet[offset];
  }
}

function caesarEncrypt(message, key) {
  shift(key);
  let result = '';
  message = message.toLowerCase();
  for (let i = 0; i < message.length; i++) {
    let index = alphabet.indexOf(message[i]);
    result += newalpha[index];
  }
  return result;
}

function caesarDecrypt(cipher, key) {
  shift(key);
  let result = '';
  cipher = cipher.toLowerCase();
  for (let i = 0; i < cipher.length; i++) {
    let index = newalpha.indexOf(cipher[i]);
    result += alphabet[index];
  }
  return result;
}

let en = caesarEncrypt('hentoithubay', 1);
let de = caesarDecrypt('ifoupjuivcbz', 1);
console.log(en, de);
