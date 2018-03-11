const fs = require('fs');
const path = require('path');
const dirPath = 'test/expect';
const htmlDirPath = 'test/expect/html/';
let fileObj = {'html': [], 'css': [], 'cssClassRaw': [], 'cssClass': []};

// ファイルの削除
const ul = (fileName) => {
  fs.unlinkSync(dirPath + fileName);
}

// ファイルの削除
const ulh = (fileName) => {
  fs.unlinkSync(htmlDirPath + fileName);
}

// ファイルネームを投げたら１行のtextが取れる
const rf = (fileName) => {
   return fs.readFileSync(fileName).toString();
}

// ファイルネームを投げたら１行のtextが取れる
const rfh = (fileName) => {
   textObj['html'][fileName] = fs.readFileSync(htmlDirPath + fileName).toString();
}

// テキストの取得
const gt = (fileName) => {
  return fs.readFileSync(dirPath + fileName).toString();
}

// テキストの取得
const gth = (fileName) => {
  return fs.readFileSync(htmlDirPath + fileName).toString();
}

// 改行の削除
const gl = (fileName) => {
  textObj['html'][fileName] = textObj['html'][fileName].replace(/\r?\n/g, '');
}

//改行とスペースとセミコロンの削除
const cr = (text) => {
  text = text.replace(/\r?\n?\s|\;/g, '');
  return text.match(/\.[^}]*\}/g);
}

// classRawの展開
const crt = (list) => {
  list.map(e => { fileObj['cssClassRaw'].push(e)});
}

// classの展開
const ct = (list) => {
  list.map(e => { fileObj['cssClass'].push(e)});
}

// classの取得
const gc = (string) => {
  const classNamePlus =  string.match(/\.[^{]*\{/g);
  for (var i = 0; i < classNamePlus.length; i++) {
    classNamePlus[i] = classNamePlus[i].replace(/\.|\{/g, '');
  }
  return classNamePlus;
}

// classの取得（html）
const gch = (string) => {
  let classNamePlus = string.match(/class="[0-9a-z\s\-\_]*"/g);
  for (var i = 0; i < classNamePlus.length; i++) {
    classNamePlus[i] = classNamePlus[i].replace(/"/g, '');
    classNamePlus[i] = classNamePlus[i].replace(/class=/, '');
    if (classNamePlus[i].match(/\s/g) !== null) {
      var array = classNamePlus[i].split(/\s/g);
      classNamePlus.splice(i, 1);
      i--;
      Array.prototype.push.apply(classNamePlus, array);
    }
  }
  return (classNamePlus);
}

// ファイルの上書き
const wf = () => {
  fs.writeFileSync(dirPath + 'css.txt', '');
}

// dataの書き出し
const afd = (data) => {
  fs.appendFileSync(dirPath + 'css.txt', data);
}

// dataの書き出し
const afdh = (data) => {
  fs.appendFileSync(htmlDirPath + 'html.txt', data);
}

// 各ファイルへのアクセス
const af = (fileName) => {
  textObj['css'][fileName].map(afd);
}

// 各ファイルへのアクセス
const afh = (fileName) => {
  textObj['html'][fileName].map(afdh);
}

// cssファイルを,[css]key配下に絶対パスを配列として追加
// htmlファイルを,[html]key配下に絶対パスを配列として追加
const listFiles = (dir) => {
  const paths = fs.readdirSync(dir);
  paths.forEach(a => {
    const path = `${dir}/${a}`;

    if (fs.statSync(path).isFile()) {
      if (/.*\.css$/.test(path)) {
        fileObj['css'].push(path);
      }else if (/.*\.html$/.test(path)) {
        fileObj['html'].push(path);
      }
    }

    if (fs.statSync(path).isDirectory()) {
      listFiles(path);
    }
  })
};

// ディレクトリ内のファイル読み込み
const rda = (files) => {
  let fileList = array.filter(function(file){
      // return fs.statSync(dirPath).isFile() && /.*\.css$/.test(file); //絞り込み
  })
  return fileList;
}

// 不使用クラスを配列に
const uc  = (className) => {
  for (var i = 0; i < htmlClassListArray.length; i++) {
    if (htmlClassListArray[i] === className) {
      return i;
    }
  }
  console.log(className);
}

// 指定ディレクトリ配下全て列挙
listFiles(dirPath);
//
let cssTextArray = fileObj['css'].map(rf);
cssTextArray = cssTextArray.map(cr);
cssTextArray.map(crt);
// 
let classListArray = fileObj['cssClassRaw'].map(gc);
classListArray.map(ct);
console.log('--------fileObj--------');
console.log(fileObj);
//
//
// let htmlNameArray = rd(htmlDirPath);
// htmlNameArray.map(rfh);
// htmlNameArray.map(gl);
// htmlNameArray.map(rch);
// htmlNameArray.map(afh);
//
// const htmlClassListString = gth('html.txt');
// const htmlClassListArray = gch(htmlClassListString);


console.log('------un-use-classes------');
// let matchClassListArray = classListArray.map(uc);
// ul('css.txt');
// ulh('html.txt');
