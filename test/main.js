const fs = require('fs');
const dirPath = 'test/expect/css/';
let textObj = {};

// ファイルの削除
const ul = (fileName) => {
  fs.unlinkSync(dirPath + fileName);
}

// ファイルネームを投げたら１行のtextが取れる
const rf = (fileName) => {
   textObj[fileName] = fs.readFileSync(dirPath + fileName).toString();
};

// テキストの取得
const gt = (fileName) => {
  return fs.readFileSync(dirPath + fileName).toString();
}

//改行とスペースとセミコロンの削除
const cr = (fileName) => {
  textObj[fileName] = textObj[fileName].replace(/\r?\n?\s|\;/g, '');
}

// classの配列追加
const rc = (fileName) => {
  textObj[fileName] = textObj[fileName].match(/\.[^}]*\}/g);
}

// classの取得
const gc = (string) => {
  const classNamePlus =  string.match(/\.[^{]*\{/g);
  for (var i = 0; i < classNamePlus.length; i++) {
    classNamePlus[i] = classNamePlus[i].replace(/\{/, '');
  }
  return classNamePlus;
}

// ファイルの上書き
const wf = () => {
  fs.writeFileSync(dirPath + 'message.txt', '');
}

// dataの書き出し
const afd = (data) => {
  fs.appendFileSync(dirPath + 'message.txt', data);
}

// 各ファイルへのアクセス
const af = (fileName) => {
  textObj[fileName].map(afd);
}


// ディレクトリ内のファイル読み込み
const rd = (dirPath) => {
  return fs.readdirSync(dirPath);
}

// ul('message.txt');
let fileNameArray = rd(dirPath);
fileNameArray.map(rf);
fileNameArray.map(cr);
fileNameArray.map(rc);
fileNameArray.map(af);

const classListString = gt('message.txt');
const classListArray = gc(classListString);
classListArray.map((e) => {console.log(e);})

ul('message.txt');
