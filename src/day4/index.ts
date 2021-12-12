import { readFileSync } from "fs";
const dataSet = readFileSync(`${__dirname}/input.txt`, "utf8").replace(/\r\n/g,'\n').split("\n")

const SIZE = 5

class BingoNumber {
    value: number;
    marked: boolean;
    constructor (value: string) {
        this.value = parseInt(value);
        this.marked = false;
    }
    call() {
        this.marked = true;
    }
}

type Board = BingoNumber[][];

class Player {
    static nextId = 1;
    id: number;
    board: Board;
    constructor() {
        this.id = Player.nextId;
        Player.nextId += 1;
        this.board = [];
    }
    get len() {
        return this.board.length;
    }
    check() {
        const checkRows = (M: Board) => !!M.find(r => r.filter(v => v.marked).length === SIZE);
        const { board } = this;
        if (checkRows(board)) {
            return true;
        }
        const transpose = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
        return checkRows(transpose);
    }
    bingo() {
        return this.check();
    }
    score(currentNumber: number) {
        const sum = this.board.flat().reduce((s, c) => !c.marked ? s + c.value : s, 0);
        return sum * currentNumber;
    }
}

class Bingo {
    numbers: BingoNumber[];
    players: Player[];
    constructor(data: string[]) {
        console.log("Welcome to the bingo, we've got fun and games!")
        this.init(data);
    }
    init(data: string[]) {
        this.numbers = data.splice(0, 2)[0].split(",").map(x => new BingoNumber(x));
        const numberMap: Record<string, BingoNumber> = {};
        this.numbers.forEach(x => {
            numberMap[x.value] = x;
        });
        const players = [];
        let player = new Player();
        for (let i = 0; i < data.length; i += 1) {
            if (data[i].trim().length === 0) {
                continue;
            }
            const rowAsList = data[i].trim()
                .replace(/\s+/g, " ")
                .split(" ")
                .map(x => numberMap[x]);
            player.board.push(rowAsList)
            if (player.board.length === SIZE) {
                players.push(player);
                player = new Player();
            }
        }
        this.players = players;
    }

    play() {
        for (const number of this.numbers) {
            console.log("The next number is...", number.value)
            number.call();
            const winners = this.players.filter(b => b.bingo());
            if (winners[0]) {
                console.log("Ladies and gentlemen, we have a winner!", winners[0].id);
                console.log("Winning score", winners[0].score(number.value), "\n");
                break;
            }
            console.log("No winners for this number :(", "\n")
        }
    }

    findLosingScore() {
        let players = this.players;
        for (const number of this.numbers) {
            number.call();
            if (players.length > 1) {
                players = players.filter(b => !b.bingo());
            } else if (players[0].bingo()) {
                console.log("And the loser is:", players[0].id);
                console.log("Losing score", players[0].score(number.value));
                break;
            }
        }
    }
}

const bingoNight = new Bingo(dataSet);
bingoNight.play();
bingoNight.findLosingScore();
