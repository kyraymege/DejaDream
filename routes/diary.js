const { authenticateToken } = require("../middleware/verify");
const {
  createDiary,
  getAllDiaries,
  getDiaryById,
  deleteDiary,
  resetUserDiaries,
} = require("../controllers/diary");
const router = require("express").Router();

//* Diary Routes

// Create a diary
router.post("/", authenticateToken, createDiary);

// Get all diaries
router.get("/", authenticateToken, getAllDiaries);

// Reset a user'd diary
router.get("/resetUser", authenticateToken, resetUserDiaries);

// Get a diary by id
router.get("/:diaryId", authenticateToken, getDiaryById);

// Delete a diary
router.delete("/:diaryId", authenticateToken, deleteDiary);

module.exports = router;
