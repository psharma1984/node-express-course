const {readFile, writeFile} = require('fs').promises;

const writer = async() => {
    try{
        const content = "This is Line1\n";
        const first = await readFile('./temporary/first.txt', 'utf8');
        const second = await readFile('./temporary/second.txt', 'utf8');
        await writeFile('./temporary/temp.txt',`${content}\n ${first}\n ${second}`,{flag:'a'});
        console.log("File 'temp.txt' has been written successfully.");
    }
    catch(err){
        console.log("An error occured: ", err)
    }
}

const reader = async() => {
    try{
        const data = await readFile('./temporary/temp.txt','utf8');
        console.log('File temp.text contents: ',data);
    }
    catch(err){
        console.log("An error occured:",err)
    }
}

const readWrite = async() => {
    try{
        await writer();
        await reader();
    }
    catch(err){
        console.log("An error occured : ",err);
    }
    
}

readWrite();