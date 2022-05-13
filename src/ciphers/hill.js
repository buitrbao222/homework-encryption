function getKeyMatrix(key = '') {
  let n = Math.sqrt(key.length);
  let keyMatrix = new Array(n);
  for (let i = 0; i < n; i++) {
    keyMatrix[i] = new Array(n);
    for (let j = 0; j < n; j++)
      keyMatrix[i][j] = key[i * n + j].charCodeAt(0) - 65;
  }

  return keyMatrix;
}

function getPremodMatrix(columnVectors, dimensions, keyArray) {
  var premodArray = [];
  var kr0 = keyArray[0][0];
  var kr1 = keyArray[0][1];
  var kr2 = keyArray[1][0];
  var kr3 = keyArray[1][1];
  var cr0;
  var cr1;
  var cr2;
  var topElement;
  var middleElement;
  var bottomElement;

  if (dimensions === 2) {
    while (premodArray.length < columnVectors.length) {
      for (let i in columnVectors) {
        cr0 = columnVectors[i][0];
        cr1 = columnVectors[i][1];
        topElement = kr0 * cr0 + kr1 * cr1;
        bottomElement = kr2 * cr0 + kr3 * cr1;
        premodArray.push([topElement, bottomElement]);
      }
    }
  } else {
    while (premodArray.length < columnVectors.length) {
      for (let i in columnVectors) {
        cr0 = columnVectors[i][0];
        cr1 = columnVectors[i][1];
        cr2 = columnVectors[i][2];
        topElement =
          keyArray[0][0] * cr0 + keyArray[0][1] * cr1 + keyArray[0][2] * cr2;
        middleElement =
          keyArray[1][0] * cr0 + keyArray[1][1] * cr1 + keyArray[1][2] * cr2;
        bottomElement =
          keyArray[2][0] * cr0 + keyArray[2][1] * cr1 + keyArray[2][2] * cr2;
        premodArray.push([topElement, middleElement, bottomElement]);
      }
    }
  }

  return premodArray;
}
// Function to implement Hill Cipher
export function hillEncrypt(plainT, key) {
  let keyArray = getKeyMatrix(key);
  var dimension = 3;
  var encryptedArray = [];
  var columnVectors;
  var topElement;
  var bottomElement;
  var premodMatrix;

  var trigraph = getTrigraph(plainT);
  columnVectors = getColumnVectors(trigraph, 3);
  premodMatrix = getPremodMatrix(columnVectors, 3, keyArray);
  var middleElement;

  for (var i in premodMatrix) {
    topElement = premodMatrix[i][0];
    middleElement = premodMatrix[i][1];
    bottomElement = premodMatrix[i][2];
    encryptedArray.push([
      topElement % 26,
      middleElement % 26,
      bottomElement % 26,
    ]);
  }
  return reverseSearch(encryptedArray, dimension).toString().replace(/,/gi, '');
}

function getTrigraph(aString) {
  var input = aString.toLowerCase();
  var tempTrigram = '';
  var textLength = input.length;
  var trigramLength;
  var letter;
  var array = [];
  var count = 0;

  while (count < textLength) {
    trigramLength = tempTrigram.length;
    letter = input.charAt(count);

    if (trigramLength < 3) {
      tempTrigram += letter;

      if (tempTrigram.length === 3) {
        array.push(tempTrigram);
        tempTrigram = '';
      }
    } else {
      array.push(tempTrigram);
      tempTrigram = '';
      tempTrigram += letter;
    }

    // pad if at odd  ending
    if (count === textLength - 1 && textLength % 3 !== 0) {
      if (tempTrigram.length === 1) {
        tempTrigram += 'xx';
      } else {
        tempTrigram += 'x';
      }
      array.push(tempTrigram);
    }
    count++;
  }

  // pad if input does not form 3 X 3 matrix
  while (array.length < 3) {
    array.push('xxx');
  }

  return array;
}
function getColumnVectors(xdimgrams, dimensions) {
  var item;
  var topElement;
  var middleElement;
  var bottomElement;
  var columnVectors = [];

  if (dimensions === 2) {
    for (var i in xdimgrams) {
      item = xdimgrams[i];
      topElement = item.charAt(0);
      bottomElement = item.charAt(1);

      //get the index of each letter and push into column vector
      columnVectors.push([search(topElement), search(bottomElement)]);
    }
  } else {
    for (let i in xdimgrams) {
      item = xdimgrams[i];
      topElement = item.charAt(0);
      middleElement = item.charAt(1);
      bottomElement = item.charAt(2);

      //get the index of each letter and push into column vector
      columnVectors.push([
        search(topElement),
        search(middleElement),
        search(bottomElement),
      ]);
    }
  }

  return columnVectors;
}
function modInverse(a, m) {
  var atemp = a;
  atemp = atemp % m;
  if (atemp < 0) {
    atemp = m + atemp;
  }

  for (var x = 1; x < m; x++) {
    if ((atemp * x) % m === 1) {
      return x;
    }
  }
}
function reverseSearch(array, dimension) {
  var strArray = [];
  var alphabet = 'abcdefghijklmnopqrstuvwxyz';
  var item;

  if (dimension === 2) {
    for (var i in array) {
      item = array[i];
      strArray.push([alphabet[item[0]], alphabet[item[1]]]);
    }
  } else {
    for (let i in array) {
      item = array[i];
      strArray.push([alphabet[item[0]], alphabet[item[1]], alphabet[item[2]]]);
    }
  }
  return strArray;
}
function search(aChar) {
  var letter = aChar.toLowerCase();
  var alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return alphabet.indexOf(letter);
}

