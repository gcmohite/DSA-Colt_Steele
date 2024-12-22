'use strict';

// FREQUENCY COUNTER PATTERN

// the function should take two arrays and returns true if every value in the array has its corresponding values squared in the second array. The frequency of values must be the same.

// "naive" solution - O(N**2)
function same1(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const squares = [...arr2];

  // check if the square exists in second array
  for (let val of arr1) {
    let indexOfSquare = squares.indexOf(val ** 2);
    if (indexOfSquare === -1) return false;
    squares.splice(indexOfSquare, 1);
  }
  return true;
}
// console.log(same1(arr1, arr2));

// solution with frequency counter pattern - O(N)
function same2(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  const values = {};
  const squares = {};

  arr1.forEach((el) => {
    values[el] ? values[el]++ : (values[el] = 1);
  });

  arr2.forEach((el) => {
    squares[el] ? squares[el]++ : (squares[el] = 1);
  });

  for (let key in values) {
    if (!(key ** 2 in squares)) return false;
    if (values[key] !== squares[key ** 2]) return false;
  }

  return true;
}

const arr1 = [2, 5, 6, 3, 2];
const arr2 = [25, 4, 9, 4, 36];

// console.log(same2(arr1, arr2));

// Anagram
// Given two strings, write a function to determine if the second string is an anagram of the first. An anagram is a word, phrase, or name formed by rearranging the letters of another, such as cinema, formed from iceman.

function validAnagram(str1, str2) {
  // if the string lengths dont match, they are not anagrams

  const first = str1.split(' ').join('').toLowerCase();
  const second = str2.split(' ').join('').toLowerCase();
  console.log(second.length);
  console.log(first.length);
  if (first.length !== second.length) return false;

  const charCount1 = {};
  const charCount2 = {};

  // count the freq of each char in both strings
  for (let char of first) {
    charCount1[char] ? charCount1[char]++ : (charCount1[char] = 1);
  }
  for (let char of second) {
    charCount2[char] ? charCount2[char]++ : (charCount2[char] = 1);
  }

  // check if the key in one obj exists in the other, and if yes, their values should match.
  for (const key in charCount1) {
    if (!(key in charCount2)) return false;
    if (charCount1[key] !== charCount2[key]) return false;
  }

  return true;
}

// console.log(validAnagram('redrum', 'murder'));
// console.log(validAnagram('rat', 'car'));
// console.log(validAnagram('', '')); // true
// console.log(validAnagram('aaz', 'zza')); // false
// console.log(validAnagram('anagram', 'nagaram')); // true
// console.log(validAnagram('rat', 'car'));  // false
// console.log(validAnagram('awesome', 'awesom')); // false
// console.log(validAnagram('amanaplanacanalpanama', 'acanalmanplanpamana')); // false
// console.log(validAnagram('qwerty', 'qeywrt')); // true
// console.log(validAnagram('texttwisttime', 'timetwisttext')); // true

// MULTIPLE POINTERS PATTERN
// Write a function called sumZero which accepts a sorted array of integers. The function should find the first pair where the sum is 0. Return an array that includes both values that sum to zero or undefined if a pair does not exist.

// "naive" solution - O(N**2)
function sumZero(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = arr.length; j > 0; j--) {
      if (arr[i] + arr[j] === 0) return [arr[i], arr[j]];
    }
  }
}

// solution using multiple pointers - O(N) time, O(1) space
function sumZero2(arr) {
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    let sum = arr[start] + arr[end];
    if (sum === 0) return [arr[start], arr[end]];
    sum > 0 ? end-- : start++;
  }
  return null;
}

// sumZero2([-3, -2, -1, 0, 1, 2, 3]); // [-3,3]
// sumZero2([1, 2, 3]); // null
// sumZero2([2, 4, 6, 8, 10, 16, -2, 21]); // null
// sumZero2([-4, -3, -2, -1, 0,  2, 5]);
// sumZero2([-2, -1, 0, 1, 2, 4, 5]);

//Implement a function called countUniqueValues, which accepts a sorted array, and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted.
// Time Complexity - O(n) ; Space Complexity - O(n)

// Bonus: You must do this with constant or O(1) space and O(n) time.

