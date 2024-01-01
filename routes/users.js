const { authenticateToken } = require("../middleware/verify");
const router = require("express").Router();
const {
  getUser,
  changeUsername,
  changeName,
  deleteUser,
  usernameExist
} = require("../controllers/users");

//* Users Routes

// getUser
router.get("/", authenticateToken, getUser);

// Change username
router.put("/changeUsername",authenticateToken, changeUsername);

// Username exist
router.get("/usernameExist", authenticateToken, usernameExist);

// Change name
router.put("/changeName",authenticateToken, changeName);

// Delete a user
router.delete("/",authenticateToken, deleteUser);

module.exports = router;
