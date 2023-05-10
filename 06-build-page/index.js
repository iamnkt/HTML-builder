const path = require('path');
const fs = require('fs');
const { readdir } = require('fs');

async function createProjectDist() {
  try {
    const createMainDir = await fs.promises.mkdir('./project-dist');
    const createAssetsDir = await fs.promises.mkdir('./project-dist/assets');
    console.log('directory was created!');
  } catch (e) {
    console.error('directory already exists!');
  }
}

async function createIndexHtml() {
  try {
    let template = await fs.promises.readFile(path.join(__dirname, 'template.html'),  'utf-8');
    const components = await fs.promises.readdir(path.join(__dirname, 'components'));
    for (let i = 0; i < components.length; i++) {
      let data = await fs.promises.readFile(path.join(__dirname, 'components', components[i]),  'utf-8');
      let component = `{{${components[i].split('.')[0]}}}`;
      template = template.replace(`${component}`, `${data}`);
      await fs.promises.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template);
    }
  } catch (e) {
    console.error(e.message);
  }
}

async function mergeStyles() {
  try {
    const files = await fs.promises.readdir(path.join(__dirname, 'styles'));
    for (const file of files) {
      const attr = await fs.promises.stat(path.join(path.join(__dirname, 'styles'), file));
      const ext = path.extname(path.join(path.join(__dirname, 'styles'), file));
      if (attr.isFile() && ext === '.css') {
        let data = await fs.promises.readFile(path.join(__dirname, 'styles', file),  'utf-8');
        await fs.promises.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '');
        await fs.promises.appendFile(path.join(__dirname, 'project-dist', 'style.css'), `${data}\n`);
      }
    }
  } catch(e) {
    console.error(e.message);
  }
}

async function copyAssets() {
  try {
    const assets = await fs.promises.readdir(path.join(__dirname, 'assets'), { withFileTypes: true });
    for (const asset of assets) {
      if (asset.isDirectory()) {
        await fs.promises.mkdir(`${path.join(__dirname, 'project-dist/assets')}/${asset.name}`, { recursive: true });
        const files = await fs.promises.readdir(`${path.join(__dirname, 'assets')}/${asset.name}`, { withFileTypes: true });
        for (const file of files) {
          if (file.isFile()) {
            await fs.promises.copyFile(`${path.join(__dirname, 'assets')}/${asset.name}/${file.name}`, `${path.join(__dirname, 'project-dist/assets')}/${asset.name}/${file.name}`);
            console.log(`${file.name} was copied`)
          }
        }
      }
    }
  } catch(e) {
    console.error(e.message);
  }
}

createProjectDist();
createIndexHtml();
mergeStyles();
copyAssets();