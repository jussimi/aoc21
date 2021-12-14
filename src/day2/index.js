const fs = require("fs");
l = fs.readFileSync(`${__dirname}/input.txt`,"utf8").split("\n");

x=0,y=0,a=0;
l.map(i=>{[c,v]=i.split(" ");n=+v;c[6]?(x+=n,y+=a*n):c[3]?a+=n:a-=n});

console.log(`
Distance: ${x},
Depth: ${y},
Aim: ${a},
Product1: ${x*a},
Product2: ${x*y},
`)
