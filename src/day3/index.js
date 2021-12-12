const fs = require("fs");
const dataSet = fs.readFileSync(`${__dirname}/input.txt`, "utf8").replace(/\r\n/g,'\n').split("\n")

const mostCommonValue = (data, position) => {
    let sum = 0;
    for (let i = 0; i < data.length; i += 1) {
        sum += +data[i][position];
    }
    return 2 * sum >= data.length ? 1 : 0;
}

const findGammaAndEpsilon = (data) => {
    let [gamma, epsilon] = ["0B", "0B"];
    for (let i = 0; i < data[0].length; i += 1) {
        const x = mostCommonValue(data, i);
        gamma += x; epsilon += 1-x;
    }
    console.log("Gamma", +gamma)
    console.log("Epsilon", +epsilon)
    console.log("Product", gamma*epsilon, "\n")
}

const filterByCriteria = (most, data, i = 0) => {
    if (data.length === 1 || i === data[0].length) {
        return "0B"+data[0];
    }
    const x = mostCommonValue(data, i);
    return filterByCriteria(most, data.filter(d => d[i] == most ? x : 1-x), i + 1);
}

const findOxygenAndCO2 = (dataSet) => {
    const oxygen = filterByCriteria(true, dataSet);
    const co2 = filterByCriteria(false, dataSet);
    console.log("Oxygen", +oxygen)
    console.log("co2", +co2)
    console.log("Product", oxygen*co2)
}

findGammaAndEpsilon(dataSet)
findOxygenAndCO2(dataSet)
