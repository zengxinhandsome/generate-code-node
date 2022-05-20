import fs from 'fs';
import path from 'path';
import data from './data.js';

const createFolderByData = (data, dir) => {
  data.forEach(item => {
    const currentDir = path.join(dir, item.name);
    if (item.type === 'folder') {
      if (!fs.existsSync(currentDir)) {
        fs.mkdirSync(currentDir);
      }
    } else if (item.type === 'file') {
      if (!fs.existsSync(currentDir)) {
        fs.writeFileSync(currentDir, item.content, err => {});
      }
    }

    if (item.children) {
      createFolderByData(item.children, currentDir);
    }
  });
};

// createFolderByData(data, './');

// console.log(path.dirname(__filename));
// fs.mkdir('/test', err => {
//   console.log('error', err);
// });

// console.log(fs.existsSync('test'));

// fs.mkdirSync('test/test1');

// fs.writeFileSync('./test/test1.txt', 'hello world', err => {});

// const arr = [];

// fs.readdirSync('./_template').forEach(async file => {
//   const isDirectory = await fs.lstatSync(path.join('./_template', file)).isDirectory();

//   if (isDirectory) {
//     fs.readdir('./_template', (err, files) => {
//       files.forEach(file => {
//         console.log(file);
//       });
//     });
//   } else {
//     const fileContent = await fs.readFileSync(path.join('./_template', file), 'utf-8');

//     console.log('fileContent: ', fileContent);
//   }
// });

const createFileJson = async (dir, jsonData = []) => {
  await fs.readdirSync(dir, (err, files) => {
    files.forEach(async file => {
      const isDirectory = await fs.lstatSync(path.join(dir, file)).isDirectory();
      console.log(file, '---', isDirectory);
      if (isDirectory) {
        jsonData.push({
          type: 'folder',
          name: file
        });
      } else {
        jsonData.push({
          type: 'file',
          name: file
        });
      }
    });
  });
  return jsonData;
};

const jsonData = await createFileJson('./_template');

console.log('jsonData: ', jsonData);

