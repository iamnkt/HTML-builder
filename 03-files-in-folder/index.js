const path = require('path');
const fs = require('fs');
const { readdir } = require('fs');

const input = path.join(__dirname, 'secret-folder');
async function showInf() {
  try {
    const files = await fs.promises.readdir(input);
    for (const file of files) {
      const attr = await fs.promises.stat(path.join(input, file));
      if (attr.isFile()) {
        const ext = path.extname(path.join(input, file)).slice(1);
        console.log(`${file.split('.')[0]} - ${ext} - ${attr.size}b`);
      }
    }
  } catch(e) {
      console.error(e);
    }
};
showInf();