function countUniqueValues(arr) {
  let count = 0;

  // if the difference in values is 0, do nothing,
  // if the difference is not 0, increment counter
  for (let i = 0; i < arr.length; i++) {
    // console.log(arr[i], arr[i + 1]);
    // if (arr[i] === arr[i + 1]) continue;
    // else count++;
    arr[i] === arr[i + 1] ? count : count++;
  }
  // console.log(arr, count);
  return count;
}

// countUniqueValues([1, 1, 1, 1, 1, 2]); // 2
// countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]); // 7
// countUniqueValues([]); // 0
// countUniqueValues([-2, -1, -1, 0, 1]); // 4

// SLIDING WINDOW PATTERN
// Write a function called maxSubarraySum which accepts an array of integers and a number n. The function should calculate the maximum sum of n consecutive elements in the array.

// "naive" solution - O(N**2)
function maxSubarraySum(arr, n) {
  if (arr.length < n) return arr.reduce((a, v) => a + v, 0);

  let sum = 0;
  for (let i = 0; i < arr.length - n + 1; i++) {
    let currentSum = 0;
    for (let j = 0; j < n; j++) {
      currentSum += arr[i + j];
    }

    if (currentSum > sum) sum = currentSum;
  }
  return sum;
}

// solution using sliding window pattern - O(N)
function maxSubarraySum2(arr, n) {
  if (arr.length < n) return null;

  let maxSum = 0;
  let currentSum = 0;

  for (let i = 0; i < n; i++) {
    maxSum += arr[i];
  }
  currentSum = maxSum;

  for (let i = n; i < arr.length; i++) {
    currentSum = currentSum + arr[i] - arr[i - n];
    if (currentSum > maxSum) maxSum = currentSum;
  }

  console.log(maxSum);
  return maxSum;
}

// maxSubarraySum2([1, 2, 5, 2, 8, 1, 5], 2);
// maxSubarraySum2([1, 2, 5, 2, 8, 1, 5], 4);
// maxSubarraySum2([2, 6, 9, 1, 8, 5, 6, 3], 3);

