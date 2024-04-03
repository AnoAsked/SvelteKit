const fs = require('fs');

const filePath = 'node_modules/gun/sea.js'; // Replace with your actual file path

const searchString1 = 'api.TextDecoder = TextDecoder;'; // String to be replaced
const replaceString1 = 'api.TextDecoder = global.TextDecoder;'; // Replacement string
const searchString2 = 'api.TextEncoder = TextEncoder;'; // String to be replaced
const replaceString2 = 'api.TextEncoder = global.TextEncoder;'; // Replacement string
const searchString3 = 'const { TextEncoder, TextDecoder }'; // String to be replaced
const replaceString3 = '//const { TextEncoder, TextDecoder }'; // Replacement string

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    const modifiedContent = data.replace(searchString1, replaceString1).replace(searchString2, replaceString2).replace(searchString3, replaceString3);
    fs.writeFile(filePath, modifiedContent, 'utf8', (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('String replaced successfully!');
      }
    });
  }
});