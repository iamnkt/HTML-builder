const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { readdir, copyFile } = require('fs');

async function makeBundle() {
  try {
    const input = path.join(__dirname, 'styles');
    const files = await fs.promises.readdir(input);
    const bundleArr = [];
    for (file of files) {
      const attr = await fs.promises.stat(path.join(input, file));
      const ext = path.extname(path.join(input, file));
      if (attr.isFile() && ext === '.css') {
        const stream = fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8');
        let data = '';
        stream.on('data', chunk => data += chunk);
        stream.on('end', () => {
          bundleArr.push(data);
        });
      }
    }
    return bundleArr;
  } catch(e) {
    console.error(e.message);
  }
}

async function makeBundle() {
  try {
    const input = path.join(__dirname, 'styles');
    const files = await fs.promises.readdir(input);
    const bundleArr = [];
    await Promise.all(files.map(async (file) => { 
      const res = await filesIterator(file, input);
      console.log(res);
      bundleArr.push(res);
    }))
    return bundleArr;
  } catch(e) {
    console.error(e.message);
  }
}


async function filesIterator(file, input) {
  const attr = await fs.promises.stat(path.join(input, file));
  const ext = path.extname(path.join(input, file));
  if (attr.isFile() && ext === '.css') {
    const stream = fs.createReadStream(path.join(__dirname, 'styles', file), 'utf-8');
    let data = '';
    stream.on('data', chunk => data += chunk);
    stream.on('end', () => {
      return data;
    });
  }
}

// makeBundle().then((data) => {
//   console.log(data);
// });

(async function () {
  const res = await makeBundle();
  console.log(res);
})()