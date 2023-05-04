const { stdin  , stdout } = process;
const fs = require('fs');
const stream =fs.createWriteStream('notes.txt')
stdout.write('Hello! Write your text ... \n');
stdin.on('data' , data=>{
  data = data.toString().trim()
  if(data === 'exit'){
    process.exit()
  }
  stream.write(data + '\n')
})
process.on('exit' , ()=>{console.log('Buy!Good Luck!')})
