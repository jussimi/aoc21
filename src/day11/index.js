const data = require("fs").readFileSync(`${__dirname}/input.txt`, "utf8")
    .replace(/\r\n/g,'\n')
    .split("\n")

const grid = {};
const i = (x, y) => `${x}-${y}`;
data.forEach((row, y) => {
    row.split("").forEach((n,x) => {
        grid[i(x,y)] = parseInt(n);
    })
})

const keys = Object.keys(grid);

const flash = (x, y) => {
    grid[i(x,y)] = -1;
    const neighbors = [
        [x-1, y-1], [x, y-1], [x+1, y-1],
        [x-1, y],             [x+1, y],
        [x-1, y+1], [x, y+1], [x+1, y+1],
    ]
    for (const [xi, yi] of neighbors) {
        boostEnergy(xi, yi)
    } 
}

const boostEnergy = (x, y) => {
    const key = i(x,y);
    if ([undefined, -1].includes(grid[key])) {
        return;
    }
    grid[key] = grid[key] + 1;
    if (grid[key] > 9) {
        flash(x, y)
    }
}

let flashCount = 0;
let step = 1;
while (true) {
    for (const key of keys) {
        const [x, y] = key.split("-");
        boostEnergy(+x, +y);
    }
    let count = 0;
    for (const key of keys) {
        if (grid[key] === -1) {
            count += 1;
            grid[key] = 0;
        }
    }
    flashCount += count;
    if (step === 100) {
        console.log(flashCount);
    }
    if (count === keys.length) {
        console.log(step)
        break;
    }
    step += 1;
}
