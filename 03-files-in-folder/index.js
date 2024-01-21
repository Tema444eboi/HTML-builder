const path = require('path');
const { readdir } = require('fs/promises');
const { stat } = require('fs');

const folderPath = path.join(__dirname, 'secret-folder');

readdir(folderPath, { withFileTypes: true }).then((result) => {
  for (const file of result) {
    if (file.isFile()) {
      const filePath = path.join(folderPath, file.name);
      const fileObj = path.parse(filePath);

      stat(filePath, (err, stats) => {
        console.log(
          fileObj.name +
            ' - ' +
            fileObj.ext.slice(1) +
            ' - ' +
            stats.size +
            ' bytes',
        );
      });
    }
  }
});
