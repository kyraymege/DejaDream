const apn = require("apn");

const sendNotification = async (req, res) => {
  // Set up APNs connection
  const apnProvider = new apn.Provider({
    token: {
      key: "path/to/APNsAuthKey.p8",
      keyId: "your-key-id",
      teamId: "your-team-id",
    },
    production: false, // Set to true for production
  });
  const deviceToken = "device-token"; // Replace with the actual device token
  const notification = new apn.Notification();
  notification.alert = "Hello, this is a push notification!";
  notification.sound = "default";

  apnProvider
    .send(notification, deviceToken)
    .then((response) => {
      console.log("Notification sent:", response);
      res.send("Notification sent");
    })
    .catch((error) => {
      console.error("Error sending notification:", error);
      res.status(500).send("Error sending notification");
    });
};

module.exports = {
  sendNotification,
};
