import fs from "fs";
import readline from "readline";

const input = readline.createInterface({
  input: fs.createReadStream(new URL("a.in", import.meta.url))
});

const FORWARD = /(\d)/;
const BACKWARD = /.*(\d)/;

let total = 0;
input.on("line", line => {
  const [_m1, m1] = line.match(FORWARD);
  const [_m2, m2] = line.match(BACKWARD);
  const subtotal = Number.parseInt(`${m1}${m2}`, 10);
  total += subtotal;
});

input.on("close", () => {
  console.log(total);
});