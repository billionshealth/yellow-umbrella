const express = require('express')

const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({storage: fileStorageEngine});

const { uploadFile } = require('./s3')

const app = express()

app.post('/api/images', upload.single('file'), async (req, res) => {
  const file = req.file
  console.log("File details (locally):\n", file)

  const result = await uploadFile(file)
  console.log("File details (on AWS S3):\n", result)

  const description = req.body.description

  res.send("🤗")
})

app.listen(8080, () => console.log("listening on port 8080"))