'use strict';

function countdown(num) {
  if (num <= 0) {
    console.log(`Done!`);
    return;
  }

  console.log(num);
  num--;
  countdown(num);
}

// countdown(10);

function sumRange(num) {
  if (num === 1) return 1;
  return num + sumRange(num - 1);
}

function power(base, exponent) {
  if (exponent === 0) return 1;
  return base * power(base, exponent - 1);
}

function factorial(num) {
  if (num === 1 || num === 0) return 1;
  return num * factorial(num - 1);
}

// iteratively
function factorial2(num) {
  let result = 1;
  while (num > 1) {
    result *= num;
    num--;
  }
  return result;
}

// HELPER METHOD RECURSION
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function collectOddValues(arr) {
  let result = [];

  function helper(harr) {
    if (!harr.length) return;
    if (harr[0] % 2 !== 0) result.push(harr[0]);
    helper(harr.toSpliced(0, 1));
  }

  helper(arr);

  return result;
}

function productOfArray(arr) {
  let product = 1;

  function helper(harr) {
    if (!harr.length) return;
    product *= harr[0];
    helper(harr.toSpliced(0, 1));
  }
  helper(arr);

  return product;
}

function recursiveRange(num) {
  if (num === 0) return 0;
  return num + recursiveRange(num - 1);
}

function fib(n) {
  if (n === 0) return null;
  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
}

function reverse(str) {
  if (str.length === 1) return str;
  return reverse(str.slice(1)) + str[0];
}
