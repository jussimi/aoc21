// let a = require("fs")
//     .readFileSync(`${__dirname}/inputs/day6.txt`,"utf8")
//     .split(",")
//     .reduce((s, t) => { s[t]++; return s }, new Array(9).fill(0));

// const log = () => console.log(a.reduce((s, x) => s + x, 0));

// [...Array(256)].forEach((_, i) => {
//     a = [...Array(9)].map((_,i) => {
//         let val = a[(i + 1) % 9];
//         if (i === 6) {
//             val += a[0];
//         }
//         return val;
//     });
//     i == 79 && log()
// });
// log();

A=(x)=>[...Array(x)];
a=require("fs").readFileSync(`${__dirname}/input.txt`,"utf8").split(",").reduce((s,t)=>{s[t]++;return s},A(9).fill(0))
l=()=>console.log(a.reduce((s,x)=>s+x,0))
A(256).map((_,j)=>{a=A(9).map((_,i)=>a[(i+1)%9]+(i==6?a[0]:0));j==79&&l()})
l()
