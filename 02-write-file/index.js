const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath);
const { stdin, stdout, exit } = process;

stdout.write(
  'Please, enter your text to write it to file text.txt.\n' +
    'To exit press Ctrl + C or enter: exit\n',
);
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') exit();
  writeStream.write(data.toString());
});

process.on('exit', () => stdout.write('You are leaving this program?'));
process.on('SIGINT', exit);
