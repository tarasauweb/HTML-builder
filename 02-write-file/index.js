const { stdin  , stdout } = process;
const fs = require('fs');
const path = require('path');

stdout.write('Hello! Write your text ... \n');

fs.open('notes.txt' , 'w' , (err)=> {if(err)throw err});

stdin.on('data' , data=>{
  fs.appendFile(path.join(__dirname , 'notes.txt'),
    data,
    err=>{
      if(err) throw err
      
    }
  )
  if(data === 'exit') process.exit()
})

process.on('exit' , (code)=>{
  if(code === 0) {
    stdout.write('Good Luck!')
  }
  else{
    stdout.write('Oh no :( . Some Err')
  }
});