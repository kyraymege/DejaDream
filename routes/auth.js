const { appleLogin, refreshToken } = require("../controllers/auth");
const validateApple = require("../middleware/validate");

const router = require("express").Router();

//* Apple Login

router.post("/apple-login", validateApple, appleLogin);

//* Refresh Token
router.post("/refresh-token", refreshToken);

// //* Register

// router.post("/register", register);

// //* Verify Email

// router.get("/verify-email", verifyUserMail);

// //* Create New Verification Token

// router.post("/new-verification-token", createNewVerificationCode);







module.exports = router;
