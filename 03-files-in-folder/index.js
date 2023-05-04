const path = require('path');
const fs = require('fs');
console.log(path.join(__dirname, 'secret-folder'))
fs.readdir(path.join(__dirname, 'secret-folder'), (err,files)=>{
  if(err) throw err;
  console.log(files)
} )