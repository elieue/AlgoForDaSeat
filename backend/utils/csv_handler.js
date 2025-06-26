// /utils/csv_handler.js

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { stringify } = require('csv-stringify');

module.exports = {
  // Load students from CSV into an array of JS objects
  .

  // Save an array of student objects to CSV
  saveResults(filePath, data) {
    return new Promise((resolve, reject) => {
      const fullPath = path.resolve(filePath);
      const columns = Object.keys(data[0] || {}); // Use first row to detect headers

      stringify(data, { header: true, columns }, (err, output) => {
        if (err) return reject(err);

        fs.writeFile(fullPath, output, err => {
          if (err) return reject(err);
          resolve();
        });
      });
    });
  }
};
