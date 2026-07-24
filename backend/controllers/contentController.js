const Content = require("../models/Content");
const fs = require("fs");
const path = require("path");

// Upload Content
exports.uploadContent = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const content = new Content({
      title: req.body.title,
      description: req.body.description,
      type: req.body.type,
      className: req.body.className,
      week: req.body.week,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      uploadedBy: "Teacher",
    });

    await content.save();

    res.status(201).json({
      success: true,
      message: "Content uploaded successfully",
      content,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Content
exports.getAllContent = async (req, res) => {
  try {

    const content = await Content.find().sort({
      createdAt: -1,
    });

    res.json(content);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Delete Content
exports.deleteContent = async (req, res) => {

  try {

    const content = await Content.findById(req.params.id);

    if (!content) {

      return res.status(404).json({
        message: "Resource not found",
      });

    }

    const fileLocation = path.join(
      __dirname,
      "..",
      content.filePath
    );

    if (fs.existsSync(fileLocation)) {

      fs.unlinkSync(fileLocation);

    }

    await Content.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Resource deleted successfully",
    });

  }

  catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};