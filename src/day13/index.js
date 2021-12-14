console.time()
const [data, instructions] = require("fs").readFileSync(`${__dirname}/input.txt`, "utf8")
    .replace(/\r\n/g,'\n')
    .split("\n\n")
    .map((x) => x.split("\n"))

let maxX = 0;
let maxY = 0;
const dots = data.map((pair) => {
    const [x, y] = pair.split(",");
    if (+x > maxX) {
        maxX = +x
    }
    if (+y > maxY) {
        maxY = +y;
    }
    return [+x, +y]
});
const grid = Array.from(Array(maxY + 1), () => new Array(maxX + 1).fill(0));
dots.forEach(([x,y]) => grid[y][x] = 1)

let folded = grid;
for (const instruction of instructions) {
    const [direction, coordinate] = instruction.replace("fold along ", "").split("=");
    const index = parseInt(coordinate);
    let first = [];
    let second = [];
    if (direction === "y") {
        first = folded.slice(0, index);
        second = folded.slice(index + 1).reverse();
    } else {
        folded.forEach(arr => {
            first.push(arr.slice(0, index));
            second.push(arr.slice(index + 1).reverse())
        })
    }
    let newFolded = Array.from(Array(first.length), () => new Array(first[0].length));
    for (let i = 0; i < first.length; i += 1) {
        for (let j = 0; j < first[0].length; j += 1) {
            const sum = (first[i][j] + second[i][j]);
            if (sum >= 1) {
                newFolded[i][j] = 1; 
            } else {
                newFolded[i][j] = 0;
            }
        }
    }
    folded = newFolded;
}

let count = 0;
folded.forEach(r => {
    r.forEach(p => {
        if (p) {
            count += 1;
        }
    })
})

console.log(folded.map(row => row.join("").replaceAll("0", " ").replaceAll("1", "#")));
console.log(count);

console.timeEnd()
