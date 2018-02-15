const fs = require('fs');
const dirPath = 'test/expect/';
let textObj = {};

// ファイルネームを投げたらbufferが取れる
const rf = (fileName) => {
  const readableStream = fs.createReadStream(dirPath + fileName);
  readableStream.on('data', function(data) {
    return data.toString();
  });
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

// ディレクトリの読み込み。ディレクトリ内のファイル取り出し
fs.readdir(dirPath, (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
  textObj.ab = data.map(rf);
  console.log(textObj);
});
