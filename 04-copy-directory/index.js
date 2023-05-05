const fs = require("fs");
const path = require("path");
const promise = fs.promises;

function copyDir() {
  promise.mkdir('files-copy' ,{recursive:true})
  promise.readdir('files-copy').then((files)=>{
    files.forEach(file=>{
      promise.unlink(path.join(__dirname , 'files-copy' , file))
    })
  })
  promise.readdir(path.join(__dirname,'files')).then((files)=>{
    files.forEach(file=>{
      promise.copyFile(path.join(__dirname , 'files' , file) , path.join(__dirname , 'files-copy' , file))
    })
  }).then(()=>{
    console.log(`Copy complited ... `)
  })
  
  
}

copyDir();
