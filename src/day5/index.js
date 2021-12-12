//p=require("fs").readFileSync(`${__dirname}/inputs/day5.txt`,"utf8")
//.replace(/\r\n/g,'\n').split("\n").map(d => d.split(/ -> |,/g).map(eval));
//g={};s=0
//f=(r,t,u,d)=>{[a,b]=r<t?[r,t]:[t,r];for(i=a;i<=b;i++){j=(d+"")[5]?u+"-"+i:i+"-"+(d*(i-r)+u);v=(g[j]|0)+1;g[j]=v;v==2&&s++}}
//for([x,y,u,v]of p){k=(v-y)/(u-x);(k+"")[5]?f(y,v,x):f(x,u,y,k)}
//console.log(s)

const points = require("fs")
    .readFileSync(`${__dirname}/input.txt`,"utf8")
    .replace(/\r\n/g,'\n').split("\n")
    .map(d => d.split(/ -> |,/g).map(eval));

const count = (skipDiagonal = false) => {
    const grid = {};
    let sum = 0;

    const loop = (start, end, constant, derivative) => {
        const [a, b] = start < end ? [start, end] : [end, start];
        for (let i = a; i <= b; i += 1) {
            const [x, y] = derivative === undefined ? [constant, i] : [i, derivative * (i - start) + constant]
            const j = `${x}-${y}`;
            const nextVal = (grid[j] || 0) + 1;
            grid[j] = nextVal;
            if (nextVal === 2) {
                sum += 1;
            }
        }
    }
    for (const [x1, y1, x2, y2] of points) {
        const d = (y2 - y1) / (x2 - x1);
        if ((d+"")[5]) { // If k === Infinity || k === -Infinity
            loop(y1, y2, x1)
        } else {
            if (skipDiagonal && [-1, 1].includes(d)) {
                continue;
            }
            loop(x1, x2, y1, d)
        }
    }
    return sum;
}

console.log(count(true), count())
