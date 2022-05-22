import fs from 'fs';
import path from 'path';

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

