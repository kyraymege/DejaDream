const { authenticateToken } = require("../middleware/verify");
const router = require("express").Router();
const {
  getUser,
  changeUsername,
  changeName,
  deleteUser,
} = require("../controllers/users");

//* Users Routes

// getUser
router.get("/", authenticateToken, getUser);

// Change username
router.put("/changeUsername",authenticateToken, changeUsername);

// Change name
router.put("/changeName",authenticateToken, changeName);

// Delete a user
router.delete("/",authenticateToken, deleteUser);

module.exports = router;
