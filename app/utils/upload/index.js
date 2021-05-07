const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuid } = require('uuid');
const aws = require('aws-sdk');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const upload = multer({
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'adsonwheelzstorage',

    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, uuid() + '.' + file.mimetype.split('/')[1]);
    },
  }),
});

module.exports = upload;
