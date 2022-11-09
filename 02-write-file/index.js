const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout } = process;

const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const rl = readline.createInterface({input, output});
stdout.write('please, type the text:\n');
rl.on('line', (input) => {
  if (input === 'exit') {
    console.log('completed!');
    return rl.close();
  }
  output.write(`${input}\n`);
});

rl.on('SIGINT', () => {
  process.emit('SIGINT');
  rl.close();
});

process.on('SIGINT', () => {
  console.log('completed!');
  process.exit();
});