const multer = require('multer');
let fs = require('fs-extra');
var path = require('path');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirsSync(__dirname + '/../public/uploads'); // fs.mkdirsSync will create folders if it does not exist
    cb(null, __dirname + '/../public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

let upload = multer({ storage: storage });

module.exports = upload;