export function calculateHillDeterminant(key) {
  let keyArray = getKeyMatrix(key);

  var leftElement =
    keyArray[0][0] *
    (keyArray[1][1] * keyArray[2][2] - keyArray[1][2] * keyArray[2][1]);

  var middleElement =
    keyArray[0][1] *
    (keyArray[1][0] * keyArray[2][2] - keyArray[1][2] * keyArray[2][0]);

  var rightElement =
    keyArray[0][2] *
    (keyArray[1][0] * keyArray[2][1] - keyArray[1][1] * keyArray[2][0]);

  var determinant = leftElement - middleElement + rightElement;

  return determinant;
}

export function hillDecrypt(ciphT, key) {
  let keyArray = getKeyMatrix(key);
  var decryptedArray = [];
  var determinant;
  var columnVectors;
  var topElement;
  var bottomElement;
  var multiplicativeInverse;
  var adjugateMatrix = [];
  var inverseKeyMatrix = [];

  var trigraph = getTrigraph(ciphT);
  columnVectors = getColumnVectors(trigraph, 3);

  // determinant calculation components
  var middleElement =
    keyArray[0][1] *
    (keyArray[1][0] * keyArray[2][2] - keyArray[1][2] * keyArray[2][0]);

  determinant = calculateHillDeterminant(key);
  multiplicativeInverse = modInverse(determinant % 26, 26);

  // cofactor calculation
  var cf00 = keyArray[1][1] * keyArray[2][2] - keyArray[1][2] * keyArray[2][1];
  var cf01 = -(
    keyArray[1][0] * keyArray[2][2] -
    keyArray[2][0] * keyArray[1][2]
  );
  var cf02 = keyArray[1][0] * keyArray[2][1] - keyArray[1][1] * keyArray[2][0];
  var cf10 = -(
    keyArray[0][1] * keyArray[2][2] -
    keyArray[0][2] * keyArray[2][1]
  );
  var cf11 = keyArray[0][0] * keyArray[2][2] - keyArray[0][2] * keyArray[2][0];
  var cf12 = -(
    keyArray[0][0] * keyArray[2][1] -
    keyArray[0][1] * keyArray[2][0]
  );
  var cf30 = keyArray[0][1] * keyArray[1][2] - keyArray[0][2] * keyArray[1][1];
  var cf31 = -(
    keyArray[0][0] * keyArray[1][2] -
    keyArray[0][2] * keyArray[1][0]
  );
  var cf32 = keyArray[0][0] * keyArray[1][1] - keyArray[0][1] * keyArray[1][0];

  adjugateMatrix.push([cf00, cf01, cf02]);
  adjugateMatrix.push([cf10, cf11, cf12]);
  adjugateMatrix.push([cf30, cf31, cf32]);

  //find the mods
  for (var i in adjugateMatrix) {
    if (adjugateMatrix[i][0] < 0) {
      adjugateMatrix[i][0] = (adjugateMatrix[i][0] % 26) + 26;
    } else {
      adjugateMatrix[i][0] = adjugateMatrix[i][0] % 26;
    }

    if (adjugateMatrix[i][1] < 0) {
      adjugateMatrix[i][1] = (adjugateMatrix[i][1] % 26) + 26;
    } else {
      adjugateMatrix[i][1] = adjugateMatrix[i][1] % 26;
    }

    if (adjugateMatrix[i][2] < 0) {
      adjugateMatrix[i][2] = (adjugateMatrix[i][2] % 26) + 26;
    } else {
      adjugateMatrix[i][2] = adjugateMatrix[i][2] % 26;
    }
  }

  // multiply adjugateMatrix with multiplicativeInverse and mod
  for (let i in adjugateMatrix) {
    topElement = (multiplicativeInverse * adjugateMatrix[i][0]) % 26;
    middleElement = (multiplicativeInverse * adjugateMatrix[i][1]) % 26;
    bottomElement = (multiplicativeInverse * adjugateMatrix[i][2]) % 26;
    inverseKeyMatrix.push([topElement, middleElement, bottomElement]);
  }

  // finally, the decryption
  for (let i in columnVectors) {
    topElement =
      (inverseKeyMatrix[0][0] * columnVectors[i][0] +
        inverseKeyMatrix[1][0] * columnVectors[i][1] +
        inverseKeyMatrix[2][0] * columnVectors[i][2]) %
      26;

    middleElement =
      (inverseKeyMatrix[0][1] * columnVectors[i][0] +
        inverseKeyMatrix[1][1] * columnVectors[i][1] +
        inverseKeyMatrix[2][1] * columnVectors[i][2]) %
      26;

    bottomElement =
      (inverseKeyMatrix[0][2] * columnVectors[i][0] +
        inverseKeyMatrix[1][2] * columnVectors[i][1] +
        inverseKeyMatrix[2][2] * columnVectors[i][2]) %
      26;

    decryptedArray.push([topElement, middleElement, bottomElement]);
  }

  let result = reverseSearch(decryptedArray, 3).toString().replace(/,/gi, '');
  return result;
}
