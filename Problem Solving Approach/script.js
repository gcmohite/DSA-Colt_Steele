'use strict';

// testing the character using character code
function charCount1(str) {
  const result = {};

  for (let i = 0; i < str.length; i++) {
    let char = str[i].toLowerCase();
    const charCode = char.charCodeAt(0);
    const isAlphabet = charCode >= 97 && charCode <= 122;
    const isNum = charCode >= 48 && charCode <= 57;

    if (isAlphabet || isNum) {
      result[char] ? result[char]++ : (result[char] = 1);
    }
  }

  console.log(result);
}

// testing the character using regex and for-of loop and some short-circuting logic
function charCount2(str) {
  const result = {};

  for (let char of str) {
    char = char.toLowerCase();

    if (/[a-z0-9]/.test(char)) {
      result[char] = result[char]++ || 1;
    }
  }

  console.log(result);
}

// charCount('Hi there!');
charCount1('Hi! My phone number is 346-543-342.');
charCount2('Hello there! Call us on 433-434-4324');
