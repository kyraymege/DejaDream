const router = require("express").Router();
const { authenticateToken } = require("../middleware/verify");
const { addAdCredit, getUserCredits } = require("../controllers/credit");

//* Add Ad Credit
router.post("/add-ad-credit", authenticateToken, addAdCredit);

//* Get User's Credits
router.get("/get-user-credits", authenticateToken, getUserCredits);

module.exports = router;
