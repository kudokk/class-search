module.exports = function (grunt) {

  grunt.registerTask('class-search', function () {
    const fs = require('fs');
    const path = require('path');
    const dirPath = grunt.config('search').dir;
    let fileObj = {'html': [], 'htmlClass': [], 'css': [], 'cssClassRaw': [], 'cssClass': []};

    // ファイルネームを投げたら１行のtextが取れる
    const rf = (fileName) => {
      return fs.readFileSync(fileName).toString();
    }

    // 改行の削除
    const gl = (text) => {
      return text.replace(/\r?\n/g, '');
    }

    //改行とスペースとセミコロンの削除,classRawの取得
    const cr = (text) => {
      text = text.replace(/\r?\n?\s|\;/g, '');
      return text.match(/\.[^}]*\}/g);
    }

    // classRawの展開
    const crt = (list) => {
      list.map(e => { fileObj['cssClassRaw'].push(e)});
    }

    // cssclassの展開
    const ct = (list) => {
      list.map(e => { fileObj['cssClass'].push(e)});
    }

    // htmlclassの展開
    const cth = (list) => {
      list.map(e => { fileObj['htmlClass'].push(e)});
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

      // 不使用クラスを配列に
      const uc  = (className) => {
        for (var i = 0; i < fileObj['htmlClass'].length; i++) {
          if (className === fileObj['htmlClass'][i]) {
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
      //
      //
      let htmlNameArray = fileObj['html'].map(rf);
      htmlNameArray = htmlNameArray.map(gl);

      const htmlClassListArray = htmlNameArray.map(gch);
      htmlClassListArray.map(cth);

      console.log('------un-use-classes------');
      let matchClassListArray = fileObj['cssClass'].map(uc);

    });
};
