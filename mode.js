// THIS MODULE WAS CREATED TO FASTER SWITCHING BETWEEN DEVELOPMENT AND PRODUCTION MODE
// YOU DON'T NEED THIS UNLESS YOU WANT TO WORK FASTER
const fs = require("fs");
const fileName = "./package.json";
const file = require(fileName);

file.mode = file.mode == "development" ? "production" : "development";
console.log(file.mode);
fs.writeFile(fileName, JSON.stringify(file), (err) => {
  if (err) return console.log(err);
  console.log("MODE UPDATED!");
});
