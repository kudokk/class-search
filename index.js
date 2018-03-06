var spawn = require('./lib/myModule').spawn;

module.exports = function(options) {
  const program = require('commander');
  program.option('-n, --name<value>', 'yourname', String)
  .parse(process.argv)
  console.log(program.name);

  const fs = require('fs');
  const dirPath = 'test/expect/css/';
  const htmlDirPath = 'test/expect/html/';
  let textObj = {'html': {}, 'css': {}};

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
     textObj['css'][fileName] = fs.readFileSync(dirPath + fileName).toString();
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
  const cr = (fileName) => {
    textObj['css'][fileName] = textObj['css'][fileName].replace(/\r?\n?\s|\;/g, '');
  }

  // classの配列追加
  const rc = (fileName) => {
    textObj['css'][fileName] = textObj['css'][fileName].match(/\.[^}]*\}/g);
  }

  // classの配列追加
  const rch = (fileName) => {
    textObj['html'][fileName] = textObj['html'][fileName].match(/class="[0-9a-z\s\-\_]*"/g);
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

  // ディレクトリ内のファイル読み込み
  const rd = (dirPath) => {
    return fs.readdirSync(dirPath);
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


  let fileNameArray = rd(dirPath);
  fileNameArray.map(rf);
  fileNameArray.map(cr);
  fileNameArray.map(rc);
  fileNameArray.map(af);

  const classListString = gt('css.txt');
  const classListArray = gc(classListString);


  let htmlNameArray = rd(htmlDirPath);
  htmlNameArray.map(rfh);
  htmlNameArray.map(gl);
  htmlNameArray.map(rch);
  htmlNameArray.map(afh);

  const htmlClassListString = gth('html.txt');
  const htmlClassListArray = gch(htmlClassListString);


  console.log('------un-use-classes------');
  let matchClassListArray = classListArray.map(uc);
  ul('css.txt');
  ulh('html.txt');
};
