const express = require("express");
const router = express.Router();
const upload = require("./upload.cjs");

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const imgUrl = `http://localhost:8080/file/${req.file.filename}`;
  return res.send(imgUrl);
});

module.exports = router;
