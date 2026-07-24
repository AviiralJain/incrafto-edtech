const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  uploadContent,
  getAllContent,
  deleteContent,
} = require("../controllers/contentController");

// Upload Resource
router.post(
  "/upload",
  upload.single("file"),
  uploadContent
);

// Get All Resources
router.get("/", getAllContent);

// Delete Resource
router.delete("/:id", deleteContent);

module.exports = router;