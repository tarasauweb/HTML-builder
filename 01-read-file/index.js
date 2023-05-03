const path = require('path');
const fs = require('fs')


// console.log(path.join(__dirname))
fs.readFile(path.join(__dirname,'text.txt'),'utf-8' , (err,data)=>{
  if(err) throw err;
  else console.log(data)
})