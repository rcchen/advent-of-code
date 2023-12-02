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
  for (const bag of bags) {
    const bagState = parseBag(bag);
    if (bagState["red"] > 12 || bagState["green"] > 13 || bagState["blue"] > 14) {
      return false;
    }
  }
  return true;
}

let total = 0;
let game = 0;
input.on("line", line => {
  game += 1;
  const isValid = parseGame(line);
  if (isValid) {
    total += game;
  }
});

input.on("close", () => {
  console.log(total);
});