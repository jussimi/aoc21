const fs = require("fs");
const lines = fs.readFileSync(`${__dirname}/input.txt`,"utf8").split("\n")

const chars = { "(": ")", "[": "]", "{": "}", "<": ">" };
const corrupt = { ")": 3, "]": 57, "}": 1197, ">": 25137 }
const incomplete = { ")": 1, "]": 2, "}": 3, ">": 4 }

const parseLine = (line) => {
  const score = {
    corrupt: 0,
    incomplete: 0,
  }
  const unclosed = [];
  for (const c of line.split("")) {
    if (chars[c]) {
      unclosed.unshift(chars[c]);
    } else if (unclosed[0] !== c) {
      score.corrupt = corrupt[c]
      return score;
    } else {
      unclosed.shift();
    }
  }
  for (const c of unclosed) {
    score.incomplete = 5 * score.incomplete + incomplete[c]
  }
  return score;
}

let corruptScore = 0;
const incompletes = [];
for (const line of lines) {
  const { corrupt, incomplete } = parseLine(line)
  corruptScore += corrupt;
  incomplete && incompletes.push(incomplete);
}
const autocompleteScore = incompletes.sort((a, b) => a - b)[Math.floor(incompletes.length / 2)]
console.log(corruptScore, autocompleteScore);

