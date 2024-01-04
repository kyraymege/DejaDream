const { appleLogin, refreshToken } = require("../controllers/auth");
const validateApple = require("../middleware/validate");

const router = require("express").Router();

//* Apple Login

router.post("/apple-login", validateApple, appleLogin);

//* Refresh Token
router.post("/refresh-token", refreshToken);






module.exports = router;
