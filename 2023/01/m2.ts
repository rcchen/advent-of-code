import fs from "fs";
import readline from "readline";

const input = readline.createInterface({
  input: fs.createReadStream(new URL("a.in", import.meta.url))
});

const re = /(one|two|three|four|five|six|seven|eight|nine|zero|\d)/g;

function getNumber(s: string): number {
  const maybeNumber = Number.parseInt(s, 10);
  if (Number.isNaN(maybeNumber)) {
    switch (s) {
      case "one":
        return 1;
      case "two":
        return 2;
      case "three":
        return 3;
      case "four":
        return 4;
      case "five":
        return 5;
      case "six":
        return 6;
      case "seven":
        return 7;
      case "eight":
        return 8;
      case "nine":
        return 9;
    }
  } else {
    return maybeNumber;
  }
}

let total = 0;
input.on("line", line => {
  const matches = [];
  let match;
  while ((match = re.exec(line)) !== null) {
    matches.push(match[0]);
      re.lastIndex = match.index+1;
  }

  const m1 = getNumber(matches[0]);
  const m2 = getNumber(matches[matches.length - 1]);
  const subtotal = m1 * 10 + m2;
  
  total += (m1 * 10 + m2);
});

input.on("close", () => {
  console.log(total);
});