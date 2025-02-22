const fs = require('fs');
const path = require('path');

// 读取 images 文件夹中的所有 jpg 文件
const imagesDir = path.join(__dirname, 'images');
const imageFiles = fs.readdirSync(imagesDir)
    .filter(file => file.toLowerCase().endsWith('.jpg'));

// 生成图片列表代码
const imageListCode = `
// 自动生成的图片列表
const imageFiles = ${JSON.stringify(imageFiles, null, 4)};
`;

// 更新 universe.js 文件
const universeJsPath = path.join(__dirname, 'universe.js');
let universeJs = fs.readFileSync(universeJsPath, 'utf8');

// 替换图片列表部分
universeJs = universeJs.replace(
    /const imageFiles = \[([\s\S]*?)\];/,
    imageListCode
);

fs.writeFileSync(universeJsPath, universeJs);

console.log(`已更新 universe.js，共找到 ${imageFiles.length} 张图片`); 