function dontAddMe2(arr) {
  const output = [];
  let sum = 0;
  for (i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  for (i = 0; i < arr.length; i++) {
    output[i] = sum - Math.abs(arr[i]);
  }

  return output;
}

function dontAddMe(arr) {
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return arr.map((el) => sum - Math.abs(el));
}

// dontAddMe([2, 7, 11, 4, -2]);
// dontAddMe([2, 6, 9, -1, 8, 5, 6, -3]);
// dontAddMe2([2, 7, 11, 4, -2]);

// Given two strings, write a function to determine if the second string is an anagram of the first. An anagram is a word, phrase, or name formed by rearranging the letters of another, such as cinema, formed from iceman.

/////////////////////////////////////////
// OPTIONAL CHALLENGES
/////////////////////////////////////////

// Frequency Counter
// Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.
//Your solution MUST have the following complexities:
// Time: O(N)

function sameFrequency(num1, num2) {
  const str1 = '' + num1;
  const str2 = '' + num2;

  if (str1.length !== str2.length) return false;

  const counter1 = {};
  const counter2 = {};

  for (let num of str1) {
    counter1[num] = (counter1[num] || 0) + 1;
  }

  for (let num of str2) {
    counter2[num] = (counter2[num] || 0) + 1;
  }

  for (let num in counter1) {
    if (!(num in counter2)) return false;
    if (counter1[num] !== counter2[num]) return false;
  }

  return true;
}

// sameFrequency(182, 281); // true
// sameFrequency(34,14) // false

////////////////////////////////////////////////////////////

// Implement a function called, areThereDuplicates which accepts a variable number of arguments, and checks whether there are any duplicates among the arguments passed in.  You can solve this using the frequency counter pattern OR the multiple pointers pattern.

// Examples:
areThereDuplicates(1, 2, 3); // false
// areThereDuplicates(1, 2, 2) // true
// areThereDuplicates('a', 'b', 'c', 'a') // true
// Restrictions:  Time - O(n), Space - O(n)

// Bonus: Time - O(n log n), Space - O(1)

function areThereDuplicates(...vals) {
  const counts = {};

  for (let val of vals) {
    counts[val] = (counts[val] || 0) + 1;
  }
  for (let key in counts) {
    if (counts[key] > 1) return true;
  }

  return false;
}

// using multiple counters and without sorting
function areThereDuplicates2(...vals) {
  let start = 0;
  let end = vals.length - 1;

  while (start < end) {
    if (vals[start] === vals[end]) return true;

    if (vals[start] === vals[start + 1]) return true;
    else start++;

    if (vals[end] === vals[end - 1]) return true;
    else end--;
  }

  return false;
}

// Write a function called averagePair. Given a sorted array of integers and a target average, determine if there is a pair of values in the array where the average of the pair equals the target average. There may be more than one pair that matches the average target.

// Bonus Constraints: Time: O(N), Space: O(1)

function averagePair(arr, avg) {
  let start = 0;
  let end = arr.length - 1;

  while (start < end) {
    if ((arr[start] + arr[end]) / 2 === avg) return true;
    (arr[start] + arr[end]) / 2 > avg ? end-- : start++;
  }
  return false;
}

// Write a function called isSubsequence which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, without their order changing.

// Examples:
// isSubsequence('hello', 'hello world'); // true
// isSubsequence('sing', 'sting'); // true
// isSubsequence('abc', 'abracadabra'); // true
// isSubsequence('abc', 'acb'); // false (order matters)
// Your solution MUST have AT LEAST the following complexities:
// Time Complexity - O(N + M)
// Space Complexity - O(1)

function isSubsequence(str1, str2) {
  let index = 0;

  for (let i = 0; i < str2.length; i++) {
    if (str2[i] === str1[index]) {
      index++;
    }

    if (index === str1.length) return true;
  }

  return false;
}

// SLiding Window
// Given an array of integers and a number, write a function called maxSubarraySum, which finds the maximum sum of a subarray with the length of the number passed to the function.
// Note that a subarray must consist of consecutive elements from the original array. In the first example below, [100, 200, 300] is a subarray of the original array, but [100, 300] is not.

// maxSubarraySum3([100, 200, 300, 400], 2); // 700
// maxSubarraySum3([1, 4, 2, 10, 23, 3, 1, 0, 20], 4); // 39
// maxSubarraySum3([-3, 4, 0, -2, 6, -1], 2); // 5
// maxSubarraySum3([3, -2, 7, -4, 1, -1, 4, -2, 1], 2); // 5
maxSubarraySum3([2, 3], 3); // null
// Constraints:

// Time Complexity - O(N)

// Space Complexity - O(1)

function maxSubarraySum3(arr, num) {
  if (arr.length < num) return null;

  let max = 0;

  for (let i = 0; i < num; i++) {
    max += arr[i];
  }

  let current = max;

  for (let i = num; i < arr.length; i++) {
    current = current + arr[i] - arr[i - num];
    if (current > max) max = current;
  }

  return max;
}

// Write a function called minSubArrayLen which accepts two parameters - an array of positive integers and a positive integer.

// This function should return the minimal length of a contiguous subarray of which the sum is greater than or equal to the integer passed to the function. If there isn't one, return 0 instead.
// Examples:

// minSubArrayLen([2,3,1,2,4,3], 7) // 2 -> because [4,3] is the smallest subarray
// minSubArrayLen([2,1,6,5,4], 9) // 2 -> because [5,4] is the smallest subarray
// minSubArrayLen([3,1,7,11,2,9,8,21,62,33,19], 52) // 1 -> because [62] is greater than 52
// minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 39); // 3
// minSubArrayLen([1,4,16,22,5,7,8,9,10],55) // 5
// // minSubArrayLen([4, 3, 3, 8, 1, 2, 3], 11) // 2
// minSubArrayLen([1, 4, 16, 22, 5, 7, 8, 9, 10], 95); // 0
// Time Complexity - O(n)

// Space Complexity - O(1)

function minSubArrayLen(arr, num) {
  let start = 0;
  let end = 0;
  let sum = 0;
  let count = Infinity;

  while (start < arr.length) {
    if (sum < num && end < arr.length) {
      sum += arr[end];
      end++;
    } else if (sum >= num) {
      count = Math.min(count, end - start);
      sum -= arr[start];
      start++;
    } else break;
  }
  return count === Infinity ? 0 : count;
}
