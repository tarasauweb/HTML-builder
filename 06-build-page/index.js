const fs = require("fs");
const path = require("path");
const promise = fs.promises;

promise.mkdir("project-dist", { recursive: true });
promise
  .rm(path.join(__dirname, "project-dist", "assets"), { recursive: true })
  .then(() => {
    promise.readdir("project-dist").then((files) => {
      files.forEach((file) => {
        promise.stat(path.join(__dirname, "project-dist")).then((stats) => {
          if (stats.isDirectory()) {
            return;
          } else {
            promise.unlink(path.join(__dirname, "project-dist", file));
          }
        });
      });
    });
  })
  .catch((err) => {
    return;
  })
  .then(() => {
    promise.mkdir(path.join(__dirname, "project-dist", "assets"), {
      recursive: true,
    });
  })
  .then(() => {
    promise.readdir("assets").then((files) => {
      files.forEach((file) => {
        promise.stat(path.join(__dirname, "assets")).then((stats) => {
          if (stats.isDirectory()) {
            let pathDir = path.join(__dirname, "project-dist", "assets", file);
            promise.mkdir(pathDir).then(() => {
              promise
                .readdir(path.join(__dirname, "assets", file))
                .then((items) => {
                  items.forEach((element) => {
                    promise.copyFile(
                      path.join(__dirname, "assets", file, element),
                      path.join(
                        __dirname,
                        "project-dist",
                        "assets",
                        file,
                        element
                      )
                    );
                  });
                });
            });
          }
        });
      });
    });
  });
promise;
const bundle = fs.createWriteStream(
  path.join(__dirname, "project-dist", "style.css")
);
promise
  .readdir(path.join(__dirname, "styles"))
  .then((files) => {
    let data;
    files.forEach((file) => {
      if (path.extname(file.toString().trim()) === ".css") {
        let stream = fs.createReadStream(path.join(__dirname, "styles", file));
        stream.on("data", (chunk) => (data += chunk));
        stream.on("end", () => bundle.write(data));
      }
    });
  })
  .then(() => {
    const template = fs.createReadStream(
      path.join(__dirname, "template.html"),
      "utf-8"
    );
    const indexHtml = fs.createWriteStream(
      path.join(__dirname, "project-dist", "index.html")
    );
    let data = "";
    template.on("data", (chunk) => {
      data += chunk;
      promise.readdir("components").then((files) => {
        files.forEach((file) => {
          if (path.extname(file) === ".html") {
            const componentName = file.slice(0, file.indexOf("."));
            let componentData = "";
            const componentStream = fs.createReadStream(
              path.join(__dirname, "components", file),
              "utf-8"
            );
            componentStream.on("data", (myChunk) => {
              componentData += myChunk;
              data = data.replace(`{{${componentName}}}`, componentData);
            });
            componentStream.on("end", () => {
              indexHtml.write(data.toString());
            });
          }
        });
      });
    });
  })

  
