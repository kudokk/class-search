const fs = require('fs');
const dirPath = 'test/expect/css/';
let textObj = {};
textObj.ab = "java\nscript";

// ファイルネームを投げたら１行のtextが取れる
const rf = (fileName) => {
   textObj[fileName] = fs.readFileSync(dirPath + fileName).toString();
};

//改行とスペースとセミコロンの削除
const cr = (fileName) => {
  textObj[fileName] = textObj[fileName].replace(/\r?\n?\s|\;/g, '');
}

// 行の取得
const gl = (fileName) => {
  textObj[fileName] = textObj[fileName].match(/\.[^}]*\}/g);
}

// ファイルの上書き
const wf = () => {
  fs.writeFileSync(dirPath + '../message.txt', '');
}

// dataの書き出し
const afd = (data) => {
  fs.appendFileSync(dirPath + '../message.txt', data);
}

// 各ファイルへのアクセス
const af = (fileName) => {
  textObj[fileName].map(afd);
}


// ディレクトリ内のファイル読み込み
const rd = (dirPath) => {
  return fs.readdirSync(dirPath);
}

let fileNameArray = rd(dirPath);
fileNameArray.map(rf);
fileNameArray.map(cr);
fileNameArray.map(gl);
wf();
fileNameArray.map(af);
