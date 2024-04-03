const fs = require('fs'); // Load the 'fs' module

const sourceFile = 'text-encoding.js';
const destinationFolder = 'node_modules/gun/lib';

function copyFile() {
  try {
    // Get the filename from the source path
    const filename = sourceFile.split('/').pop();

    // Construct the complete destination file path
    const destinationFile = `${destinationFolder}/${filename}`;

    // Copy the file using fs.copyFile
    fs.copyFile(sourceFile, destinationFile, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('text-encoding file copied to node_modules/gun/lib successfully!');
      }
    });
  } catch (error) {
    console.error(error);  // Handle potential errors during path manipulation
  }
}

copyFile();