const { stdin  , stdout } = process;
const fs = require('fs');


stdout.write('Hello! Write your text ... \n');
const out = fs.createWriteStream('notes.text');
stdin.on('data' , data =>{
  const myData = data.toString().trim()
  if(myData === 'exit') {
    process.exit()
  }
  out.write(myData)
})

process.on('exit' , ()=> console.log('Buy!Good Luck!'))