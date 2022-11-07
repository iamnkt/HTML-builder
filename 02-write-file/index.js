const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout } = process;

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const rl = readline.createInterface({input, output});
stdout.write('please, type the text:\n');
rl.on('SIGINT', () => {
  rl.close();
});
rl.on('line', (input) => {
  if (input === 'exit') {
    return rl.close();
  }
  output.write(`${input}\n`);
});
process.on('exit', () => stdout.write('completed!'));