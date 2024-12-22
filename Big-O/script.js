'use strict';

// TIMING THE CODE
const sum = function (n) {
  let total = 0;
  for (let i = 0; i <= n; i++) {
    total += i;
  }
  return total;
};

const addUpTo = function (n) {
  return (n * (n + 1)) / 2;
};

const t1 = performance.now();
sum(1000000000);
const t2 = performance.now();
console.log((t2 - t1) / 1000);

const t3 = performance.now();
addUpTo(1000000000);
const t4 = performance.now();
console.log((t4 - t3) / 1000);
