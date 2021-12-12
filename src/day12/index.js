console.time()
const data = require("fs").readFileSync(`${__dirname}/input.txt`, "utf8")
    .replace(/\r\n/g,'\n')
    .split("\n");

const graph = {};
const addEdge = (node1, node2) => {
    if (node2 !== "start" && node1 !== "end") {
        graph[node1] =  { ...(graph[node1] || {}), [node2]: 1 }
    }
}
data.forEach(edge => {
    const [node1, node2] = edge.split("-");
    addEdge(node1, node2);
    addEdge(node2, node1);
});

const findPaths = (twiceVisited, visited = ["start"], paths = []) => {
    const node = visited[visited.length - 1];
    if (node === "end") {
        paths.push(visited);
    }
    for (const edge of Object.keys(graph[node] || {})) {
        if (edge === edge.toLowerCase() && visited.includes(edge)) {
            if (twiceVisited !== false && twiceVisited === "") {
                findPaths(edge, [...visited, edge], paths)
            }
            continue;
        }
        findPaths(twiceVisited, [...visited, edge], paths);
    }
    return paths;
}
const paths1 = findPaths(false)
console.log(paths1.length);

const paths2 = findPaths("")
console.log(paths2.length);
console.timeEnd()
