const readline = require("readline");
const { stdin: input, stdout: output } = require("process");
const rl = readline.createInterface({ input, output });
//  rl.question('What do you think of Node.js? ', (answer) => {
//  // TODO: Log the answer in a database
//  console.log(`Thank you for your valuable feedback: ${answer}`);
//  rl.close();
//  });
//  rl.on('close', function () {
//  process.exit();
//  });

function* add() {
  const x = yield "첫번째수는";
  const y = yield "두번째수는";
  return x + y;
}
rl.on("line", (answer) => {
  console.log("line.answer>>", answer);
  if (answer === "bye") rl.close();
}).on("close", () => {
  process.exit();
});

// 흠 이건 잘 모르겟네
