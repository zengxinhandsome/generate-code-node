import fs from 'fs';
import path from 'path';
import fileJsonData from './fileJson.js';

/**
 * 通过 json data 生成模板文件 
 */
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

createFolderByData(fileJsonData, './');


/**
 * 通过模板文件生成对应的 json data
 */
const createFileJson = (dir, jsonData) => {
  if (!jsonData.children) {
    jsonData.children = [];
  }
  const files = fs.readdirSync(dir, err => {});

  files.forEach(file => {
    const isDirectory = fs.lstatSync(path.join(dir, file)).isDirectory();
    if (isDirectory) {
      const item = {
        type: 'folder',
        name: file
      };

      jsonData.children.push(item);
      createFileJson(path.join(dir, file), item);
    } else {
      const content = fs.readFileSync(path.join(dir, file), 'utf-8');

      jsonData.children.push({
        type: 'file',
        name: file,
        content
      });
    }
  });
};

let arr = [
  {
    type: 'folder',
    name: '_template'
  }
];

// createFileJson('./vue3-antd-code', arr[0]);

// fs.writeFileSync('./arr.js', 'export default ' + JSON.stringify(arr));

