function generateKey(str, key) {
  key = key.split('');
  if (key.length >= str.length) return key.join('');

  let temp = key.length;
  for (let i = 0; i < str.length - temp; i++) {
    key.push(key[i % key.length]);
  }

  return key.join('');
}

function isUppercase(character) {
  return character === character.toUpperCase();
}

function charCode(char = '') {
  if (isUppercase(char)) {
    return char.charCodeAt(0) - 'A'.charCodeAt(0);
  }
  return char.charCodeAt(0) - 'a'.charCodeAt(0);
}

// This function decrypts the encrypted text
// and returns the original text
function originalText(cipher_text, key) {
  let orig_text = '';
  console.log(key);
  for (let i = 0; i < cipher_text.length; i++) {
    // converting in range 0-25

    let x = (charCode(cipher_text[i]) - charCode(key[i]) + 26) % 26;

    // convert into alphabets(ASCII)
    if (isUppercase(cipher_text[i])) {
      x += 'A'.charCodeAt(0);
    } else {
      x += 'a'.charCodeAt(0);
    }
    orig_text += String.fromCharCode(x);
  }
  return orig_text;
}

// This function returns the encrypted text
// generated with the help of the key
function cipherText(str, key) {
  let cipher_text = '';

  for (let i = 0; i < str.length; i++) {
    // converting in range 0-25
    let x = (charCode(str[i]) + charCode(key[i])) % 26;

    // convert into alphabets(ASCII)
    if (isUppercase(str[i])) {
      x += 'A'.charCodeAt(0);
    } else {
      x += 'a'.charCodeAt(0);
    }

    cipher_text += String.fromCharCode(x);
  }
  return cipher_text;
}

export function vigenereEncrypt(plain = '', key = '') {
  let k = generateKey(plain, key.toLowerCase());
  return cipherText(plain, k);
}

export function vigenereDecrypt(cipher = '', key = '') {
  let k = generateKey(cipher, key.toLowerCase());
  return originalText(cipher, k);
}
