// const fs = require('fs');

// const filePath = 'node_modules/gun/sea.js'; // Replace with your actual file path
// const searchString = './lib/text-encoding'; // String to be replaced
// const replaceString = './lib/text-encoding/index.js'; // Replacement string

// fs.readFile(filePath, 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//   } else {
//     const modifiedContent = data.replace(searchString, replaceString);
//     fs.writeFile(filePath, modifiedContent, 'utf8', (err) => {
//       if (err) {
//         console.error(err);
//       } else {
//         console.log('String replaced successfully!');
//       }
//     });
//   }
// });