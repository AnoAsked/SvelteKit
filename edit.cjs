const fs = require('fs');

const filePath = 'node_modules/gun/sea.js'; // Sea module to edit

const oldTextDecoder = 'api.TextDecoder = TextDecoder;';
const newTextDecoder = 'api.TextDecoder = global.TextDecoder;';
const oldTextEncoder = 'api.TextEncoder = TextEncoder;';
const newTextEncoder = 'api.TextEncoder = global.TextEncoder;';
const oldRequire = 'const { TextEncoder, TextDecoder }';
const newRequire = '//const { TextEncoder, TextDecoder }';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
  } else {
    const modifiedContent = data.replace(oldTextDecoder, newTextDecoder)
                                .replace(oldTextEncoder, newTextEncoder)
                                .replace(oldRequire, newRequire);
    fs.writeFile(filePath, modifiedContent, 'utf8', (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Replaced the text-encoder definition and imports with global instances.');
      }
    });
  }
});