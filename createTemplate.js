#!/usr/bin/env node

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

