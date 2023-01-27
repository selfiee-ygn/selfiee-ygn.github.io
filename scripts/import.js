const dir = "C:/Users/SanDaKu/Desktop/Shop";
const imagePath = "C:/Users/SanDaKu/selfie-ygn/images";

const fs = require("fs");
const results = processImages();

fs.writeFileSync("data.json", JSON.stringify(results));

function processImages() {
  const files = fs.readdirSync(dir);
  let fileIndex = 0;
  return files.map((fileName) => {
    const cleanName = fileName
      .trim()
      .replace(/\s/g, "-")
      .replace(/^[-]+/, "")
      .replace(/[-]+$/, "");

    const fromPath = `${dir}/${fileName}`;

    const imageFiles = fs.readdirSync(fromPath);

    const notesTxt = imageFiles.find((each) => each === "notes.txt");

    const images = imageFiles
      .filter((each) => each !== "notes.txt")
      .map((eachImageFile) => {
        fileIndex++;
        const fileExtension = eachImageFile.split(".").pop();
        return {
          fromPath: `${fromPath}/${eachImageFile}`,
          toPath: `${imagePath}/${fileIndex}.${fileExtension}`,
        };
      });

    return {
      fileName,
      cleanName,
      notesTxt: notesTxt ? `${fromPath}/${notesTxt}` : null,
      images,
    };
  });
}
