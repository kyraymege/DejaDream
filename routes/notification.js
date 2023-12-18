const { sendNotification } = require("../controllers/notification");

const router = require("express").Router();

//* Notification push

router.get("/send-notification", sendNotification);

module.exports = router;
