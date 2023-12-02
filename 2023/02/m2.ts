import fs from "fs";
import readline from "readline";

const input = readline.createInterface({
  input: fs.createReadStream(new URL("a.in", import.meta.url))
});

function parseBag(input: string) {
  const game = {};
  const balls = input.split(/, */);
  for (const coloredBall of balls) {
    const [count, color] = coloredBall.split(" ");
    game[color] = Number.parseInt(count, 10);
  }
  return game;
}

function parseGame(input: string) {
  const [_, ...bags] = input.split(/[\:\;] */);
  const bestGame = {
    "red": 0,
    "green": 0,
    "blue": 0,
  }
  for (const bag of bags) {
    const bagState = parseBag(bag);
    for (const [color, count] of Object.entries(bagState)) {
      if (count > bestGame[color]) {
        bestGame[color] = count;
      }
    }
  }
  return Object.values(bestGame).reduce((agg, n) => agg * n, 1);
}

let total = 0;
input.on("line", line => {
  total += parseGame(line);
});

input.on("close", () => {
  console.log(total);
});