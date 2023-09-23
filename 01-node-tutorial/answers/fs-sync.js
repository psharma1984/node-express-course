const {readFileSync, writeFileSync} = require('fs');
textToAppend = 'Hello. how are you?';
for (let i = 0; i < 3; i++) {
    writeFileSync('./temporary/fileA.txt', textToAppend + '\n', { flag: 'a' });
  }

result = readFileSync('./temporary/fileA.txt','utf-8');
console.log(result)