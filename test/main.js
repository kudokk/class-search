const fs = require('fs');

const rf = (fileName) => {
  const readableStream = fs.createReadStream('test/expect/' + fileName);
  readableStream.on('data', function(data) {
    console.log(data);
    console.log(data.toString());
    return data.toString();
  });
};

fs.readdir('test/expect', (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
  const text = data.map(rf);
  console.log(text);
});

// fs.open('test1.txt', 'r', (err, fd) => {
//   if (err) console.log(err);;
//   console.log(fd);
// })
