const fs = require('fs');
const dirPath = 'test/expect/';
let textObj = {};
textObj.ab = "java\nscript";
console.log(textObj.ab);

// ファイルネームを投げたらtextが取れる
const rf = (fileName) => {
   textObj[fileName] = fs.readFileSync(dirPath + fileName).toString().split('\n');
};

// dataの書き出し
const wf = (data) => {
  fs.appendFile(dirPath + 'message.txt', data, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('The file has been saved!');
  });
}

// ディレクトリ内のファイル読み込み
const rd = (dirPath) => {
  return fs.readdirSync(dirPath);
}

const fileNameObj = rd(dirPath);
fileNameObj.map(rf);
console.log(textObj);
