const path = require('path');
const { readdir, copyFile, rm, mkdir } = require('fs/promises');

const dirPath = path.join(__dirname, 'files');
const dirCopyPath = path.join(__dirname, 'files-copy');

async function copyDir(dir, dirCopy) {
  const dirFiles = await readdir(dir, { withFileTypes: true });
  for (const el of dirFiles) {
    if (el.isFile()) {
      await copyFile(dir + '\\' + el.name, dirCopy + '\\' + el.name);
    } else if (el.isDirectory()) {
      await mkdir(dirCopy + '\\' + el.name);
      await copyDir(dir + '\\' + el.name, dirCopy + '\\' + el.name);
    }
  }
}

(async function () {
  await rm(dirCopyPath, { recursive: true, force: true });
  await mkdir(dirCopyPath);
  await copyDir(dirPath, dirCopyPath);
})();
