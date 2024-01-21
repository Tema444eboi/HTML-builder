const path = require('path');
const fs = require('fs');
const { readdir } = require('fs/promises');

const mergeFilePath = path.join(__dirname, 'project-dist', 'bundle.css');
const readFilesPath = path.join(__dirname, 'styles');
const mergeStyles = [];

const writeStream = fs.createWriteStream(mergeFilePath);

async function getData(filePath) {
  const readStream = fs.createReadStream(filePath);
  for await (const chunk of readStream) {
    mergeStyles.push(chunk);
  }
}

readdir(readFilesPath, { withFileTypes: true }).then(async (files) => {
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(readFilesPath, files[i].name);
    if (files[i].isFile() && path.extname(filePath) === '.css') {
      await getData(filePath);
    }
  }
  writeStream.write(mergeStyles.join('\n').toString());
});
