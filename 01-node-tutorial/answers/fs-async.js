const { writeFile } = require('fs');
console.log("at start");
writeFile('./temporary/fileB.txt','This is line 1\n',{flag:'a'},(err,result) => {
    console.log("at point 1\n")
    if(err){
        console.log('error:',err)
    }
    else{
        console.log("line 1 written\n")
        writeFile('./temporary/fileB.txt','This is line 2\n',{flag:'a'},(err,result) => {
            console.log("at point 2")
            if(err){
                console.log('error:',err)
            }
            else{
                console.log("line 2 written\n")
                writeFile('./temporary/fileB.txt','This is line 3\n',{flag:'a'},(err,result) => {
                    console.log("at point 3\n")
                    if(err){
                        console.log('error:',err)
                    }
                    else{
                        console.log("line 3 written\n")
                        console.log("at end")
                    }
                });
            }
        });
    }
});
