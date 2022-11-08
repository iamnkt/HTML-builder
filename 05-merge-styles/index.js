const fs = require('fs');
const path = require('path');
const { readdir } = require('fs');
const input = path.join(__dirname, 'styles');
const output = path.join(__dirname, 'project-dist', 'bundle.css');

async function mergeStyles() {
  try {
    await fs.promises.writeFile(output, '');
    const files = await fs.promises.readdir(input); 
    for (const file of files) {
      const attr = await fs.promises.stat(path.join(input, file));
      const ext = path.extname(path.join(input, file));
      if (attr.isFile() && ext === '.css') {
        let data = await fs.promises.readFile(path.join(__dirname, 'styles', file),  'utf-8');
        await fs.promises.appendFile(output, `${data}\n`);
      }
    }
  } catch(e) {
    console.error(e.message);
  }
}

mergeStyles();