const fs = require('fs');
const path = require('path');
fs.readdir(path.join(__dirname , 'secret-folder') , (err,files)=>{
  if(err) throw err
  files.map(file=>{
    fs.stat(path.join(__dirname,'secret-folder' , file) , (err,stats)=>{
      if(err) throw err
      if(stats.isFile()){
        console.log(path.basename(file , path.extname(file)) + ' -- ' +  path.extname(file).toString().slice(1) + ' -- ' + stats.size/1000 + 'kb')
      }
    })
  })
})