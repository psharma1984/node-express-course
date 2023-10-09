const {createReadStream} = require('fs');

const stream = createReadStream('../content/big.txt',{ encoding: 'utf8', highWaterMark: 650000 });

let counter = 0

stream.on('data',() => {
    counter ++;
    console.log(`Received ${counter} chunks of data`)
});

stream.on('end', () => {
    console.log(`Chunks Recieved : ${counter}`)
})

stream.on('error', (err) => {
    console.log("An error Occured : ", err)
})

stream.emit()