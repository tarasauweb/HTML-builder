const fs = require("fs");
const path = require("path");
const promise = fs.promises;

promise
  .stat(path.join(__dirname, "styles", "bundle.css"))
  .then((stats) => {
    promise.unlink(path.join(__dirname, "styles", "bundle.css"));
  })
  .catch(() => {
    return;
  });
const bundle = fs.createWriteStream(path.join(__dirname , 'project-dist' , 'bundle.css') )
promise
  .readdir(path.join(__dirname, "styles"))
  .then((files) => {
    let data ;
    files.forEach((file) => {
      if (path.extname(file.toString().trim()) === ".css") {
        let stream = fs.createReadStream(path.join(__dirname , 'styles' , file))
        stream.on('data' , chunk => data += chunk);
        stream.on('end' , ()=>bundle.write(data))
      }
    });
  })
  .catch((err) => {
    throw err;
  });
