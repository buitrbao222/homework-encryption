// init_key() -> public_key, private_key
// encrypt(msg, public_key) -> en_msg
// decrypt(en_msg, private_key) -> msg

const BigInt = require("big-integer");

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

function init_key(){
  let q = random(BigInt(10).pow(20), BigInt(10).pow(50));
  let g = random(2, q);
  let k1 = gen_key(q); // private
  let h = power(g, k1, q);
  let k2 = gen_key(q); // public
  let p = power(g, k2, q);

  let public_key = `${q}.${h}.${g}.${k2}`
  let private_key = `${p}.${k1}.${q}`
  return [public_key, private_key]
}

function power(a, b, c) {
  return BigInt(a).modPow(b, c);
}

function encrypt(msg, public_key) {
  let [q,h,g,k] = public_key.split('.').map(i => BigInt(i))
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

function decrypt(en_msg, private_key) {
  let [p, key, q] = private_key.split('.').map(i => BigInt(i))
  let dr_msg = [];
  let h = power(p, key, q);
  for (let i = 0; i < en_msg.length; i++) {
    dr_msg.push(String.fromCharCode(BigInt(en_msg[i]).divide(h)));
  }
  return dr_msg;
}

function main() {
  let msg = "encryption";
  console.log("Original message: ", msg);

  let [public_key, private_key] = init_key()
  console.log("Public Key: ", public_key)
  console.log("Private Key: ", private_key)
  let en_msg = encrypt(msg, public_key);
  let dr_msg = decrypt(en_msg, private_key);
  let dmsg = dr_msg.join("");
  console.log("Decrypted Message: ", dmsg);
}

function random(min, max) {
  return BigInt.randBetween(min, max);
}

main();
