const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

// GET: Fetch all assignments
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ createdAt: -1 });
    res.status(200).json(assignments);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching assignments", error: err.message });
  }
});

// POST: Create a new assignment
router.post("/", async (req, res) => {
  try {
    const { title, dueDate, totalStudents } = req.body;
    
    const newAssignment = new Assignment({
      title,
      dueDate,
      totalStudents: totalStudents || 78,
      submissions: 0,
      status: "Active"
    });

    const savedAssignment = await newAssignment.save();
    res.status(201).json(savedAssignment);
  } catch (err) {
    res.status(500).json({ message: "Server error saving assignment", error: err.message });
  }
});

module.exports = router;