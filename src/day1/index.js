f=`${__dirname}/input.txt`
l=require("fs").readFileSync(f,"utf8").split("\n").map(eval)
s=(i,z)=>l[i]+((!z&&(l[i-1]+l[i+1]))||0);r=z=>l.reduce((a,x,i)=>s(i,z)>s(i-1,z)?a+1:a,0)
console.log(r(1),r())
