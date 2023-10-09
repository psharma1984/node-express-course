const {readFile, writeFile} = require('fs').promises;
const content = "This is Line1\n";

//read first file
readFile('./temporary/first.txt', 'utf8')
.then((data) => {
    first = data;
    return readFile('./temporary/second.txt', 'utf8')   //read second file
    .then((data) => {
        second = data;
        //write to file temp.txt
        return writeFile('./temporary/temp.txt',`${content}\n${first}\n${second}`,{flag:'a'})
        .then(() => {
            console.log("File is written."); // Write file...Success!!!
          })
          .then(() => {
            return readFile('./temporary/temp.txt','utf-8'); //reading temp.txt
            }) 
            .then((data) => {
                console.log("File temp.text contents are as under \n", data);  //display temp.txt
            })            
    })
})           
.catch((err) => {
    console.error("An error occurred:", err);
});

