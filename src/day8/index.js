const { readFileSync } = require("fs");
const dataSet = readFileSync(`${__dirname}/input.txt`, "utf8")
    .replace(/\r\n/g,'\n')
    .split("\n")
    .map((row) => {
        const [signals, outputs] = row.split(" | ");
        return {
            signals: signals.split(" "),
            outputs: outputs.split(" ")
        }
    });

const countUniques = () => {
    let sum = 0;
    dataSet.forEach(({ outputs }) => {
        outputs.forEach((output) => {
            if ([2, 3, 4, 7].includes(output.length)) {
                sum += 1;
            }
        })
    })
    console.log("Sum", sum)
}

const keys = ["a", "b", "c", "d", "e", "f", "g"];
const values = ["abcefg", "cf", "acdeg", "acdfg", "bcdf", "abdfg", "abdefg", "acf", "abcdefg", "abcdfg"];

const diff = (s1, s2) => {
    const chars = [];
    for (const c of s1) {
        if (s2.indexOf(c) === -1) {
            chars.push(c);
        }
    }
    return chars.join("");
}

let sum = 0;
for (const { signals, outputs } of dataSet) {
    const len2 = signals.find(s => s.length === 2)
    const len3 = signals.find(s => s.length === 3)
    const len4 = signals.find(s => s.length === 4)
    const map = {
        a: diff(len3, len2)
    };

    const joined = signals.join("");
    for (const key of keys) {
        const occurences = joined.split(key).length - 1;
        if (occurences === 4) {
            map["e"] = key;
        } else if (occurences === 6) {
            map["b"] = key;
        } else if (occurences === 9) {
            map["f"] = key;
        } 
    }

    map["c"] = diff(len2, map["f"])
    map["d"] = diff(len4, len2 + map["b"])
    map["g"] = diff(keys.join(""), Object.values(map).join(""))

    const invertedMap = {};
    for (const key of Object.keys(map)) {
        invertedMap[map[key]] = key;
    }

    const decoded = outputs.map((output) => {
        const value = output.split("").map(c => invertedMap[c]).sort().join("");
        return values.indexOf(value);
    });
    sum += parseInt(decoded.join(""));
}
console.log(sum)
