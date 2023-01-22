const fs = require("fs");
const dir = "C:/Users/SanDaKu/Desktop/Shop";

const jsonStr = fs.readFileSync("data.json");
const items = JSON.parse(jsonStr);

const directoryFound = items.reduce((sum, eachItem) => {
  const directory = eachItem.images.filter((eachImage) =>
    fs.lstatSync(eachImage.fromPath).isDirectory()
  );
  return sum.concat(directory);
}, []);

if (directoryFound.length) {
  fs.writeFileSync("directory.json", JSON.stringify(directoryFound));
  throw new Error("Directory are found");
}

const notFound = items.reduce((sum, each) => {
  const current = each.images.filter(
    (eachImage) => !fs.existsSync(eachImage.fromPath)
  );
  return sum.concat(current);
}, []);

if (notFound.length) {
  fs.writeFileSync("not-found.json", JSON.stringify(notFound));
  throw new Error("Images are found");
}

// items.forEach((each, itemIndex) => {
//   each.images
//     .filter((each) => each !== "notes.txt")
//     .forEach((eachImage) => {
//       fs.copyFileSync(eachImage.fromPath, eachImage.toPath);
//     });
// });

const reg = new RegExp(/(\d+\.\w{3,4})$/);
items.forEach((each) => {
  const postPath = `../posts/${each.cleanName}.md`;
  let content = ["**Description:**", "**Price:**"].join("\n\n") + "\n\n";

  if (each.notesTxt) {
    const notesPath = `${dir}/${each.fileName}/notes.txt`;
    content = fs.readFileSync(notesPath);
    content = content + "\n\n";
  }

  content =
    content +
    each.images
      .filter((each) => each !== "notes.text")
      .map((eachImage) => {
        const fileName = eachImage.toPath.match(reg)[1];
        return `![${fileName}](../images/${fileName})`;
      })
      .filter(Boolean)
      .join("\n\n");

  fs.writeFileSync(postPath, content);
});
