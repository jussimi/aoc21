const fs = require("fs");

const list = fs.readFileSync(`${__dirname}/input.txt`,"utf8")
  .split(",")
  .map(eval)
  .sort((a,b) => a-b);

const step1 = () => {
  const count = (median) => {
    return list.reduce((s, x) => s + Math.abs(median - x), 0)
  }

  const i = list.length / 2;
  const m1 = list[Math.floor(i)]
  const m2 = list[Math.ceil(i)]

  console.log(i,m1, m2, list[i*2-1]);

  console.log(Math.min(count(m1), count(m2)))
}
step1()

const step2 = () => {
  const sums = [];
  let p = -1;
  let min = Infinity;
  for (let x = 0; x < list[list.length - 1]; x += 1) {
    const sum = list.reduce((s, n) => {
      const d = Math.abs(x-n);
      return s + (0.5 * d * (d + 1))
    }, 0)
    sums.push(sum);
    if (sum < min) {
      p = x;
      min = sum;
    }
  }
  console.log(p, min);
}
step2()

