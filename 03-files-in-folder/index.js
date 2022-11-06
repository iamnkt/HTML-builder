const path = require('path');
const fs = require('fs');
const { readdir } = require('fs');

const actualPath = path.join(__dirname, 'secret-folder');
async function showInf() {
  try {
    const files = await fs.promises.readdir(actualPath);
    for (const file of files) {
      const attr = await fs.promises.stat(path.join(actualPath, file));
      if (attr.isFile()) {
        const ext = path.extname(path.join(actualPath, file)).slice(1);
        console.log(`${file.split('.')[0]} - ${ext} - ${attr.size}b`);
      }
    }
  } catch (err) {
      console.error(err);
    }
};
showInf();