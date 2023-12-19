const { authenticateToken } = require("../middleware/verify");
const { createDiary, getAllDiaries, getDiaryById, deleteDiary } = require("../controllers/diary");
const router = require("express").Router();

//* Diary Routes

// Create a diary
router.post("/", authenticateToken, createDiary);

// Get all diaries
router.get("/",authenticateToken, getAllDiaries);

// Get a diary by id
router.get("/:diaryId",authenticateToken, getDiaryById);

// // Update a diary
// router.put("/:diaryId",authenticateToken, updateDiary);

// Delete a diary
router.delete("/:diaryId",authenticateToken, deleteDiary);

module.exports = router;
