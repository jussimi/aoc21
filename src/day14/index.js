console.time();
const fs = require("fs");
const [value, _, ...rules] = fs.readFileSync(`${__dirname}/input.txt`,"utf8").split("\n");

const ITERATIONS = 4000;
let counts = {};
const charCounts = {};
const map = {};

rules.forEach(rule => {
  const [key, val] = rule.split(" -> ");
  map[key] = [`${key[0]}${val}`, `${val}${key[1]}`];
  counts[key] = 0;
  charCounts[val] = 0;
});

for (let i = 0; i < value.length; i += 1) {
  charCounts[value[i]] += 1;
  const key = value.substr(i,2);
  if (map[key]) {
    counts[key] += 1;
  }
}

[...Array(ITERATIONS)].forEach(() => {
  let tmpCounts = { ...counts };
  for (const key of Object.keys(counts)) {
    const count = counts[key];
    const [a,b] = map[key];
    charCounts[a[1]] += count;
    tmpCounts[a] += count;
    tmpCounts[b] += count;
    tmpCounts[key] -= count;
  }
  counts = tmpCounts;
});
const values = Object.values(charCounts).sort((a, b) =>  a-b);
console.log(values[values.length -1] - values[0]);
console.timeEnd();

