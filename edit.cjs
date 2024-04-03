const fs = require('fs');

const sourceFile = 'node_modules/gun/lib/text-encoding/index.js';
const destinationFile = 'node_modules/gun/lib/text-encoding.js';

fs.readFile(sourceFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  fs.writeFile(destinationFile, data, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }

    console.log('File copied successfully!');
  });
});

const sourceFolder = 'node_modules/gun/lib/text-encoding/lib';
const destinationFolder = 'node_modules/gun/lib/lib'; // Separate "lib" folder

function copyFolder(source, destination) {
  fs.readdirSync(source).forEach((file) => {
    const sourceFile = `${source}/${file}`;
    const destinationFile = `${destination}/${file}`;

    // Check if the item is a directory
    if (fs.statSync(sourceFile).isDirectory()) {
      // Create a new subfolder within the destination if it doesn't exist
      if (!fs.existsSync(destinationFile)) {
        fs.mkdirSync(destinationFile);
      }

      // Recursively copy subdirectories
      copyFolder(sourceFile, destinationFile);
    } else {
      // Copy the file
      fs.copyFileSync(sourceFile, destinationFile);
      console.log(`Copied file: ${sourceFile} to ${destinationFile}`);
    }
  });
}

try {
  // Check if destination folder exists
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder); // Create the new "lib" folder
  }

  copyFolder(sourceFolder, destinationFolder);
} catch (err) {
  console.error('Error copying folder:', err.message);
}