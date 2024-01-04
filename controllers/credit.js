const Credit = require("../models/credit");

const addAdCredit = async (req, res) => {
  try {
    // Set expiration time, e.g., 24 hours from now
    const expirationTime = 24 * 60 * 60 * 1000;
    const expireAt = new Date(Date.now() + expirationTime);

    const adCredit = await Credit.create({
      userId: req.user._id,
      expireAt: expireAt,
    });

    console.log(adCredit);

    await adCredit.save();

    return res.status(200).json({ message: "Credit added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

//! Will add on buy credit
// const addPaidCredit = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (!user) {
//       return res.status(400).json({ error: "User not found" });
//     }

//     const credit = await Credit.create({
//       userId: req.user._id,
//     });

//     await credit.save();

//     return res.status(200).json({ message: "Credit added successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: error.message });
//   }
// };

//Get User's Credits
const getUserCredits = async (req, res) => {
  try {

    const totalCreditCount = await Credit.countDocuments({ userId: req.user._id });
    const creditCount = await Credit.countDocuments({ userId: req.user._id, expireAt: null } );
    const adCreditCount = totalCreditCount - creditCount;

    return res.status(200).json({ totalCredits : totalCreditCount, credits: creditCount, adCredits: adCreditCount });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { addAdCredit, getUserCredits };
