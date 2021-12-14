const fs = require("fs");

const tmpGrid = fs.readFileSync(`${__dirname}/input.txt`,"utf8")
  .split("\n")
  .map(row => row.split("").map(x => parseInt(x)));


const paddingRow = new Array(tmpGrid[0].length + 2).fill(9)
const grid = [[...paddingRow], ...tmpGrid.map(row => [9, ...row, 9]), [...paddingRow]];
  
const height = grid.length;
const width = grid[0].length;

const neighbors = (y,x) => [[y-1,x],[y+1,x],[y,x-1],[y,x+1]]
const populateBasin = (y, x, basin) => {
  if (grid[y][x] === 9) {
    return;
  }
  basin[`${y}-${x}`] = 1;
  for (const [yn,xn] of neighbors(y,x)) {
    if (!basin[`${yn}-${xn}`]) {
      populateBasin(yn, xn, basin);
    }
  }
}

const minimas = [];
const basins = [];
for (let y = 1; y < height - 1; y += 1) {
  middle: for (let x = 1; x < width - 1; x += 1) {
    const value = grid[y][x];
    for (const [yn,xn] of neighbors(y, x)) {
      if (value >= grid[yn][xn]) {
        continue middle;
      }
    }
    minimas.push(value)
    //
    const basin = {};
    populateBasin(y, x, basin);
    basins.push(basin);
  }
}

const result = basins.map(b => Object.keys(b).length).sort((a,b)=> b-a).slice(0, 3).reduce((s, n) => s * n, 1);
console.log(minimas.reduce((s,n) => s+n+1,0), result);