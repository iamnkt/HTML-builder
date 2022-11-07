const fs = require('fs');
const path = require('path');
const { readdir, copyFile, exists } = require('fs');

const input = path.join(__dirname, 'files');

async function create() {
  try {
    const createDir = await fs.promises.mkdir('./04-copy-directory/files-copy');
    console.log('directory was created!');
  } catch (e) {
    console.error('directory already exists!');
  }
}

async function copy() {
  try {
    const files = await fs.promises.readdir(input);
    const output = path.join(__dirname, 'files-copy');
    for (const file of files.values()) {
      try {
        await fs.promises.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file));
        console.log(`${file} was copied`)
      } catch {
        console.log('the file could not be copied');
      }
    }
  } catch(e) {
    console.error(e.message);
  }
}

create();
copy();